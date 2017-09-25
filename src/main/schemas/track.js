const schema = {
  title: 'track',
  description: 'schema for all tracks added to library',
  version: 0,
  type: 'object',
  properties: {
    author: {
      type: 'array'
    },
    fileName: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    genres: {
      type: 'array'
    },
    bookName: {
      type: 'string'
    },
    trackNum: {
      type: 'object'
    }
  },
  required: [
    'author',
    'title',
    'fileName',
    'bookName',
    'trackNum'
  ]
}

export default async db =>
  db.collection({
    name: 'track',
    schema
  })
