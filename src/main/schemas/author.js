const schema = {
  title: 'author',
  description: 'schema for all authors added to library',
  version: 0,
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    authorBookIds: {
      type: 'array'
    },
    required: [
      'name',
      'authorBookIds'
    ]
  }
}

export default async db =>
  db.collection({
    name: 'author',
    schema
  })
