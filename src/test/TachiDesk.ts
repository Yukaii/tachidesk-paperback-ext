import { TestSuite } from '@paperback/types/lib/impl/TestDefinition.js'

import { TachiDesk } from '../TachiDesk/TachiDesk'
import {
    fetchServerSources,
    getServerURL,
    setSelectedSources,
    setServerSources,
    tachiSources,
} from '../TachiDesk/Common'

const STATE_KEYS = {
    mangaId: 'mangaId',
    chapterId: 'chapterId',
}

async function configureUsableSource(extension: TachiDesk): Promise<tachiSources> {
    const sources = await fetchServerSources(extension.stateManager, extension.requestManager)
    const usableSources = Object.values(sources).filter((source) => source.id !== '0')

    if (usableSources.length === 0) {
        throw new Error(`No usable Suwayomi sources found at ${await getServerURL(extension.stateManager)}`)
    }

    const source = usableSources[0]!

    await setServerSources(extension.stateManager, sources)
    await setSelectedSources(extension.stateManager, [source.id])

    return source
}

async function resolveMangaId(extension: TachiDesk, source: tachiSources): Promise<string> {
    const latestSectionId = `latest-${source.id}`
    const popularSectionId = `popular-${source.id}`
    const sectionIds = source.supportsLatest ? [latestSectionId, popularSectionId] : [popularSectionId]

    for (const sectionId of sectionIds) {
        const results = await extension.getViewMoreItems(sectionId, undefined)
        const firstItem = results.results[0]

        if (firstItem?.mangaId) {
            return firstItem.mangaId
        }
    }

    throw new Error(`No manga returned from source ${source.displayName} (${source.id})`)
}

export async function runTests() {
    const suite = new TestSuite('TachiDesk tests')
    const extension = new TachiDesk()

    suite.test('initialisation', async () => {
        const source = await configureUsableSource(extension)
        const mangaId = await resolveMangaId(extension, source)

        suite.state[STATE_KEYS.mangaId] = mangaId
    })

    suite.test('getMangaDetails', async () => {
        const mangaId = suite.state[STATE_KEYS.mangaId]

        if (typeof mangaId !== 'string') {
            throw new Error('Test state is missing mangaId')
        }

        const manga = await extension.getMangaDetails(mangaId)
        if (!manga.mangaInfo.titles[0]) {
            throw new Error('Manga title is empty')
        }
    })

    suite.test('getChapters', async () => {
        const mangaId = suite.state[STATE_KEYS.mangaId]

        if (typeof mangaId !== 'string') {
            throw new Error('Test state is missing mangaId')
        }

        const chapters = await extension.getChapters(mangaId)
        const firstChapter = chapters[0]

        if (!firstChapter?.id) {
            throw new Error('No chapters returned')
        }

        suite.state[STATE_KEYS.chapterId] = firstChapter.id
    })

    suite.test('getChapterDetails', async () => {
        const mangaId = suite.state[STATE_KEYS.mangaId]
        const chapterId = suite.state[STATE_KEYS.chapterId]

        if (typeof mangaId !== 'string' || typeof chapterId !== 'string') {
            throw new Error('Test state is missing chapter identifiers')
        }

        const details = await extension.getChapterDetails(mangaId, chapterId)

        if (details.pages.length === 0) {
            throw new Error('No chapter pages returned')
        }
    })

    return await suite.run()
}
