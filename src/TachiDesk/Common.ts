import {
    RequestManager,
    SourceStateManager
} from '@paperback/types'

export function serverUnavailableMangaTiles() {
    return [
        App.createPartialSourceManga({
            title: "Server",
            image: "",
            mangaId: SERVER_UNAVAILABLE_MANGA_ID,
            subtitle: "Unavailable"
        })
    ]
}

export const SERVER_UNAVAILABLE_MANGA_ID = "placeholder-id"
export const SERVER_UNAVAILABLE_CHAPTER_ID = "0"
export const SERVER_UNAVAILABLE_PAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="

// StateManager Keys
export const SERVER_URL_KEY = "serverURL";
export const SERVER_API_KEY = "serverAPI";
export const AUTH_STATE_KEY = "AuthState";
export const AUTH_STRING_KEY = "AuthString";
export const USERNAME_KEY = "serverUsername";
export const PASSWORD_KEY = "serverPassword";

export const CLOUDFLARE_ACCESS_STATE_KEY = "cloudflareAccessState";
export const CLOUDFLARE_ACCESS_CLIENT_ID_KEY = "cloudflareAccessClientId";
export const CLOUDFLARE_ACCESS_CLIENT_SECRET_KEY = "cloudflareAccessClientSecret";

export const SERVER_CATEGORIES_KEY = "serverCategories";
export const SELECTED_CATEGORIES_KEY = "selectedCategories";

export const SERVER_SOURCES_KEY = "serverSources";
export const SELECTED_SOURCES_KEY = "selectedSources";

export const SELECTED_LANGUAGES_KEY = "selectedLanguages"

export const MANGA_PER_ROW_KEY = "mangaPerRow"
export const UPDATED_ROW_STATE_KEY = "updatedRowState"
export const CATEGORY_ROW_STATE_KEY = "categoryRowState"
export const SOURCE_ROW_STATE_KEY = "sourceRowState"
export const UPDATED_ROW_STYLE_KEY = "updatedRowStyle"
export const CATEGORY_ROW_STYLE_KEY = "categoryRowStyle"
export const SOURCE_ROW_STYLE_KEY = "sourceRowStyle"

// Defaults
export const DEFAULT_SERVER_URL = "http://127.0.0.1:4567/";
export const DEFAULT_API_ENDPOINT = "api/graphql";
export const DEFAULT_SERVER_API = DEFAULT_SERVER_URL + DEFAULT_API_ENDPOINT;
export const DEFAULT_AUTH_STATE = false;
export const DEFAULT_AUTH_STRING = "";
export const DEFAULT_USERNAME = "";
export const DEFAULT_PASSWORD = "";

export const DEFAULT_CLOUDFLARE_ACCESS_STATE = false;
export const DEFAULT_CLOUDFLARE_ACCESS_CLIENT_ID = "";
export const DEFAULT_CLOUDFLARE_ACCESS_CLIENT_SECRET = "";

export const DEFAULT_SERVER_CATEGORY: tachiCategory = {
    id: 0,
    order: 0,
    name: "Default",
    default: true,
    size: 0,
    includeInUpdate: "EXCLUDE",
    meta: {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
    }
}
export const DEFAULT_SERVER_CATEGORIES: Record<string, tachiCategory> = { "0": DEFAULT_SERVER_CATEGORY };
export const DEFAULT_SELECTED_CATEGORIES = ["0"];

export const DEFAULT_SERVER_SOURCE: tachiSources = {
    id: "0",
    name: "Local source",
    lang: "localsourcelang",
    iconUrl: "",
    supportsLatest: true,
    isConfigurable: false,
    isNsfw: false,
    displayName: "Local source"
}
export const DEFAULT_SERVER_SOURCES: Record<string, tachiSources> = {
    "0": DEFAULT_SERVER_SOURCE
}
export const DEFAULT_SELECTED_SOURCES = ["0"]

export const DEFAULT_SELECTED_LANGUAGES = ["localsourcelang", "en"]

export const DEFAULT_MANGA_PER_ROW = 10;
export const DEFAULT_UPDATED_ROW_STATE = true
export const DEFAULT_CATEGORY_ROW_STATE = true
export const DEFAULT_SOURCE_ROW_STATE = true
export const DEFAULT_UPDATED_ROW_STYLE = ["singleRowNormal"]
export const DEFAULT_CATEGORY_ROW_STYLE = ["singleRowNormal"]
export const DEFAULT_SOURCE_ROW_STYLE = ["singleRowNormal"]

const ENV_SERVER_URL_KEY = "TACHIDESK_SERVER_URL"
const ENV_CLOUDFLARE_ACCESS_ENABLED_KEY = "TACHIDESK_CLOUDFLARE_ACCESS_ENABLED"
const ENV_CLOUDFLARE_ACCESS_CLIENT_ID_KEY = "TACHIDESK_CLOUDFLARE_ACCESS_CLIENT_ID"
const ENV_CLOUDFLARE_ACCESS_CLIENT_SECRET_KEY = "TACHIDESK_CLOUDFLARE_ACCESS_CLIENT_SECRET"

export const rowStyles = ["singleRowNormal", "singleRowLarge", "featured", "doubleRow"]
export const languages: Record<string, string> = {
    'ar': 'اَلْعَرَبِيَّةُ', // Arabic
    'bg': 'български', // Bulgarian
    'bn': 'বাংলা', // Bengali
    'ca': 'Català', // Catalan
    'cs': 'Čeština', // Czech
    'da': 'Dansk', // Danish
    'de': 'Deutsch', // German
    'en': 'English', // English
    'es': 'Español', // Spanish
    'es-419': 'Español (Latinoamérica)', // Spanish (Latin American)
    'fa': 'فارسی', // Farsi
    'fi': 'Suomi', // Finnish
    'fr': 'Français', // French
    'he': 'עִבְרִית', // Hebrew
    'hi': 'हिन्दी', // Hindi
    'hu': 'Magyar', // Hungarian
    'id': 'Indonesia', // Indonesian
    'it': 'Italiano', // Italian
    'ja': '日本語', // Japanese
    'ko': '한국어', // Korean
    'lt': 'Lietuvių', // Lithuanian
    'mn': 'монгол', // Mongolian
    'ms': 'Melayu', // Malay
    'my': 'မြန်မာဘာသာ', // Burmese
    'nl': 'Nederlands', // Dutch
    'no': 'Norsk', // Norwegian
    'pl': 'Polski', // Polish
    'pt': 'Português', // Portuguese
    'pt-BR': 'Português (Brasil)', // Portuguese (Brazilian)
    'ro': 'Română', // Romanian
    'ru': 'Pусский', // Russian
    'sr': 'Cрпски', // Serbian
    'sv': 'Svenska', // Swedish
    'th': 'ไทย', // Thai
    'tl': 'Filipino', // Tagalog
    'tr': 'Türkçe', // Turkish
    'uk': 'Yкраї́нська', // Ukrainian
    'vi': 'Tiếng Việt', // Vietnamese
    'zh-Hans': '中文 (简化字)', // Chinese (Simplified)
    'zh-Hant': '中文 (繁體字)', // Chinese (Traditional)
}

// ! Query Interfaces Start
// interface categories
export interface tachiCategory {
    id: number,
    order: number,
    name: string,
    default: boolean,
    size: number,
    includeInUpdate: string,
    meta: any
}

export interface tachiSources {
    "id": string,
    "name": string,
    "lang": string,
    "iconUrl": string,
    "supportsLatest": boolean,
    "isConfigurable": boolean,
    "isNsfw": boolean,
    "displayName": string
}

export interface tachiManga {
    "id": number,
    "sourceId": string,
    "url": string,
    "title": string,
    "thumbnailUrl": string,
    "thumbnailUrlLastFetched": number,
    "initialized": boolean,
    "artist": string,
    "author": string,
    "description": string,
    "genre": string[],
    "status": string,
    "inLibrary": boolean,
    "inLibraryAt": number,
    "source": tachiSources,
    "meta": any,
    "realUrl": string,
    "lastFetchedAt": number,
    "chaptersLastFetchedAt": number,
    "updateStrategy": string,
    "freshData": boolean,
    "unreadCount": number,
    "downloadCount": number,
    "chapterCount": number,
    "lastReadAt": number,
    "lastChapterRead"?: tachiChapter,
    "age": number,
    "chaptersAge": number
}

export interface tachiChapter {
    "id": number,
    "url": string,
    "name": string,
    "uploadDate": number,
    "chapterNumber": number,
    "scanlator": string,
    "mangaId": number,
    "read": boolean,
    "bookmarked": boolean,
    "lastPageRead": number,
    "lastReadAt": number,
    "index": number,
    "fetchedAt": number,
    "realUrl": string,
    "downloaded": boolean,
    "pageCount": number,
    "chapterCount": number,
    "meta": any
}

// ! Query Interfaces End

function getEnvironmentValue(name: string): string | undefined {
    const env = typeof process !== "undefined" ? process.env : undefined
    const value = env?.[name]?.trim()

    return value && value.length > 0 ? value : undefined
}

function normalizeServerURL(url: string): string {
    return url.endsWith("/") ? url : url + "/"
}

function getDefaultServerURLValue(): string {
    const envServerURL = getEnvironmentValue(ENV_SERVER_URL_KEY)
    return envServerURL ? normalizeServerURL(envServerURL) : DEFAULT_SERVER_URL
}

function getDefaultServerAPIValue(): string {
    return getDefaultServerURLValue() + DEFAULT_API_ENDPOINT
}

function getDefaultCloudflareAccessClientIdValue(): string {
    return getEnvironmentValue(ENV_CLOUDFLARE_ACCESS_CLIENT_ID_KEY) ?? DEFAULT_CLOUDFLARE_ACCESS_CLIENT_ID
}

function getDefaultCloudflareAccessClientSecretValue(): string {
    return getEnvironmentValue(ENV_CLOUDFLARE_ACCESS_CLIENT_SECRET_KEY) ?? DEFAULT_CLOUDFLARE_ACCESS_CLIENT_SECRET
}

function getDefaultCloudflareAccessStateValue(): boolean {
    const explicit = getEnvironmentValue(ENV_CLOUDFLARE_ACCESS_ENABLED_KEY)
    if (explicit) {
        return explicit.toLowerCase() === "true"
    }

    return getDefaultCloudflareAccessClientIdValue() !== "" && getDefaultCloudflareAccessClientSecretValue() !== ""
}

const ABOUT_SERVER_QUERY = `
    query PAPERBACK_ABOUT_SERVER {
        aboutServer {
            buildTime
            buildType
            discord
            github
            name
            version
        }
    }
`

const CATEGORY_LIST_QUERY = `
    query PAPERBACK_CATEGORY_LIST {
        categories(order: [{ by: ORDER, byType: ASC }]) {
            nodes {
                id
                name
                default
                order
                includeInUpdate
                meta {
                    key
                    value
                }
                mangas {
                    totalCount
                }
            }
        }
    }
`

const SOURCE_LIST_QUERY = `
    query PAPERBACK_SOURCE_LIST {
        sources {
            nodes {
                id
                name
                displayName
                lang
                iconUrl
                supportsLatest
                isConfigurable
                isNsfw
            }
        }
    }
`

const MANGA_FIELDS = `
    id
    sourceId
    url
    realUrl
    title
    thumbnailUrl
    thumbnailUrlLastFetched
    initialized
    artist
    author
    description
    genre
    status
    inLibrary
    inLibraryAt
    updateStrategy
    lastFetchedAt
    chaptersLastFetchedAt
    unreadCount
    downloadCount
    age
    chaptersAge
    meta {
        key
        value
    }
    chapters {
        totalCount
    }
    source {
        id
        name
        displayName
        lang
        iconUrl
        supportsLatest
        isConfigurable
        isNsfw
    }
`

const MANGA_QUERY = `
    query PAPERBACK_MANGA($id: Int!) {
        manga(id: $id) {
            ${MANGA_FIELDS}
        }
    }
`

const FETCH_MANGA_MUTATION = `
    mutation PAPERBACK_FETCH_MANGA($id: Int!) {
        fetchManga(input: { id: $id }) {
            manga {
                ${MANGA_FIELDS}
            }
        }
    }
`

const MANGA_FULL_QUERY = `
    query PAPERBACK_MANGA_FULL($id: Int!) {
        manga(id: $id) {
            ${MANGA_FIELDS}
            lastReadChapter {
                id
                chapterNumber
                sourceOrder
                name
                uploadDate
                scanlator
                mangaId
                isRead
                isBookmarked
                lastPageRead
                lastReadAt
                fetchedAt
                realUrl
                isDownloaded
                pageCount
                url
            }
        }
    }
`

const CHAPTER_FIELDS = `
    id
    url
    name
    uploadDate
    chapterNumber
    scanlator
    mangaId
    isRead
    isBookmarked
    lastPageRead
    lastReadAt
    sourceOrder
    fetchedAt
    realUrl
    isDownloaded
    pageCount
    meta {
        key
        value
    }
`

const CHAPTERS_QUERY = `
    query PAPERBACK_CHAPTERS($mangaId: Int!) {
        chapters(
            filter: { mangaId: { equalTo: $mangaId } }
            order: [{ by: SOURCE_ORDER, byType: ASC }]
        ) {
            nodes {
                ${CHAPTER_FIELDS}
            }
        }
    }
`

const FETCH_CHAPTERS_MUTATION = `
    mutation PAPERBACK_FETCH_CHAPTERS($mangaId: Int!) {
        fetchChapters(input: { mangaId: $mangaId }) {
            chapters {
                ${CHAPTER_FIELDS}
            }
        }
    }
`

const CHAPTER_BY_SOURCE_ORDER_QUERY = `
    query PAPERBACK_CHAPTER_BY_SOURCE_ORDER($mangaId: Int!, $sourceOrder: Int!) {
        chapters(
            filter: {
                mangaId: { equalTo: $mangaId }
                sourceOrder: { equalTo: $sourceOrder }
            }
            first: 1
        ) {
            nodes {
                ${CHAPTER_FIELDS}
            }
        }
    }
`

const FETCH_CHAPTER_PAGES_MUTATION = `
    mutation PAPERBACK_FETCH_CHAPTER_PAGES($chapterId: Int!) {
        fetchChapterPages(input: { chapterId: $chapterId }) {
            pages
        }
    }
`

const RECENTLY_UPDATED_QUERY = `
    query PAPERBACK_RECENTLY_UPDATED($first: Int!, $offset: Int!) {
        chapters(
            filter: { inLibrary: { equalTo: true } }
            order: [
                { by: FETCHED_AT, byType: DESC }
                { by: SOURCE_ORDER, byType: DESC }
            ]
            first: $first
            offset: $offset
        ) {
            nodes {
                ${CHAPTER_FIELDS}
                manga {
                    ${MANGA_FIELDS}
                }
            }
            pageInfo {
                hasNextPage
            }
        }
    }
`

const CATEGORY_MANGAS_QUERY = `
    query PAPERBACK_CATEGORY_MANGAS($id: Int!) {
        category(id: $id) {
            mangas {
                nodes {
                    ${MANGA_FIELDS}
                }
            }
        }
    }
`

const FETCH_SOURCE_MANGA_MUTATION = `
    mutation PAPERBACK_FETCH_SOURCE_MANGA($input: FetchSourceMangaInput!) {
        fetchSourceManga(input: $input) {
            hasNextPage
            mangas {
                ${MANGA_FIELDS}
            }
        }
    }
`

const UPDATE_CHAPTER_READ_MUTATION = `
    mutation PAPERBACK_UPDATE_CHAPTER_READ($id: Int!, $isRead: Boolean!) {
        updateChapter(input: { id: $id, patch: { isRead: $isRead } }) {
            chapter {
                id
                isRead
            }
        }
    }
`

// ! Reset Settings Begin
export async function resetSettings(stateManager: SourceStateManager) {
    const defaultServerURL = getDefaultServerURLValue()
    const defaultServerAPI = getDefaultServerAPIValue()
    const defaultCloudflareAccessState = getDefaultCloudflareAccessStateValue()
    const defaultCloudflareAccessClientId = getDefaultCloudflareAccessClientIdValue()
    const defaultCloudflareAccessClientSecret = getDefaultCloudflareAccessClientSecretValue()

    await stateManager.store(SERVER_URL_KEY, defaultServerURL)
    await stateManager.store(SERVER_API_KEY, defaultServerAPI)
    await stateManager.store(AUTH_STATE_KEY, DEFAULT_AUTH_STATE)
    await stateManager.keychain.store(AUTH_STRING_KEY, DEFAULT_AUTH_STRING)
    await stateManager.store(USERNAME_KEY, DEFAULT_USERNAME)
    await stateManager.keychain.store(PASSWORD_KEY, DEFAULT_PASSWORD)
    await stateManager.store(CLOUDFLARE_ACCESS_STATE_KEY, defaultCloudflareAccessState)
    await stateManager.store(CLOUDFLARE_ACCESS_CLIENT_ID_KEY, defaultCloudflareAccessClientId)
    await stateManager.keychain.store(CLOUDFLARE_ACCESS_CLIENT_SECRET_KEY, defaultCloudflareAccessClientSecret)
    await stateManager.store(SERVER_CATEGORIES_KEY, DEFAULT_SERVER_CATEGORIES)
    await stateManager.store(SELECTED_CATEGORIES_KEY, DEFAULT_SELECTED_CATEGORIES)
    await stateManager.store(SERVER_SOURCES_KEY, DEFAULT_SERVER_SOURCES)
    await stateManager.store(SELECTED_SOURCES_KEY, DEFAULT_SELECTED_SOURCES)
    await stateManager.store(MANGA_PER_ROW_KEY, DEFAULT_MANGA_PER_ROW)
    await stateManager.store(UPDATED_ROW_STATE_KEY, DEFAULT_UPDATED_ROW_STATE)
    await stateManager.store(CATEGORY_ROW_STATE_KEY, DEFAULT_CATEGORY_ROW_STATE)
    await stateManager.store(SOURCE_ROW_STATE_KEY, DEFAULT_SOURCE_ROW_STATE)
    await stateManager.store(UPDATED_ROW_STYLE_KEY, DEFAULT_UPDATED_ROW_STYLE)
    await stateManager.store(CATEGORY_ROW_STYLE_KEY, DEFAULT_CATEGORY_ROW_STYLE)
    await stateManager.store(SOURCE_ROW_STYLE_KEY, DEFAULT_SOURCE_ROW_STYLE)
    await stateManager.store(SELECTED_LANGUAGES_KEY, DEFAULT_SELECTED_LANGUAGES)
}
// ! Reset Settings End

// ! Server URL start

export async function setServerURL(stateManager: SourceStateManager, url: string, typed = false) {
    // * since every key press is a value set() and get(), the override which ensuring that the URL always has a backslash won't let people delete it
    // ! typed is a boolean that we set to true only when being entered by the DUIInputField, skipping the override when typing the url
    // ! atleast until user hits submit.
    if (!typed) {
        url = url == "" ? getDefaultServerURLValue() : url
        url = normalizeServerURL(url)
    }

    await stateManager.store(SERVER_URL_KEY, url)
    await stateManager.store(SERVER_API_KEY, url + DEFAULT_API_ENDPOINT)
}

export async function getServerURL(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(SERVER_URL_KEY) as string | undefined) ?? getDefaultServerURLValue()
}

// Get Server API url (i.e. http://127.0.0.1/api/graphql)
export async function getServerAPI(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(SERVER_API_KEY) as string | undefined) ?? getDefaultServerAPIValue()
}
// !Server URL End

// ! Authentication start
export async function setAuthState(stateManager: SourceStateManager, state: boolean) {
    await stateManager.store(AUTH_STATE_KEY, state)
}

export async function getAuthState(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(AUTH_STATE_KEY) as boolean | undefined) ?? DEFAULT_AUTH_STATE
}

export async function setAuthString(stateManager: SourceStateManager) {
    let username = await getUsername(stateManager);
    let password = await getPassword(stateManager);

    let authString = 'Basic ' + Buffer.from(username + ':' + password, 'binary').toString('base64'); // Base64 of username:password
    await stateManager.keychain.store(AUTH_STRING_KEY, authString);
}

export async function getAuthString(stateManager: SourceStateManager) {
    return (await stateManager.keychain.retrieve(AUTH_STRING_KEY) as string | undefined) ?? DEFAULT_AUTH_STRING;
}

export async function setUsername(stateManager: SourceStateManager, username: string) {
    await stateManager.store(USERNAME_KEY, username);
    await setAuthString(stateManager) // Set new auth string based on new username
}

export async function getUsername(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(USERNAME_KEY) as string | undefined) ?? DEFAULT_USERNAME;
}

export async function setPassword(stateManager: SourceStateManager, password: string) {
    await stateManager.keychain.store(PASSWORD_KEY, password);
    await setAuthString(stateManager); // Set new auth string based on new username
}

export async function getPassword(stateManager: SourceStateManager) {
    return (await stateManager.keychain.retrieve(PASSWORD_KEY) as string | undefined) ?? DEFAULT_PASSWORD;
}
// ! Authentication End

// ! Cloudflare Access Start
export async function setCloudflareAccessState(stateManager: SourceStateManager, state: boolean) {
    await stateManager.store(CLOUDFLARE_ACCESS_STATE_KEY, state)
}

export async function getCloudflareAccessState(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(CLOUDFLARE_ACCESS_STATE_KEY) as boolean | undefined) ?? getDefaultCloudflareAccessStateValue()
}

export async function setCloudflareAccessClientId(stateManager: SourceStateManager, clientId: string) {
    await stateManager.store(CLOUDFLARE_ACCESS_CLIENT_ID_KEY, clientId)
}

export async function getCloudflareAccessClientId(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(CLOUDFLARE_ACCESS_CLIENT_ID_KEY) as string | undefined) ?? getDefaultCloudflareAccessClientIdValue()
}

export async function setCloudflareAccessClientSecret(stateManager: SourceStateManager, clientSecret: string) {
    await stateManager.keychain.store(CLOUDFLARE_ACCESS_CLIENT_SECRET_KEY, clientSecret)
}

export async function getCloudflareAccessClientSecret(stateManager: SourceStateManager) {
    return (await stateManager.keychain.retrieve(CLOUDFLARE_ACCESS_CLIENT_SECRET_KEY) as string | undefined) ?? getDefaultCloudflareAccessClientSecretValue()
}

export async function getCloudflareAccessHeaders(stateManager: SourceStateManager): Promise<Record<string, string>> {
    if (!(await getCloudflareAccessState(stateManager))) {
        return {}
    }

    const clientId = (await getCloudflareAccessClientId(stateManager)).trim()
    const clientSecret = (await getCloudflareAccessClientSecret(stateManager)).trim()

    if (clientId === "" || clientSecret === "") {
        return {}
    }

    return {
        "CF-Access-Client-ID": clientId,
        "CF-Access-Client-Secret": clientSecret
    }
}
// ! Cloudflare Access End

// ! Requests
export function buildAbsoluteURL(serverURL: string, assetURL?: string): string {
    if (!assetURL) {
        return ""
    }

    if (assetURL.startsWith("http://") || assetURL.startsWith("https://")) {
        return assetURL
    }

    if (assetURL.startsWith("/")) {
        return serverURL + assetURL.slice(1)
    }

    return serverURL + assetURL
}

export function buildThumbnailURL(serverURL: string, thumbnailUrl?: string): string {
    return buildAbsoluteURL(serverURL, thumbnailUrl)
}

function numberOrZero(value: any): number {
    if (value === null || value === undefined || value === "") {
        return 0
    }

    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
}

function mapSource(source: any): tachiSources {
    if (!source) {
        return DEFAULT_SERVER_SOURCE
    }

    return {
        id: source.id,
        name: source.name,
        lang: source.lang,
        iconUrl: source.iconUrl ?? "",
        supportsLatest: source.supportsLatest ?? false,
        isConfigurable: source.isConfigurable ?? false,
        isNsfw: source.isNsfw ?? false,
        displayName: source.displayName ?? source.name
    }
}

function mapCategory(category: any): tachiCategory {
    return {
        id: category.id,
        order: category.order,
        name: category.name,
        default: category.default,
        size: category.mangas?.totalCount ?? 0,
        includeInUpdate: category.includeInUpdate ?? "EXCLUDE",
        meta: category.meta ?? []
    }
}

function mapChapter(chapter: any): tachiChapter {
    return {
        id: chapter.id,
        url: chapter.url ?? "",
        name: chapter.name,
        uploadDate: numberOrZero(chapter.uploadDate),
        chapterNumber: chapter.chapterNumber,
        scanlator: chapter.scanlator ?? "",
        mangaId: chapter.mangaId,
        read: chapter.isRead,
        bookmarked: chapter.isBookmarked,
        lastPageRead: chapter.lastPageRead ?? 0,
        lastReadAt: numberOrZero(chapter.lastReadAt),
        index: chapter.sourceOrder,
        fetchedAt: numberOrZero(chapter.fetchedAt),
        realUrl: chapter.realUrl ?? "",
        downloaded: chapter.isDownloaded,
        pageCount: chapter.pageCount ?? 0,
        chapterCount: 0,
        meta: chapter.meta ?? []
    }
}

function mapManga(manga: any): tachiManga {
    return {
        id: manga.id,
        sourceId: manga.sourceId,
        url: manga.url ?? "",
        title: manga.title,
        thumbnailUrl: manga.thumbnailUrl ?? "",
        thumbnailUrlLastFetched: numberOrZero(manga.thumbnailUrlLastFetched),
        initialized: manga.initialized,
        artist: manga.artist ?? "",
        author: manga.author ?? "",
        description: manga.description ?? "",
        genre: manga.genre ?? [],
        status: manga.status ?? "",
        inLibrary: manga.inLibrary,
        inLibraryAt: numberOrZero(manga.inLibraryAt),
        source: mapSource(manga.source),
        meta: manga.meta ?? [],
        realUrl: manga.realUrl ?? "",
        lastFetchedAt: numberOrZero(manga.lastFetchedAt),
        chaptersLastFetchedAt: numberOrZero(manga.chaptersLastFetchedAt),
        updateStrategy: manga.updateStrategy ?? "",
        freshData: true,
        unreadCount: manga.unreadCount ?? 0,
        downloadCount: manga.downloadCount ?? 0,
        chapterCount: manga.chapters?.totalCount ?? 0,
        lastReadAt: numberOrZero(manga.lastReadChapter?.lastReadAt),
        lastChapterRead: manga.lastReadChapter ? mapChapter(manga.lastReadChapter) : undefined,
        age: numberOrZero(manga.age),
        chaptersAge: numberOrZero(manga.chaptersAge)
    }
}

async function makeGraphQLRequest<T>(
    stateManager: SourceStateManager,
    requestManager: RequestManager,
    query: string,
    variables: Record<string, any> = {},
    headers: Record<string, string> = {}
): Promise<T | Error> {
    const serverAPI = await getServerAPI(stateManager)

    const request = App.createRequest({
        url: serverAPI,
        method: "POST",
        data: JSON.stringify({
            query,
            variables
        }),
        headers: {
            "content-type": "application/json",
            "accept": "application/json",
            ...headers
        }
    })

    let response

    try {
        response = await requestManager.schedule(request, 0)
    }
    catch (error: any) {
        return new Error(serverAPI)
    }

    const responseStatus = response?.status

    if (responseStatus == 401) {
        return Error("Unauthorized" + " " + JSON.stringify(await getAuthString(stateManager)))
    }

    if (!responseStatus || responseStatus < 200 || responseStatus >= 300) {
        return Error("Your query is invalid. " + JSON.stringify(responseStatus))
    }

    let responseData

    try {
        responseData = JSON.parse(response.data ?? "")
    }
    catch (error: any) {
        return Error("Invalid GraphQL response")
    }

    if (responseData.errors?.length) {
        return Error(responseData.errors[0]?.message ?? "GraphQL error")
    }

    return responseData.data as T
}

async function getChapterNodeFromSourceOrder(
    stateManager: SourceStateManager,
    requestManager: RequestManager,
    mangaId: number,
    sourceOrder: number
): Promise<any | Error> {
    const response = await makeGraphQLRequest<{ chapters: { nodes: any[] } }>(
        stateManager,
        requestManager,
        CHAPTER_BY_SOURCE_ORDER_QUERY,
        {
            mangaId,
            sourceOrder
        }
    )

    if (response instanceof Error) {
        return response
    }

    const chapter = response.chapters.nodes[0]
    if (!chapter) {
        return Error(`Chapter ${sourceOrder} not found for manga ${mangaId}`)
    }

    return chapter
}

export async function fetchChapterPages(
    stateManager: SourceStateManager,
    requestManager: RequestManager,
    mangaId: string,
    chapterId: string
): Promise<string[] | Error> {
    const chapter = await getChapterNodeFromSourceOrder(
        stateManager,
        requestManager,
        Number(mangaId),
        Number(chapterId)
    )

    if (chapter instanceof Error) {
        return chapter
    }

    const response = await makeGraphQLRequest<{ fetchChapterPages: { pages: string[] } }>(
        stateManager,
        requestManager,
        FETCH_CHAPTER_PAGES_MUTATION,
        {
            chapterId: chapter.id
        }
    )

    if (response instanceof Error) {
        return response
    }

    const serverURL = await getServerURL(stateManager)
    return response.fetchChapterPages.pages.map((page) => buildAbsoluteURL(serverURL, page))
}

export async function makeRequest(stateManager: SourceStateManager, requestManager: RequestManager, apiEndpoint: string, method = "GET", data?: Record<string, string> | string, headers: Record<string, string> = {}) {
    const endpointParts = apiEndpoint.split("?")
    const path = endpointParts[0] ?? ""
    const queryString = endpointParts[1] ?? ""

    if (path === "settings/about/") {
        const response = await makeGraphQLRequest<{ aboutServer: any }>(
            stateManager,
            requestManager,
            ABOUT_SERVER_QUERY,
            {},
            headers
        )

        return response instanceof Error ? response : response.aboutServer
    }

    if (path === "category/") {
        const response = await makeGraphQLRequest<{ categories: { nodes: any[] } }>(
            stateManager,
            requestManager,
            CATEGORY_LIST_QUERY,
            {},
            headers
        )

        return response instanceof Error ? response : response.categories.nodes.map(mapCategory)
    }

    if (path === "source/list") {
        const response = await makeGraphQLRequest<{ sources: { nodes: any[] } }>(
            stateManager,
            requestManager,
            SOURCE_LIST_QUERY,
            {},
            headers
        )

        return response instanceof Error ? response : response.sources.nodes.map(mapSource)
    }

    const mangaMatch = path.match(/^manga\/(\d+)$/)
    if (mangaMatch) {
        const id = Number(mangaMatch[1])
        const onlineFetch = queryString.includes("onlineFetch=true")
        const response = await makeGraphQLRequest<any>(
            stateManager,
            requestManager,
            onlineFetch ? FETCH_MANGA_MUTATION : MANGA_QUERY,
            { id },
            headers
        )

        if (response instanceof Error) {
            return response
        }

        const manga = onlineFetch ? response.fetchManga?.manga : response.manga
        return manga ? mapManga(manga) : Error(`Manga ${id} not found`)
    }

    const mangaFullMatch = path.match(/^manga\/(\d+)\/full$/)
    if (mangaFullMatch) {
        const response = await makeGraphQLRequest<{ manga: any }>(
            stateManager,
            requestManager,
            MANGA_FULL_QUERY,
            { id: Number(mangaFullMatch[1]) },
            headers
        )

        if (response instanceof Error) {
            return response
        }

        return response.manga ? mapManga(response.manga) : Error(`Manga ${mangaFullMatch[1]} not found`)
    }

    const chapterListMatch = path.match(/^manga\/(\d+)\/chapters$/)
    if (chapterListMatch) {
        const mangaId = Number(chapterListMatch[1])
        const onlineFetch = queryString.includes("onlineFetch=true")
        const response = await makeGraphQLRequest<any>(
            stateManager,
            requestManager,
            onlineFetch ? FETCH_CHAPTERS_MUTATION : CHAPTERS_QUERY,
            { mangaId },
            headers
        )

        if (response instanceof Error) {
            return response
        }

        const chapters = onlineFetch ? response.fetchChapters?.chapters : response.chapters.nodes
        if (!chapters) {
            return Error(`No chapters returned for manga ${mangaId}`)
        }
        return chapters.map(mapChapter)
    }

    const chapterMatch = path.match(/^manga\/(\d+)\/chapter\/(\d+)$/)
    if (chapterMatch && method === "GET") {
        const chapter = await getChapterNodeFromSourceOrder(
            stateManager,
            requestManager,
            Number(chapterMatch[1]),
            Number(chapterMatch[2])
        )

        return chapter instanceof Error ? chapter : mapChapter(chapter)
    }

    if (chapterMatch && method === "PATCH") {
        const chapter = await getChapterNodeFromSourceOrder(
            stateManager,
            requestManager,
            Number(chapterMatch[1]),
            Number(chapterMatch[2])
        )

        if (chapter instanceof Error) {
            return chapter
        }

        const isRead = typeof data === "string" ? data.includes("read=true") : false
        const response = await makeGraphQLRequest(
            stateManager,
            requestManager,
            UPDATE_CHAPTER_READ_MUTATION,
            {
                id: chapter.id,
                isRead
            },
            headers
        )

        return response instanceof Error ? response : response
    }

    const recentMatch = path.match(/^update\/recentChapters\/(\d+)$/)
    if (recentMatch) {
        const page = Number(recentMatch[1])
        const pageSize = 50
        const response = await makeGraphQLRequest<{ chapters: { nodes: any[], pageInfo: { hasNextPage: boolean } } }>(
            stateManager,
            requestManager,
            RECENTLY_UPDATED_QUERY,
            {
                first: pageSize,
                offset: page * pageSize
            },
            headers
        )

        if (response instanceof Error) {
            return response
        }

        return {
            page: response.chapters.nodes.map((chapter) => ({
                chapter: mapChapter(chapter),
                manga: mapManga(chapter.manga)
            })),
            hasNextPage: response.chapters.pageInfo.hasNextPage
        }
    }

    const categoryMatch = path.match(/^category\/(\d+)$/)
    if (categoryMatch) {
        const response = await makeGraphQLRequest<{ category: { mangas: { nodes: any[] } } }>(
            stateManager,
            requestManager,
            CATEGORY_MANGAS_QUERY,
            { id: Number(categoryMatch[1]) },
            headers
        )

        if (response instanceof Error) {
            return response
        }

        return response.category?.mangas.nodes.map(mapManga) ?? []
    }

    const sourceMatch = path.match(/^source\/([^/]+)\/(popular|latest)\/(\d+)$/)
    if (sourceMatch) {
        const sourceId = sourceMatch[1] ?? ""
        const type = sourceMatch[2] ?? "popular"
        const page = sourceMatch[3] ?? "1"
        const response = await makeGraphQLRequest<{ fetchSourceManga: { hasNextPage: boolean, mangas: any[] } }>(
            stateManager,
            requestManager,
            FETCH_SOURCE_MANGA_MUTATION,
            {
                input: {
                    type: type.toUpperCase(),
                    source: sourceId,
                    page: Number(page)
                }
            },
            headers
        )

        if (response instanceof Error) {
            return response
        }

        if (!response.fetchSourceManga) {
            return Error(`No source results returned for ${sourceId}`)
        }

        return {
            mangaList: response.fetchSourceManga.mangas.map(mapManga),
            hasNextPage: response.fetchSourceManga.hasNextPage
        }
    }

    const sourceSearchMatch = path.match(/^source\/([^/]+)\/search$/)
    if (sourceSearchMatch) {
        const params = new URLSearchParams(queryString)
        const response = await makeGraphQLRequest<{ fetchSourceManga: { hasNextPage: boolean, mangas: any[] } }>(
            stateManager,
            requestManager,
            FETCH_SOURCE_MANGA_MUTATION,
            {
                input: {
                    type: "SEARCH",
                    source: sourceSearchMatch[1],
                    page: Number(params.get("pageNum") ?? "1"),
                    query: params.get("searchTerm") ?? undefined
                }
            },
            headers
        )

        if (response instanceof Error) {
            return response
        }

        if (!response.fetchSourceManga) {
            return Error(`No search results returned for ${sourceSearchMatch[1]}`)
        }

        return {
            mangaList: response.fetchSourceManga.mangas.map(mapManga),
            hasNextPage: response.fetchSourceManga.hasNextPage
        }
    }

    return Error(`Unsupported endpoint: ${apiEndpoint}`)
}

// Requests used for the test server button. Could be useful to test connection at other points
export async function testRequest(stateManager: SourceStateManager, requestManager: RequestManager) {
    return await makeRequest(stateManager, requestManager, "settings/about/")
}
// ! Requests End

// ! Categories Start
// Fetch Categories from server and returns them as a record
export async function fetchServerCategories(stateManager: SourceStateManager, requestManager: RequestManager) {
    let categories: Record<string, tachiCategory> = {};

    const fetchedCategories = await makeRequest(stateManager, requestManager, "category/");

    if (fetchedCategories instanceof Error) {
        throw new Error("Failed to fetch categories.")
    }
    fetchedCategories.forEach((category: tachiCategory) => {
        categories[JSON.stringify(category.id)] = category
    });

    return categories
}

export async function setServerCategories(stateManager: SourceStateManager, categories: Record<string, tachiCategory>) {
    await stateManager.store(SERVER_CATEGORIES_KEY, categories)
}

export async function getServerCategories(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(SERVER_CATEGORIES_KEY) as Record<string, tachiCategory> | undefined) ?? DEFAULT_SERVER_CATEGORIES
}

export async function setSelectedCategories(stateManager: SourceStateManager, selectedCategories: string[]) {
    await stateManager.store(SELECTED_CATEGORIES_KEY, selectedCategories)
}

export async function getSelectedCategories(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(SELECTED_CATEGORIES_KEY) as string[] | undefined) ?? DEFAULT_SELECTED_CATEGORIES;
}

export function getCategoriesIds(categories: Record<string, tachiCategory>) {
    let categoryIds: string[] = [];
    Object.values(categories).forEach(category => {
        categoryIds.push(JSON.stringify(category.id))
    })

    return categoryIds
}

export function getCategoryFromId(categories: Record<string, tachiCategory>, id: string): tachiCategory {
    return categories[id] ?? DEFAULT_SERVER_CATEGORY
}

// categoryName is used to give a name to old entries which are no longer in the server
export function getCategoryNameFromId(categories: Record<string, tachiCategory>, id: string) {
    let categoryName = "OLD ENTRY OR ERROR"
    Object.values(categories).forEach(category => {
        if (JSON.stringify(category.id) == id) {
            categoryName = category.name
        }
    })

    return categoryName
}
// ! Categories End

// ! Sources Start
// Fetch Sources from server and return as record
export async function fetchServerSources(stateManager: SourceStateManager, requestManager: RequestManager) {
    let sources: Record<string, tachiSources> = {};

    const fetchedSources = await makeRequest(stateManager, requestManager, "source/list")

    if (fetchedSources instanceof Error) {
        throw fetchedSources
    }

    fetchedSources.forEach((source: tachiSources) => {
        sources[source.id] = source
    });

    return sources
}

export async function setServerSources(stateManager: SourceStateManager, sources: Record<string, tachiSources>) {
    await stateManager.store(SERVER_SOURCES_KEY, sources);
}

export async function getServerSources(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(SERVER_SOURCES_KEY) as Record<string, tachiSources> | undefined) ?? DEFAULT_SERVER_SOURCES
}

export async function setSelectedSources(stateManager: SourceStateManager, selectedSources: string[]) {
    await stateManager.store(SELECTED_SOURCES_KEY, selectedSources)
}

export async function getSelectedSources(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(SELECTED_SOURCES_KEY) as string[] | undefined) ?? DEFAULT_SELECTED_SOURCES
}

export function getSourcesIds(sources: Record<string, tachiSources>) {
    let sourceIds: string[] = [];
    Object.values(sources).forEach(source => {
        sourceIds.push(source.id)
    })

    return sourceIds
}

export function getSourceFromId(sources: Record<string, tachiSources>, id: string): tachiSources {
    return sources[id] ?? DEFAULT_SERVER_SOURCE
}

// SourceName is used to give a name to old entries which are no longer in the server
export function getSourceNameFromId(sources: Record<string, tachiSources>, id: string) {
    let sourceName = "OLD ENTRY OR ERROR"
    Object.values(sources).forEach(source => {
        if (source.id === id) {
            sourceName = source.displayName
        }
    })

    return sourceName
}
// ! Sources End

// ! Homepage Settings Start
export function styleResolver(style: string): string {
    switch (style) {
        case "singleRowNormal":
            return "Normal Single Row"
        case "singleRowLarge":
            return "Large Single Row"
        case "featured":
            return "Featured"
        case "doubleRow":
            return "Double Row"
        default:
            return ""
    }
}

export async function setMangaPerRow(stateManager: SourceStateManager, rowNumber: number) {
    await stateManager.store(MANGA_PER_ROW_KEY, rowNumber)
}

export async function getMangaPerRow(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(MANGA_PER_ROW_KEY) as number | undefined) ?? DEFAULT_MANGA_PER_ROW;
}

export async function setUpdatedRowState(stateManager: SourceStateManager, state: boolean) {
    await stateManager.store(UPDATED_ROW_STATE_KEY, state)
}

export async function getUpdatedRowState(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(UPDATED_ROW_STATE_KEY) as boolean | undefined) ?? DEFAULT_UPDATED_ROW_STATE;
}

export async function setCategoryRowState(stateManager: SourceStateManager, state: boolean) {
    await stateManager.store(CATEGORY_ROW_STATE_KEY, state)
}

export async function getCategoryRowState(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(CATEGORY_ROW_STATE_KEY) as boolean | undefined) ?? DEFAULT_CATEGORY_ROW_STATE;
}

export async function setSourceRowState(stateManager: SourceStateManager, state: boolean) {
    await stateManager.store(SOURCE_ROW_STATE_KEY, state)
}

export async function getSourceRowState(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(SOURCE_ROW_STATE_KEY) as boolean | undefined) ?? DEFAULT_SOURCE_ROW_STATE;
}

export async function setUpdatedRowStyle(stateManager: SourceStateManager, style: string[]) {
    await stateManager.store(UPDATED_ROW_STYLE_KEY, style)
}

export async function getUpdatedRowStyle(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(UPDATED_ROW_STYLE_KEY) as string[] | undefined) ?? DEFAULT_UPDATED_ROW_STYLE;
}

export async function setCategoryRowStyle(stateManager: SourceStateManager, style: string[]) {
    await stateManager.store(CATEGORY_ROW_STYLE_KEY, style)
}

export async function getCategoryRowStyle(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(CATEGORY_ROW_STYLE_KEY) as string[] | undefined) ?? DEFAULT_CATEGORY_ROW_STYLE;
}

export async function setSourceRowStyle(stateManager: SourceStateManager, style: string) {
    await stateManager.store(SOURCE_ROW_STYLE_KEY, style)
}

export async function getSourceRowStyle(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(SOURCE_ROW_STYLE_KEY) as string[] | undefined) ?? DEFAULT_SOURCE_ROW_STYLE;
}
// ! Homepage Settings End

// ! Languages Settings Start
export async function getServerLanguages(stateManager: SourceStateManager) {
    const serverSources = await getServerSources(stateManager)
    const serverLanguages = Object.values(serverSources).map((source) => source.lang)
    const languages = getLanguageCodes()

    let missedLanguages = []

    for (const language of serverLanguages) {
        if (!(languages.includes(language))) {
            missedLanguages.push(language)
        }
    }

    return missedLanguages
}

export function getLanguageCodes() {
    return Object.keys(languages)
}

export function getLanguageName(languageCode: string): string {
    return languages[languageCode] ?? languageCode
}

export async function setSelectedLanguages(stateManager: SourceStateManager, languages: string[]) {
    await stateManager.store(SELECTED_LANGUAGES_KEY, languages)
}

export async function getSelectedLanguages(stateManager: SourceStateManager) {
    return (await stateManager.retrieve(SELECTED_LANGUAGES_KEY) as string[] | undefined) ?? DEFAULT_SELECTED_LANGUAGES
}
// ! Languages settings end

export async function v1Migration(stateManager: SourceStateManager) {
    const serverAddress = await stateManager.retrieve("server_address")
    const selectedCategories = await stateManager.retrieve("selected_category")
    const selectedSources = await stateManager.retrieve("selected_sources")

    if (serverAddress) {
        await setServerURL(stateManager, serverAddress)
        await stateManager.store("server_address", undefined)
    }
    if (selectedCategories) {
        await stateManager.store("selected_category", undefined)
        await setSelectedCategories(stateManager, selectedCategories)
    }
    if (selectedSources) {
        await stateManager.store("selected_sources", undefined)
        await setSelectedSources(stateManager, selectedSources)
    }
}
