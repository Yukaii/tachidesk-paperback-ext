#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { spawnSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "..");
const bundlesDir = path.join(repoRoot, "bundles");
const versioningPath = path.join(bundlesDir, "versioning.json");

function resolveToolchainCli() {
    const cliDirectory = path.join(repoRoot, "node_modules", "@paperback", "toolchain", "bin");
    const modernCli = path.join(cliDirectory, "run.js");

    if (fs.existsSync(modernCli)) {
        return modernCli;
    }

    return path.join(cliDirectory, "run");
}

function buildSources() {
    const cliPath = resolveToolchainCli();
    const result = spawnSync(process.execPath, [cliPath, "bundle", "--debug", "--tests"], {
        cwd: repoRoot,
        stdio: "inherit",
        env: process.env,
    });

    if (result.status !== 0) {
        process.exit(result.status ?? 1);
    }
}

function createFetchWithCloudflareAccess(baseFetch) {
    const serverURL = process.env.TACHIDESK_SERVER_URL;
    const clientId = process.env.TACHIDESK_CLOUDFLARE_ACCESS_CLIENT_ID;
    const clientSecret = process.env.TACHIDESK_CLOUDFLARE_ACCESS_CLIENT_SECRET;
    const normalizedServerURL = serverURL
        ? (serverURL.endsWith("/") ? serverURL : `${serverURL}/`)
        : undefined;

    return async function fetchWithCloudflareAccess(input, init) {
        const requestURL = typeof input === "string" ? input : input?.url;

        if (!normalizedServerURL || !requestURL?.startsWith(normalizedServerURL) || !clientId || !clientSecret) {
            return await baseFetch(input, init);
        }

        const headers = new Headers(init?.headers ?? (input instanceof Request ? input.headers : undefined));
        if (!headers.has("CF-Access-Client-ID")) {
            headers.set("CF-Access-Client-ID", clientId);
        }
        if (!headers.has("CF-Access-Client-Secret")) {
            headers.set("CF-Access-Client-Secret", clientSecret);
        }

        return await baseFetch(input, {
            ...init,
            headers,
        });
    };
}

function createVmContext(ApplicationPolyfill) {
    return vm.createContext({
        Application: ApplicationPolyfill(),
        console,
        AbortController: globalThis.AbortController,
        AbortSignal: globalThis.AbortSignal,
        Buffer,
        CustomEvent: globalThis.CustomEvent,
        Event: globalThis.Event,
        EventTarget: globalThis.EventTarget,
        TextDecoder: globalThis.TextDecoder,
        TextEncoder: globalThis.TextEncoder,
        URL: globalThis.URL,
        URLSearchParams: globalThis.URLSearchParams,
        atob: globalThis.atob,
        btoa: globalThis.btoa,
        clearTimeout,
        fetch: globalThis.fetch,
        Headers: globalThis.Headers,
        process: {
            env: process.env,
        },
        Request: globalThis.Request,
        Response: globalThis.Response,
        setTimeout,
    });
}

async function runSourceTests(sourceId, ApplicationPolyfill) {
    const sourceDirectory = path.join(bundlesDir, sourceId);
    const testFilePath = path.join(sourceDirectory, "test.js");
    const testCode = fs.readFileSync(testFilePath, "utf8");
    const context = createVmContext(ApplicationPolyfill);

    vm.runInContext(testCode, context);

    return await vm.runInContext("source.runTests()", context);
}

async function main() {
    const { ApplicationPolyfill } = await import("@paperback/runtime-polyfills");
    globalThis.fetch = createFetchWithCloudflareAccess(globalThis.fetch);

    process.stdout.write("\x1bc\x1b[3J");
    console.log("Building Sources");
    buildSources();
    process.stdout.write("\x1bc\x1b[3J");
    console.log();

    const versioning = JSON.parse(fs.readFileSync(versioningPath, "utf8"));
    let failedSuites = 0;

    for (const source of versioning.sources) {
        const result = await runSourceTests(source.id, ApplicationPolyfill);

        if (result?.failed) {
            failedSuites += 1;
        }
    }

    if (failedSuites > 0) {
        process.exit(1);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
