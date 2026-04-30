import { CompatWrapper } from '@paperback/types/lib/compat/0.8/index.js'
import { TachiDesk } from './TachiDesk'

export default CompatWrapper(
    {
        registerHomeSectionsInInitialise: false
    },
    new TachiDesk() as unknown as Parameters<typeof CompatWrapper>[1]
)
