import level from 'level-rocksdb'

let db = null

export const initDb = (dir = '/tmp/db') => {
  db = level(dir)
}

export default db
