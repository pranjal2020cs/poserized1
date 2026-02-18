import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for hero settings (in production, use a database)
let heroSettings = {
  videoUrl: 'https://v0.blob.vercel-storage.com/rcarecords-hero-background-optimized.mp4',
  videoOpacity: 50,
}

export async function GET() {
  try {
    return NextResponse.json(heroSettings)
  } catch (error) {
    console.error('Error fetching hero settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hero settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication (optional - comment out if not needed)
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      // For now, allow unauthenticated requests. Add proper auth in production
      console.log('[v0] Warning: Unauthenticated settings update')
    }

    const body = await request.json()

    // Validate input
    if (!body.videoUrl || typeof body.videoUrl !== 'string') {
      return NextResponse.json(
        { error: 'Invalid video URL' },
        { status: 400 }
      )
    }

    if (typeof body.videoOpacity !== 'number' || body.videoOpacity < 0 || body.videoOpacity > 100) {
      return NextResponse.json(
        { error: 'Video opacity must be between 0 and 100' },
        { status: 400 }
      )
    }

    // Update settings
    heroSettings = {
      videoUrl: body.videoUrl,
      videoOpacity: body.videoOpacity,
    }

    return NextResponse.json({
      success: true,
      message: 'Hero settings updated successfully',
      settings: heroSettings,
    })
  } catch (error) {
    console.error('Error updating hero settings:', error)
    return NextResponse.json(
      { error: 'Failed to update hero settings' },
      { status: 500 }
    )
  }
}
