import RxDB from 'rxdb'

let db = null

export const initDb = async (dir = '/tmp/db') => {
  RxDB.plugin(require('pouchdb-adapter-leveldb'))
  RxDB.plugin(require('pouchdb-quick-search'))
  db = await RxDB.create({
    name: dir,
    adapter: 'leveldb'
  })
}

export default db
