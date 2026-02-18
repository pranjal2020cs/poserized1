import { MongoClient, Db } from 'mongodb'

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set. Please configure it in your environment.')
  }
  return uri
}
let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    let uri = getMongoUri()
    
    // Ensure the URI has a database name
    if (!uri.includes('?')) {
      uri = uri + '/blog_platform'
    } else if (!uri.includes('/blog_platform')) {
      uri = uri.replace('/', '/blog_platform?')
    }

    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
      retryWrites: true,
      w: 'majority',
      // SSL/TLS options
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsInsecure: false,
      family: 4, // Force IPv4
    })

    await client.connect()
    const db = client.db('blog_platform')

    cachedClient = client
    cachedDb = db

    console.log('[v0] Connected to MongoDB successfully')
    return { client, db }
  } catch (error) {
    console.error('[v0] Failed to connect to MongoDB:', error)
    throw error
  }
}

export async function closeDatabase(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close()
    cachedClient = null
    cachedDb = null
  }
}

export function getDatabase(): Db {
  if (!cachedDb) {
    throw new Error('Database not initialized. Call connectToDatabase first.')
  }
  return cachedDb
}
