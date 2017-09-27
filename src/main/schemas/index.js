import RxDB from 'rxdb'

import bookCollection from './book'
import trackCollection from './track'
import authorCollection from './author'

let db = null

export const initDb = async (dir = '/tmp/db') => {
  try {
    RxDB.plugin(require('pouchdb-adapter-node-websql'))
    RxDB.plugin(require('pouchdb-quick-search'))
    db = await RxDB
      .create({
        name: '/tmp/db/kasset',
        adapter: 'websql'
      })
    await loadCollections(db)
  } catch (e) {
    console.error(e)
  }
}

const loadCollections = async db => {
  const collections = [
    bookCollection,
    trackCollection,
    authorCollection
  ]

  await Promise.all(
    collections.map(col => col(db))
  )
}

export default async () => {
  if (!db) await initDb()
  return db
}
