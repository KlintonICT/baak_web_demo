import { mongoClient, db } from './db'

export const queryDependencies = async () => {
  const result = (await db)
    .collection('repositories')
    .find()

  const _result = await result.toArray()
  mongoClient?.close()

  return _result
}