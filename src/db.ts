import * as mongodb from 'mongodb'

import { MONGODB_CONNECTION_STRING, DATABASE_NAME } from './config'

export let mongoClient: mongodb.MongoClient | null = null

export const connect = async (): Promise<mongodb.Db> => {
  mongoClient = await mongodb.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true })

  return mongoClient.db(DATABASE_NAME)
}

export const db = (async () => await connect())();