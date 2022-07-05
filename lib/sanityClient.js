import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: '7q7014ah',
    dataset: 'production',
    apiVersion: '2022-07-04',
    useCdn: false,
    token: 'skH4hek8e5Ya5z1iMdhZ2bDLOXqeAnEthlsNDb3NcllmMdNxI3Sh3oRUipvKaXDQWyD4xJjUkvcykZiwTRbq8g50mdcpEF5D4uuA7JY0ITgyedQdQF9O2mCKb6L6T3YJn8vURfxpt3oCKDtTicO6svMHszPu6vYVAwqFowi47mOjF3sfedDL',
});