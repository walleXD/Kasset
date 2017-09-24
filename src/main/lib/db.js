import RxDB from 'rxdb'

let db = null

export const initDb = async (dir = '/tmp/db') => {
  try {
    RxDB.plugin(require('pouchdb-adapter-node-websql'))
    RxDB.plugin(require('pouchdb-quick-search'))
    db = await RxDB
      .create({
        name: '/tmp/kasset',
        adapter: 'websql'
      })
  } catch (e) {
    console.error(e)
  }
}

export default db
