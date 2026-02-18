import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for the blog platform.',
  robots: {
    index: false, // Don't index policy pages
  },
}

export default function PrivacyPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container-max max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4 mt-8">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy explains how we collect, use, disclose, and otherwise handle your information when you visit our blog platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 mt-8">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may collect information about you in a variety of ways. The information we collect on the site may include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Name and email address when you contact us</li>
              <li>IP address and browsing behavior through analytics</li>
              <li>Device information and browser type</li>
              <li>Pages visited and time spent on pages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 mt-8">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect in the following ways:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>To improve our website and user experience</li>
              <li>To respond to your inquiries and requests</li>
              <li>To analyze site traffic and optimize content</li>
              <li>To send promotional communications (only with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 mt-8">Third-Party Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide you advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 mt-8">Analytics</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use analytics services to track and analyze website traffic. This helps us understand how our site is being used and make improvements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 mt-8">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 mt-8">Changes to Our Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this privacy policy to reflect changes in our practices, technology, legal requirements, and other factors. We will notify you by updating the "Last Updated" date of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 mt-8">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions regarding this privacy policy, please contact us at hello@blog-platform.com.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Last Updated: January 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
