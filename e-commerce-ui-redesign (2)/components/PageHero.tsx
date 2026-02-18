'use client'

interface PageHeroProps {
  title: string
  subtitle?: string
  description?: string
  videoUrl?: string
  imageUrl?: string
}

export function PageHero({ title, subtitle, description, videoUrl, imageUrl }: PageHeroProps) {
  return (
    <section className="relative w-full bg-black text-white overflow-hidden min-h-[40vh] md:min-h-[50vh]">
      {/* Background Video or Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt="Hero background"
            className="w-full h-full object-cover opacity-40"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source
              src="https://v0.blob.vercel-storage.com/rcarecords-hero-background-optimized.mp4"
              type="video/mp4"
            />
          </video>
        )}
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Main hero content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-4 md:px-8 py-24 md:py-32">
        <div className="w-full max-w-3xl mx-auto text-center space-y-6">
          {/* Subtitle/Badge */}
          {subtitle && (
            <div className="inline-block">
              <span className="px-4 py-2 text-xs font-bold text-accent uppercase tracking-wider border border-white/30 rounded-sm">
                {subtitle}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight text-balance">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-lg md:text-xl text-white/80 leading-relaxed text-balance max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
