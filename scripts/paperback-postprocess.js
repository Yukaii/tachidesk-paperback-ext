#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const bundlesDir = path.join(repoRoot, "bundles");
const versioningPath = path.join(bundlesDir, "versioning.json");
const repositoryManifestPath = path.join(bundlesDir, "repository.json");
const homepagePath = path.join(bundlesDir, "index.html");
const packageJsonPath = path.join(repoRoot, "package.json");

const legacySourceOverrides = {
    TachiDesk: {
        websiteBaseURL: "https://github.com/Suwayomi/Tachidesk-Server",
    },
};

const legacyContentRatingMap = {
    SAFE: "EVERYONE",
    EVERYONE: "EVERYONE",
    MATURE: "MATURE",
    ADULT: "ADULT",
};

const legacyBadgeTypeByColor = {
    "#1E40AF": "default",
    "#15803d": "success",
    "#1F2937": "info",
    "#991B1B": "danger",
    "#EAB308": "warning",
};

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
    fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function resolveSourceIconFilename(sourceId, declaredIcon) {
    const staticDir = path.join(bundlesDir, sourceId, "static");

    if (!fs.existsSync(staticDir)) {
        return declaredIcon;
    }

    if (declaredIcon && fs.existsSync(path.join(staticDir, declaredIcon))) {
        return declaredIcon;
    }

    const filenames = fs.readdirSync(staticDir)
        .filter((entry) => fs.statSync(path.join(staticDir, entry)).isFile())
        .sort((left, right) => left.localeCompare(right));

    return filenames[0] ?? declaredIcon;
}

function normalizeRepositoryManifest(versioning, packageJson) {
    return {
        ...versioning,
        repository: {
            ...versioning.repository,
            name: packageJson.repositoryName ?? versioning.repository?.name,
        },
        sources: versioning.sources.map((source) => ({
            ...source,
            icon: resolveSourceIconFilename(source.id, source.icon),
        })),
    };
}

function toLegacySourceInfo(source) {
    const overrides = legacySourceOverrides[source.id] ?? {};
    const author = source.author
        ?? source.developers?.map((developer) => developer.name).filter(Boolean).join(", ")
        ?? "";

    return {
        id: source.id,
        name: source.name,
        author,
        desc: source.desc ?? source.description ?? "",
        contentRating: legacyContentRatingMap[source.contentRating] ?? source.contentRating,
        version: source.version,
        icon: resolveSourceIconFilename(source.id, source.icon),
        tags: (source.tags ?? source.badges ?? [])
            .filter((tag) => tag.text ?? tag.label)
            .filter((tag) => (tag.text ?? tag.label) !== "LEGACY (0.8)")
            .map((tag) => ({
                text: tag.text ?? tag.label,
                type: tag.type ?? legacyBadgeTypeByColor[tag.backgroundColor] ?? "info",
            })),
        websiteBaseURL: source.websiteBaseURL ?? overrides.websiteBaseURL ?? "",
        intents: source.intents ?? source.capabilities ?? 0,
    };
}

function rewriteSourceInfoFiles(versioning) {
    for (const source of versioning.sources) {
        const infoPath = path.join(bundlesDir, source.id, "info.json");

        if (!fs.existsSync(infoPath)) {
            continue;
        }

        writeJson(infoPath, toLegacySourceInfo(source));
    }
}

function writeLegacyVersioning(versioning) {
    const legacyVersioning = {
        buildTime: versioning.buildTime,
        sources: versioning.sources.map(toLegacySourceInfo),
        builtWith: versioning.builtWith,
    };

    writeJson(versioningPath, legacyVersioning);
}

function patchHomepage() {
    if (!fs.existsSync(homepagePath)) {
        return;
    }

    const homepage = fs.readFileSync(homepagePath, "utf8");
    const updatedHomepage = homepage.replace(
        "fetch(`${this.baseUrl}/versioning.json`)",
        "fetch(`${this.baseUrl}/repository.json`)"
    );

    if (updatedHomepage !== homepage) {
        fs.writeFileSync(homepagePath, updatedHomepage);
    }
}

function main() {
    if (!fs.existsSync(versioningPath)) {
        process.exit(0);
    }

    const versioning = readJson(versioningPath);
    const packageJson = readJson(packageJsonPath);
    const repositoryManifest = normalizeRepositoryManifest(versioning, packageJson);

    writeJson(repositoryManifestPath, repositoryManifest);
    rewriteSourceInfoFiles(versioning);
    writeLegacyVersioning(versioning);
    patchHomepage();
}

main();
