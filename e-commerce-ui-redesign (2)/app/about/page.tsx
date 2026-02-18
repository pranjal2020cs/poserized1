import type { Metadata } from 'next'
import Link from 'next/link'
import { Users, Zap, Heart } from 'lucide-react'
import { PageHero } from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about our blog platform and team.',
  openGraph: {
    title: 'About | Modern Blog Platform',
    description: 'Learn more about our blog platform and team.',
  },
}

export default function AboutPage() {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & Lead Writer',
      description: 'Full-stack developer with 8+ years of experience in web development.',
    },
    {
      name: 'Marcus Johnson',
      role: 'Frontend Specialist',
      description: 'Expert in React, Next.js, and modern CSS techniques.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Content Creator',
      description: 'Technical writer passionate about education and knowledge sharing.',
    },
    {
      name: 'David Kim',
      role: 'DevOps Engineer',
      description: 'Infrastructure specialist focused on performance and scalability.',
    },
  ]

  const values = [
    {
      icon: Heart,
      title: 'Quality First',
      description: 'We prioritize quality content and best practices in every article we publish.',
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'We build for our community and welcome feedback from readers.',
    },
    {
      icon: Zap,
      title: 'Innovation Driven',
      description: 'We stay at the forefront of technology and share the latest trends.',
    },
  ]

  return (
    <div>
      <PageHero
        title="About Us"
        subtitle="Our Story"
        description="We are a team of passionate developers and writers committed to sharing knowledge and building exceptional digital experiences. Our blog is dedicated to providing high-quality content on web development, design, and technology trends."
        imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=800&fit=crop"
      />

      {/* Mission Section */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container-max max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            To democratize web development knowledge by creating high-quality, accessible content that helps developers of all levels improve their skills and stay updated with the latest technologies and best practices.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We believe that great documentation and thoughtful tutorials can transform how people learn and grow in their careers. That's why we focus on clarity, depth, and practical examples in every article.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-secondary border-b border-border">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(value => {
              const Icon = value.icon
              return (
                <div key={value.title} className="flex flex-col items-start">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground mb-12">
            Talented individuals dedicated to creating exceptional content and experiences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map(member => (
              <div
                key={member.name}
                className="p-6 bg-secondary rounded-lg border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-primary rounded-lg mb-4 flex items-center justify-center text-primary-foreground font-bold text-xl">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-secondary border-b border-border">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <p className="text-muted-foreground">Articles Published</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <p className="text-muted-foreground">Readers Monthly</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">4</div>
              <p className="text-muted-foreground">Team Members</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2020</div>
              <p className="text-muted-foreground">Year Founded</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Learn?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our blog and join thousands of developers learning something new every day.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Read Our Blog
          </Link>
        </div>
      </section>
    </div>
  )
}
