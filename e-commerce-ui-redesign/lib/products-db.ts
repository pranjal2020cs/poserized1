import { ObjectId } from 'mongodb'
import { connectToDatabase } from './mongodb'

export interface Product {
  _id?: ObjectId | string
  name: string
  description?: string
  price: number
  category?: string
  image?: string
  inStock: boolean
  rating?: number
  reviews?: Array<{ user: string; comment: string; rating: number }>
  createdAt: Date
  updatedAt: Date
}

// Fallback products data when MongoDB is unavailable
const FALLBACK_PRODUCTS: Product[] = [
  {
    _id: '1',
    name: 'Black & White Aesthetic Poster',
    price: 499,
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=800&fit=crop',
    category: 'Art',
    description: 'Premium black and white aesthetic wall art poster',
    inStock: true,
    rating: 4.5,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    name: 'Minimalist Abstract Print',
    price: 399,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=800&fit=crop',
    category: 'Decor',
    description: 'Modern minimalist abstract wall print',
    inStock: true,
    rating: 4.3,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '3',
    name: 'Photography Art Canvas',
    price: 599,
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&h=800&fit=crop',
    category: 'Art',
    description: 'Fine art photography canvas print',
    inStock: true,
    rating: 4.8,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '4',
    name: 'Nature Landscape Poster',
    price: 349,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=800&fit=crop',
    category: 'Nature',
    description: 'Beautiful landscape nature poster',
    inStock: true,
    rating: 4.6,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '5',
    name: 'Geometric Pattern Print',
    price: 449,
    image: 'https://images.unsplash.com/photo-1552083375-1447ce886485?w=800&h=800&fit=crop',
    category: 'Decor',
    description: 'Modern geometric pattern wall art',
    inStock: true,
    rating: 4.4,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '6',
    name: 'Vintage Typography Poster',
    price: 379,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=800&fit=crop',
    category: 'Typography',
    description: 'Retro vintage typography wall poster',
    inStock: true,
    rating: 4.2,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '7',
    name: 'Modern Color Splash Art',
    price: 519,
    image: 'https://images.unsplash.com/photo-1504198458649-3128b932f49b?w=800&h=800&fit=crop',
    category: 'Art',
    description: 'Contemporary color splash abstract art',
    inStock: true,
    rating: 4.7,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '8',
    name: 'Urban Photography Print',
    price: 429,
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=800&fit=crop',
    category: 'Photography',
    description: 'Urban street photography art print',
    inStock: true,
    rating: 4.5,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '9',
    name: 'Botanical Illustration',
    price: 389,
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&h=800&fit=crop',
    category: 'Nature',
    description: 'Elegant botanical illustration poster',
    inStock: true,
    rating: 4.6,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '10',
    name: 'Minimal Line Art',
    price: 369,
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&h=800&fit=crop',
    category: 'Art',
    description: 'Minimalist line art wall print',
    inStock: true,
    rating: 4.3,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '11',
    name: 'Retro Music Poster',
    price: 459,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=800&fit=crop',
    category: 'Music',
    description: 'Vintage retro music band poster',
    inStock: true,
    rating: 4.4,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '12',
    name: 'Abstract Watercolor Art',
    price: 539,
    image: 'https://images.unsplash.com/photo-1504198266285-165a4dd44b75?w=800&h=800&fit=crop',
    category: 'Art',
    description: 'Beautiful abstract watercolor painting print',
    inStock: true,
    rating: 4.8,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]


export async function getAllProducts(): Promise<Product[]> {
  try {
    const { db } = await connectToDatabase()
    const products = await db.collection('products').find({}).toArray()
    return products.map((product) => ({
      ...product,
      _id: product._id?.toString(),
    })) as Product[]
  } catch (error) {
    console.warn('[v0] MongoDB unavailable, using fallback products:', error)
    return FALLBACK_PRODUCTS
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { db } = await connectToDatabase()

    if (!ObjectId.isValid(id)) {
      // Check fallback data
      return FALLBACK_PRODUCTS.find((p) => p._id === id) || null
    }

    const product = await db.collection('products').findOne({
      _id: new ObjectId(id),
    })

    if (!product) {
      return null
    }

    return {
      ...product,
      _id: product._id?.toString(),
    } as Product
  } catch (error) {
    console.warn('[v0] MongoDB unavailable, checking fallback products')
    return FALLBACK_PRODUCTS.find((p) => p._id === id) || null
  }
}

export async function createProduct(productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  const { db } = await connectToDatabase()

  const newProduct = {
    ...productData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await db.collection('products').insertOne(newProduct)

  return {
    ...newProduct,
    _id: result.insertedId.toString(),
  } as Product
}

export async function updateProduct(id: string, updates: Partial<Omit<Product, '_id'>>): Promise<Product | null> {
  const { db } = await connectToDatabase()

  if (!ObjectId.isValid(id)) {
    return null
  }

  const updateData = {
    ...updates,
    updatedAt: new Date(),
  }

  const result = await db.collection('products').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateData },
    { returnDocument: 'after' }
  )

  if (!result || !result.value) {
    return null
  }

  return {
    ...result.value,
    _id: result.value._id?.toString(),
  } as Product
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { db } = await connectToDatabase()

  if (!ObjectId.isValid(id)) {
    return false
  }

  const result = await db.collection('products').deleteOne({
    _id: new ObjectId(id),
  })

  return result.deletedCount === 1
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { db } = await connectToDatabase()
  const products = await db
    .collection('products')
    .find({ category })
    .toArray()

  return products.map((product) => ({
    ...product,
    _id: product._id?.toString(),
  })) as Product[]
}

export async function searchProducts(query: string): Promise<Product[]> {
  const { db } = await connectToDatabase()
  const products = await db
    .collection('products')
    .find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    })
    .toArray()

  return products.map((product) => ({
    ...product,
    _id: product._id?.toString(),
  })) as Product[]
}
