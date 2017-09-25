const schema = {
  title: 'book',
  description: 'schema for all tracks added to library',
  version: 0,
  type: 'object',
  properties: {
    author: {
      type: 'array'
    },
    bookName: {
      type: 'string'
    },
    genres: {
      type: 'array'
    },
    trackIds: {
      type: 'array'
    }
  },
  required: [
    'author',
    'bookName'
  ]
}

export default async db =>
  db.collection({
    name: 'book',
    schema
  })
