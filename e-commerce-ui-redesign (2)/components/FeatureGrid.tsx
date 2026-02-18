'use client'

import { Zap, Shield, Gauge, Users, Lightbulb, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Experience blazing-fast performance with optimized infrastructure and caching strategies.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with end-to-end encryption and 99.9% uptime guarantee.',
  },
  {
    icon: Gauge,
    title: 'Highly Scalable',
    description: 'Grows with your business. Handle millions of requests without breaking a sweat.',
  },
  {
    icon: Users,
    title: 'Easy to Use',
    description: 'Intuitive interface designed for users of all technical skill levels.',
  },
  {
    icon: Lightbulb,
    title: 'Innovative Solutions',
    description: 'Cutting-edge technology and continuous innovation to stay ahead of the curve.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Focused',
    description: 'Tools and analytics to help you maximize growth and ROI on every campaign.',
  },
]

export function FeatureGrid() {
  return (
    <section className="section relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/20 to-cyan-50/20 -z-10" />

      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 animate-slideUp">
          <span className="badge badge-accent">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6 mb-6 text-balance text-foreground leading-tight">
            Powerful Features for Your Success
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-lg mx-auto">
            Everything you need to build, deploy, and scale your applications with confidence.
          </p>
        </div>

        {/* Grid */}
        <div className="feature-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="card-premium group p-8 md:p-10 hover:shadow-premium transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon Container */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary group-hover:to-accent text-primary group-hover:text-white transition-all duration-500 mb-6 shadow-soft group-hover:shadow-md">
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-base leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition-all duration-500 rounded-b-xl" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
