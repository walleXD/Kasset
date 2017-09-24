const schema = {
  title: 'track',
  description: 'schema for all tracks added to library',
  version: 0,
  type: 'object',
  properties: {
    libraryLocation: {
      type: 'string'
    },
    trackName: {
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
    }
  },
  required: [
    'libraryLocation',
    'title'
  ]
}

export default async db =>
  db.collection({
    name: 'track',
    schema
  })
