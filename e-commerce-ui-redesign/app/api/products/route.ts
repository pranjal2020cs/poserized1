import { NextRequest, NextResponse } from 'next/server'
import { validateAdminSession } from '@/lib/admin-auth'
import { getAllProducts, createProduct, searchProducts } from '@/lib/products-db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')
    const category = searchParams.get('category')

    let products

    if (query) {
      products = await searchProducts(query)
    } else if (category) {
      // Filter by category could be added to products-db.ts
      const allProducts = await getAllProducts()
      products = allProducts.filter((p) => p.category === category)
    } else {
      products = await getAllProducts()
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Validate admin session
    const isAuthenticated = await validateAdminSession()
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, price, category, image, inStock } = body

    // Validate required fields
    if (!name || price === undefined || inStock === undefined) {
      return NextResponse.json({ error: 'Missing required fields: name, price, inStock' }, { status: 400 })
    }

    // Validate price is a number
    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json({ error: 'Price must be a positive number' }, { status: 400 })
    }

    const newProduct = await createProduct({
      name,
      description: description || '',
      price,
      category: category || 'Uncategorized',
      image: image || '',
      inStock: Boolean(inStock),
      rating: 0,
      reviews: [],
    })

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
