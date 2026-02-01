'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { Mail, Send, CheckCircle, ArrowRight } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: submitError } = await supabase
      .from('contact_messages')
      .insert([{
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        subject: formData.subject,
        message: formData.message,
        created_at: new Date().toISOString()
      }])

    if (submitError) {
      setError('Failed to send message. Please try again or email us directly.')
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      setFormData({ name: '', email: '', company: '', subject: '', message: '' })
    }
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Nav />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block px-3 py-1 border border-white/20 text-xs font-mono uppercase tracking-widest mb-6 text-gray-400">
            Get in Touch
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl leading-relaxed">
            Have questions about our services? Ready to discuss how we can help optimize your DeFi strategy? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif font-bold mb-8">Send us a message</h2>

              {success ? (
                <div className="border border-green-500/30 bg-green-500/10 p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-serif font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">
                    Thank you for reaching out. We'll get back to you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-sm text-gray-400 hover:text-white transition-colors underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2 font-mono uppercase tracking-wider">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-transparent border border-white/20 text-white placeholder-gray-600 focus:border-white/40 focus:outline-none transition-colors"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2 font-mono uppercase tracking-wider">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-transparent border border-white/20 text-white placeholder-gray-600 focus:border-white/40 focus:outline-none transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2 font-mono uppercase tracking-wider">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-transparent border border-white/20 text-white placeholder-gray-600 focus:border-white/40 focus:outline-none transition-colors"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2 font-mono uppercase tracking-wider">
                        Subject *
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-transparent border border-white/20 text-white placeholder-gray-600 focus:border-white/40 focus:outline-none transition-colors"
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-mono uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 text-white placeholder-gray-600 focus:border-white/40 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project or inquiry..."
                      required
                    />
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm border border-red-500/30 bg-red-500/10 px-4 py-3">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-3 w-full px-8 py-4 bg-white text-black font-serif font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:pl-8">
              <h2 className="text-2xl font-serif font-bold mb-8">Direct Contact</h2>

              <div className="border border-white/10 p-8 mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Email Us Directly
                    </h3>
                    <a
                      href="mailto:contact@unifiedlabs.io"
                      className="text-xl font-serif text-white hover:text-gray-300 transition-colors"
                    >
                      contact@unifiedlabs.io
                    </a>
                  </div>
                </div>

                <a
                  href="mailto:contact@unifiedlabs.io?subject=Inquiry%20from%20Website"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 border border-white/20 text-white font-mono text-sm uppercase tracking-wider hover:bg-white/5 transition-colors"
                >
                  Open Email Client
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="border border-white/10 p-8">
                <h3 className="text-sm font-mono uppercase tracking-wider text-gray-400 mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-4 text-gray-400">
                  <li className="flex items-start gap-3">
                    <span className="text-white font-mono">01</span>
                    <span>We typically respond within 24-48 business hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white font-mono">02</span>
                    <span>For partnership inquiries, include relevant background</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white font-mono">03</span>
                    <span>Technical questions are welcome - our team loves diving deep</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
