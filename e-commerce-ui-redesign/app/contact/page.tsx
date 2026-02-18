'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { PageHero } from '@/components/PageHero'

// Note: This is client component due to form handling
// For production, use a proper form submission library

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would typically send the form data to an API endpoint
    // For now, we'll just simulate submission
    console.log('Form submitted:', formData)
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    }, 500)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@blog-platform.com',
      href: 'mailto:hello@blog-platform.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'San Francisco, CA',
      href: 'https://maps.google.com',
    },
  ]

  return (
    <div>
      <PageHero
        title="Get in Touch"
        subtitle="Contact Us"
        description="Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        imageUrl="https://images.unsplash.com/photo-1516321318423-f06a6ba504bc?w=1600&h=800&fit=crop"
      />

      {/* Contact Info Cards */}
      <section className="py-16 md:py-24 bg-secondary border-b border-border">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map(info => {
              const Icon = info.icon
              return (
                <a
                  key={info.title}
                  href={info.href}
                  target={info.title === 'Location' ? '_blank' : undefined}
                  rel={info.title === 'Location' ? 'noopener noreferrer' : undefined}
                  className="flex flex-col items-center p-6 bg-background rounded-lg border border-border hover:shadow-lg transition-shadow group"
                >
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/90 transition-colors">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                  <p className="text-muted-foreground text-sm text-center">
                    {info.value}
                  </p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24">
        <div className="container-max max-w-2xl">
          <h2 className="text-3xl font-bold mb-12">Send us a Message</h2>
          
          {submitted && (
            <div className="p-4 bg-primary/10 border border-primary rounded-lg mb-6">
              <p className="text-primary font-medium">
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="your@email.com"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="How can we help?"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                placeholder="Your message..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-secondary border-t border-border">
        <div className="container-max max-w-2xl">
          <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'How often do you publish new articles?',
                a: 'We aim to publish new articles twice a week, covering various topics in web development and technology.',
              },
              {
                q: 'Can I submit guest posts?',
                a: 'Yes! We welcome guest contributions. Please contact us with your article idea and we\'ll review it.',
              },
              {
                q: 'How can I stay updated with new content?',
                a: 'You can follow us on social media or check back regularly. We\'re also planning to launch a newsletter soon.',
              },
              {
                q: 'Can I use your articles for commercial purposes?',
                a: 'Our articles are provided as educational content. Please contact us for licensing inquiries.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-6 bg-background rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
