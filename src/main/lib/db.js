import level from 'level-rocksdb'

let db = null

export const initDb = (dir = '/tmp/db') => {
  console.log('db being intialized')
  db = level(dir)
}

export default db
