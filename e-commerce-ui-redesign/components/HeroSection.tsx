'use client'

export function HeroSection() {
  return (
    <section className="relative w-full bg-black text-white overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source
    src="https://www.w3schools.com/html/mov_bbb.mp4"
    type="video/mp4"
  />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Main hero content - distributed typography */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20">
        {/* Hero Text - Large distributed typography */}
        <div className="w-full max-w-7xl mx-auto space-y-12">
          {/* Line 1 */}
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
            <div className="inline-block">Premium</div>
          </div>

          {/* Line 2 */}
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
            <div className="inline-block">Curated</div>
            <div className="inline-block ml-4">Products</div>
          </div>

          {/* Line 3 */}
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
            <div className="inline-block">For Every</div>
          </div>

          {/* Line 4 */}
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
            <div className="inline-block">Style</div>
          </div>
        </div>

        {/* Scroll indicator at bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
          <p className="text-sm font-light tracking-widest uppercase">Scroll</p>
          <div className="w-0.5 h-8 bg-white animate-pulse" />
        </div>
      </div>

      {/* About Section - Brand Story */}
      <div className="relative w-full bg-black border-t border-white/20">
        <div className="container-max py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Left - About Text */}
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-black leading-tight">
                One of the most curated names in ecommerce
              </h2>
              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                Traces its origins to the dawn of modern retail and has played a pivotal role in shaping the shopping experience of generations. From innovative product discovery to seamless checkout, we've revolutionized how people shop online.
              </p>
              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                Discover premium products handpicked from the world's best sellers and creators. Experience exceptional quality, fast shipping, and world-class customer support.
              </p>
            </div>

            {/* Right - Featured Artists/Partners Grid */}
            <div className="space-y-8">
              <h3 className="text-xl font-black uppercase tracking-wider">Featured Brands</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Nike', 'Adidas', 'Puma', 'Reebok', 'Asics', 'Salomon', 'New Balance', 'Converse'].map((brand) => (
                  <div key={brand} className="flex items-center justify-center py-8 border border-white/20 hover:border-white/40 transition-colors cursor-pointer group">
                    <span className="text-sm font-bold group-hover:text-white/80 transition-colors">{brand}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  )
}
