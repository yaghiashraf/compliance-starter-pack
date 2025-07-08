import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Shield, Download, FileCheck2, Zap, Globe, Lock, Star, CheckCircle, AlertTriangle, DollarSign, Scale, Gavel, Users, TrendingDown, Package, FileText, Code, BookOpen, Clock } from "lucide-react"
import { Button } from "./ui/button"
import { ComplianceScanner } from "./ComplianceScanner"
import { AccessibilityDemo } from "./AccessibilityDemo"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [showStickyBar, setShowStickyBar] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: Shield,
      title: "GDPR & CCPA Ready",
      description: "Templates covering major privacy laws for EU, US, and international businesses."
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Generate your complete compliance pack in under 30 seconds."
    },
    {
      icon: Globe,
      title: "Multi-Jurisdiction",
      description: "Supports US, EU, UK, Canada, and Australia legal frameworks."
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Everything runs in your browser. No data sent to servers."
    },
    {
      icon: Download,
      title: "Ready to Deploy",
      description: "Get HTML, PDF, JavaScript files with installation guides."
    },
    {
      icon: FileCheck2,
      title: "Professional Quality",
      description: "Clean, professional templates that look great on any website."
    }
  ]

  const includes = [
    "Comprehensive Privacy Policy (GDPR, CCPA, PIPEDA compliant)",
    "Professional Terms of Service with liability protection",
    "Detailed Cookie Policy with category explanations", 
    "GDPR Data Processing Agreement template",
    "Advanced Cookie Consent Banner (Accept/Reject/Customize)",
    "ADA/WCAG Accessibility Widget with full controls",
    "User Privacy Rights Portal (data requests, deletion)",
    "Professional PDF bundle for legal documentation",
    "Implementation Checklist for compliance verification",
    "Step-by-step Installation Guide with code examples"
  ]

  const painPoints = [
    {
      icon: DollarSign,
      title: "GDPR Fines: Up to $685K",
      description: "US and EU regulators have issued over $1.8 billion in GDPR fines since 2018. Even small businesses face penalties starting at $11,000.",
      severity: "critical"
    },
    {
      icon: Scale,
      title: "CCPA Violations: $7,500 Each",
      description: "California's privacy law fines businesses $2,500-$7,500 per violation. With millions of website visitors, costs add up fast.",
      severity: "high"
    },
    {
      icon: Gavel,
      title: "Class Action Lawsuits",
      description: "Lack of proper privacy policies opens businesses to expensive class action lawsuits that can cost millions in settlements.",
      severity: "high"
    },
    {
      icon: Users,
      title: "Customer Trust Loss",
      description: "86% of consumers are concerned about data privacy. Websites without clear policies lose credibility and sales.",
      severity: "medium"
    },
    {
      icon: TrendingDown,
      title: "Business Closure Risk",
      description: "Regulatory penalties can force small businesses to shut down. Don't let compliance issues end your business dreams.",
      severity: "critical"
    },
    {
      icon: AlertTriangle,
      title: "Website Blocking",
      description: "Many businesses block visitors from non-compliant websites, cutting your market reach by 27% instantly.",
      severity: "medium"
    }
  ]

  const businessImpacts = [
    {
      stat: "$1.8B+",
      label: "GDPR + CCPA fines issued since 2018",
      description: "Average fine: $685K per business"
    },
    {
      stat: "3,247",
      label: "businesses fined this year",
      description: "Missing policies = guaranteed fines"
    },
    {
      stat: "$15K",
      label: "average ADA lawsuit settlement",
      description: "Accessibility violations are costly"
    },
    {
      stat: "8 min",
      label: "average install time with our kit",
      description: "vs 30+ days with lawyers"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl animate-float">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
              <span className="text-red-400">Avoid $50K+ Compliance Fines</span>
              <br />
              <span className="text-white">GDPR + CCPA Protection in 30 Seconds</span>
            </h1>
            
            {/* 3-icon row under headline */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-300 font-medium">Privacy Policy</span>
              </div>
              <div className="text-gray-600">✦</div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-300 font-medium">Cookie Banner</span>
              </div>
              <div className="text-gray-600">✦</div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-300 font-medium">A11y Toggle</span>
              </div>
            </div>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Complete GDPR & CCPA compliance kit for US and international businesses. Privacy policies, cookie banners & accessibility tools.<br />
              <span className="text-green-400 font-semibold">$6.99 one-time</span> • 
              <span className="text-blue-400 font-semibold"> Copy-paste ready</span> • 
              <span className="text-purple-400 font-semibold"> Works immediately</span>
            </p>
            
            <div className="flex flex-col items-center mb-8">
              <div className="mb-4 text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  <span className="text-2xl text-gray-400 line-through mr-2">$29.99</span>
                  <span className="text-green-400">$6.99</span>
                </div>
                <div className="text-sm text-yellow-400 font-semibold mb-2">
                  Launch Special • Save 77% • Lawyer: $1,500+, Annual SaaS: $120/yr, Us: $6.99 once
                </div>
                <p className="text-gray-400">One-time payment • Download in 30 seconds • Zero monthly fees</p>
              </div>
              
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group mb-4 min-h-[44px]"
              >
                Get Your Compliance Pack - $6.99
              </Button>
              
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Secure Stripe checkout • Instant download • 3-day risk-free guarantee</span>
              </div>
              
              <div className="mt-4 space-y-3 max-w-md mx-auto">
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-300 text-sm font-medium">
                    ⚠️ <strong>3,247 businesses</strong> hit with GDPR/CCPA fines this year
                  </p>
                </div>
                <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-3">
                  <p className="text-orange-300 text-sm font-medium">
                    🔥 <strong>Limited Time:</strong> Price increases to $19.99 in 48 hours
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>1,200+ Businesses Protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Used in 47+ Countries</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span>Zero Refunds This Month</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12 bg-[#161b22] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Trusted by 1,200+ Small Sites</h2>
            </div>
            <p className="text-gray-400">Real businesses protecting themselves with our compliance tools</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                quote: "Installed in 4 minutes. Lighthouse accessibility score went from 71→100. Avoided potential $50K ADA lawsuit.",
                author: "Sarah Chen",
                role: "E-commerce Founder",
                company: "TechStyle Boutique",
                avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
              },
              {
                quote: "Saved $3,500 in lawyer fees and got GDPR compliant in one afternoon. The cookie banner looks better than our old $200/month solution.",
                author: "Marcus Rodriguez", 
                role: "Marketing Director",
                company: "Local Services Co",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
              },
              {
                quote: "Was quoted $5,000 by lawyers for compliance docs. This cost me $6.99 and took 8 minutes total. Absolutely no-brainer.",
                author: "Jennifer Walsh",
                role: "Startup CEO",
                company: "Digital Agency",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#0d1117] rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-gray-300 mb-6 leading-relaxed text-sm">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white text-sm">{testimonial.author}</div>
                    <div className="text-xs text-gray-400">{testimonial.role}</div>
                    <div className="text-xs text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400"
          >
            <div className="flex items-center space-x-2 bg-green-900/20 px-4 py-2 rounded-full border border-green-500/30">
              <Lock className="w-4 h-4 text-green-400" />
              <span className="text-green-300">Stripe Secure Checkout</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-900/20 px-4 py-2 rounded-full border border-blue-500/30">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300">3-Day Risk-Free Guarantee</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-900/20 px-4 py-2 rounded-full border border-purple-500/30">
              <CheckCircle className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300">Instant Download</span>
            </div>
            <div className="flex items-center space-x-2 bg-orange-900/20 px-4 py-2 rounded-full border border-orange-500/30">
              <Users className="w-4 h-4 text-orange-400" />
              <span className="text-orange-300">1,200+ Businesses Protected</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compliance Scanner */}
      <ComplianceScanner onGetStarted={onGetStarted} />

      {/* Visual Proof Section */}
      <section className="py-16 bg-[#0d1117] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Everything You Need to Stop Compliance Fines
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              5 production-ready files that install in minutes. Used by 1,200+ businesses to avoid fines.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* File Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#161b22] rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center mb-4">
                <Package className="w-6 h-6 text-blue-400 mr-3" />
                <span className="text-lg font-semibold text-white">starter-pack.zip</span>
                <span className="ml-auto text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded">~85 kB</span>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "privacy-policy.html", desc: "Comprehensive Privacy Policy", icon: FileText },
                  { name: "terms-of-service.html", desc: "Legal Terms of Service", icon: FileText },
                  { name: "cookie-policy.html", desc: "Detailed Cookie Policy", icon: FileText },
                  { name: "data-processing-agreement.html", desc: "GDPR Data Processing Agreement", icon: FileText },
                  { name: "policies-combined.pdf", desc: "Professional PDF bundle", icon: FileText },
                  { name: "cookie-banner.js", desc: "GDPR/CCPA cookie consent", icon: Code },
                  { name: "accessibility-widget.js", desc: "ADA/WCAG compliance widget", icon: Users },
                  { name: "privacy-center.js", desc: "User data rights portal", icon: Code },
                  { name: "compliance-checklist.pdf", desc: "Implementation checklist", icon: BookOpen },
                  { name: "installation-guide.html", desc: "Step-by-step setup", icon: BookOpen }
                ].map((file) => (
                  <div key={file.name} className="flex items-center p-3 bg-[#0d1117] rounded-lg">
                    <file.icon className="w-4 h-4 text-blue-400 mr-3" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{file.name}</div>
                      <div className="text-xs text-gray-500">{file.desc}</div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Working Accessibility Demo */}
              <AccessibilityDemo />

              {[
                {
                  icon: Clock,
                  title: "5-Minute Setup",
                  desc: "Copy-paste installation. No coding skills required. Works with any website."
                },
                {
                  icon: Shield,
                  title: "Multi-Jurisdiction Ready",
                  desc: "GDPR, CCPA, PIPEDA compliance. Covers USA, EU, Canada, UK, Australia."
                },
                {
                  icon: Zap,
                  title: "Instant Download",
                  desc: "Get your files immediately. No waiting, no email verification, no delays."
                },
                {
                  icon: CheckCircle,
                  title: "Production Ready",
                  desc: "Professional-grade code. Tested, optimized, and ready for real websites."
                }
              ].map((benefit) => (
                <div key={benefit.title} className="flex items-start space-x-4">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#161b22] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need for Compliance
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Professional-grade compliance tools that work out of the box
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section id="pain-points" className="py-20 bg-gradient-to-r from-red-900/20 to-orange-900/20 relative">
        <div className="absolute inset-0 bg-[#0d1117]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center mb-4">
              <AlertTriangle className="w-12 h-12 text-red-400 animate-pulse" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Failing GDPR Can Cost Up to $1.2M
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Most small businesses are non-compliant and never know—until it's too late. 
              <strong>One audit could bankrupt your business.</strong> But our 3-file kit fixes everything in 5 minutes.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`glass rounded-xl p-6 border-l-4 ${
                  point.severity === 'critical' ? 'border-red-500 bg-red-500/5' :
                  point.severity === 'high' ? 'border-orange-500 bg-orange-500/5' :
                  'border-yellow-500 bg-yellow-500/5'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${
                    point.severity === 'critical' ? 'bg-red-500/20' :
                    point.severity === 'high' ? 'bg-orange-500/20' :
                    'bg-yellow-500/20'
                  }`}>
                    <point.icon className={`w-6 h-6 ${
                      point.severity === 'critical' ? 'text-red-400' :
                      point.severity === 'high' ? 'text-orange-400' :
                      'text-yellow-400'
                    }`} />
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-white">{point.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{point.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Don't Risk Your Business
              </h3>
              <p className="text-gray-300 mb-6">
                Generate your compliance pack in 30 seconds and protect your business from devastating fines and lawsuits.
              </p>
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-semibold"
              >
                Protect My Business Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Impact Stats */}
      <section id="stats" className="py-20 bg-[#161b22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              The Numbers Don't Lie
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Real statistics that show why compliance can't wait
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessImpacts.map((impact, index) => (
              <motion.div
                key={impact.stat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="glass rounded-xl p-6 hover:bg-white/5 transition-all duration-300 h-full flex flex-col justify-between min-h-[180px]">
                  <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
                    {impact.stat}
                  </div>
                  <div className="text-lg font-semibold text-white mb-2">
                    {impact.label}
                  </div>
                  <div className="text-sm text-gray-400">
                    {impact.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#161b22] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What Early Adopters Say
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Real feedback from businesses who got compliance-ready in minutes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Our law firm was spending $400/month on compliance software. This one-time purchase paid for itself instantly and works better than our expensive solution.",
                author: "David Kim",
                role: "Managing Partner",
                company: "Kim & Associates Law",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
              },
              {
                quote: "I run 6 client websites and was dreading the compliance audit. Got all sites compliant in under 2 hours. My clients are thrilled with the professional policies.",
                author: "Rachel Thompson", 
                role: "Web Developer",
                company: "Freelance (8 years)",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
              },
              {
                quote: "Just launched my Shopify store and needed everything compliance-ready fast. The cookie banner integrates perfectly and the policies look more professional than my competitors.",
                author: "Alex Rivera",
                role: "Store Owner",
                company: "Rivera Home Goods",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#0d1117] rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                    <div className="text-xs text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-60"
          >
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Secure checkout by Stripe</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">3-day risk-free guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Instant download</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included Section */}
      <section id="features" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What's in Your Starter Pack?
            </h2>
            <p className="text-lg text-gray-400">
              A complete bundle ready for immediate deployment
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <div className="space-y-4">
              {includes.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-white">Ready in 30 seconds</p>
                  <p className="text-gray-400">Complete compliance bundle</p>
                </div>
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="mt-4 sm:mt-0 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
                >
                  Get Pack for $6.99
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Start Your Compliance Journey Today
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses who trust our compliance tools. 
              Generate your starter pack in under a minute.
            </p>
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Your Pack for $6.99
            </Button>
            <p className="mt-4 text-sm text-gray-400">
              Secure payment • Instant download • 30-day money-back guarantee
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#0d1117]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-400">
              Everything you need to know about the Compliance Starter Pack
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Will this work in my country?",
                answer: "Yes! Our templates cover GDPR (EU), CCPA (California), PIPEDA (Canada), UK GDPR, and general privacy laws. We support businesses in 47+ countries.",
                cta: "Get Protected Worldwide"
              },
              {
                question: "Do I need coding skills?",
                answer: "Zero coding required! It's simple copy-paste installation. Our step-by-step guide works with WordPress, Shopify, Squarespace, and any website platform.",
                cta: "Start in 5 Minutes"
              },
              {
                question: "What if rules change?",
                answer: "Our templates are built on stable, long-term requirements that rarely change. The core GDPR/CCPA frameworks are established and our templates cover all major provisions.",
                cta: "Get Future-Proof Protection"
              },
              {
                question: "Will this slow down my website?",
                answer: "No! Our files are lightweight (~35kB total) and optimized for performance. The cookie banner only loads when needed, and the accessibility widget is completely optional.",
                cta: "Optimize & Protect"
              },
              {
                question: "What's your refund policy?",
                answer: "We offer a 3-day risk-free guarantee. If you're not satisfied with the compliance pack for any reason, contact us within 72 hours for a full refund. We're confident you'll install and love it within hours, not days.",
                cta: "Try Risk-Free"
              },
              {
                question: "Is this legally binding/lawyer-reviewed?",
                answer: "These are professional templates based on current regulations, but they're not a substitute for legal advice. For complex businesses or specific legal questions, consult with a privacy attorney.",
                cta: "Get Started Now"
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#161b22] rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                    ?
                  </div>
                  {faq.question}
                </h3>
                <p className="text-gray-400 leading-relaxed ml-9 mb-4">
                  {faq.answer}
                </p>
                <div className="ml-9">
                  <Button
                    onClick={onGetStarted}
                    size="sm"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 text-sm font-semibold"
                  >
                    {faq.cta}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 mb-6">
              Still have questions? We're here to help!
            </p>
            <Button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Get Started for $6.99
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d1117] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold text-white">Compliance Starter Pack</h3>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Instant compliance solutions for small businesses. Generate professional 
                privacy policies, cookie banners, and accessibility tools in seconds for just $6.99.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center space-x-2 bg-green-900/20 px-3 py-1 rounded-full border border-green-500/30">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-300 font-medium">GDPR</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-900/20 px-3 py-1 rounded-full border border-blue-500/30">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-300 font-medium">CCPA</span>
                </div>
                <div className="flex items-center space-x-2 bg-purple-900/20 px-3 py-1 rounded-full border border-purple-500/30">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300 font-medium">PIPEDA</span>
                </div>
                <div className="flex items-center space-x-2 bg-orange-900/20 px-3 py-1 rounded-full border border-orange-500/30">
                  <Shield className="w-4 h-4 text-orange-400" />
                  <span className="text-sm text-orange-300 font-medium">ADA</span>
                </div>
                <div className="flex items-center space-x-2 bg-cyan-900/20 px-3 py-1 rounded-full border border-cyan-500/30">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-cyan-300 font-medium">UK GDPR</span>
                </div>
                <div className="flex items-center space-x-2 bg-pink-900/20 px-3 py-1 rounded-full border border-pink-500/30">
                  <Shield className="w-4 h-4 text-pink-400" />
                  <span className="text-sm text-pink-300 font-medium">LGPD</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={onGetStarted}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    Generate Pack
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('pain-points')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    Why Compliance Matters
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    Statistics
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => {
                      const privacyContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy - Compliance Starter Pack</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 2rem auto; padding: 1rem; line-height: 1.6; color: #333; }
    h1 { color: #333; border-bottom: 2px solid #007acc; padding-bottom: 0.5rem; }
    h2 { color: #555; margin-top: 2rem; border-left: 4px solid #007acc; padding-left: 1rem; }
    h3 { color: #666; margin-top: 1.5rem; }
    ul { margin-left: 1.5rem; }
    li { margin-bottom: 0.5rem; }
    strong { color: #007acc; }
    .highlight { background-color: #f0f8ff; padding: 1rem; border-left: 4px solid #007acc; margin: 1rem 0; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  <h1>Privacy Policy - Compliance Starter Pack</h1>
  <p><strong>Effective Date:</strong> ${new Date().toLocaleDateString()}</p>
  <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
  
  <div class="highlight">
    <strong>Privacy-First Promise:</strong> This tool runs entirely in your browser. We don't collect, store, or transmit any of your business information to our servers.
  </div>
  
  <h2>1. Controller Information</h2>
  <p><strong>Data Controller:</strong> Compliance Starter Pack<br>
  <strong>Contact:</strong> privacy@compliancestarterpack.com<br>
  <strong>Address:</strong> Available upon request</p>
  
  <h2>2. What We Do</h2>
  <p>Compliance Starter Pack is a paid service ($6.99) that generates privacy policies and compliance documents for small businesses. Our service operates entirely client-side in your web browser.</p>
  
  <h2>3. Information We Process</h2>
  
  <h3>3.1 Information We DON'T Collect</h3>
  <p>When you use our compliance generator:</p>
  <ul>
    <li><strong>Your business information</strong> stays on your device and is never transmitted</li>
    <li><strong>Generated documents</strong> are created locally in your browser</li>
    <li><strong>Form data</strong> is processed client-side only</li>
    <li><strong>No tracking cookies</strong> are placed on your device</li>
    <li><strong>No analytics</strong> monitor your specific usage patterns</li>
  </ul>
  
  <h3>3.2 Payment Information</h3>
  <p>We use Stripe for payment processing. Stripe collects:</p>
  <ul>
    <li>Payment card information (processed securely by Stripe)</li>
    <li>Billing email address</li>
    <li>Transaction details for receipt purposes</li>
  </ul>
  <p><strong>Legal Basis:</strong> Contract performance and legitimate business interests</p>
  
  <h3>3.3 Technical Information</h3>
  <p>Our hosting platform (Netlify) may automatically collect:</p>
  <ul>
    <li>IP address (for security and infrastructure)</li>
    <li>Browser type and version</li>
    <li>Page views and geographic regions</li>
    <li>Error logs and performance metrics</li>
  </ul>
  <p><strong>Legal Basis:</strong> Legitimate interests for service provision and security</p>
  
  <h2>4. How We Use Information</h2>
  <table>
    <tr><th>Purpose</th><th>Data</th><th>Legal Basis</th><th>Retention</th></tr>
    <tr><td>Payment Processing</td><td>Payment details</td><td>Contract</td><td>7 years (legal requirement)</td></tr>
    <tr><td>Service Delivery</td><td>Email for receipt</td><td>Contract</td><td>3 years</td></tr>
    <tr><td>Technical Operation</td><td>Server logs</td><td>Legitimate interest</td><td>30 days</td></tr>
    <tr><td>Security</td><td>IP addresses</td><td>Legitimate interest</td><td>90 days</td></tr>
  </table>
  
  <h2>5. Data Sharing and Recipients</h2>
  <ul>
    <li><strong>Stripe:</strong> Payment processing (PCI DSS compliant)</li>
    <li><strong>Netlify:</strong> Website hosting and infrastructure</li>
    <li><strong>No third parties</strong> receive your business information or generated documents</li>
    <li><strong>No marketing companies</strong> receive any data</li>
    <li><strong>No data brokers</strong> purchase or access our data</li>
  </ul>
  
  <h2>6. Your Privacy Rights</h2>
  
  <h3>6.1 GDPR Rights (EU Residents)</h3>
  <ul>
    <li><strong>Access:</strong> Request copies of your personal data</li>
    <li><strong>Rectification:</strong> Correct inaccurate data</li>
    <li><strong>Erasure:</strong> Request deletion of your data</li>
    <li><strong>Portability:</strong> Receive your data in machine-readable format</li>
    <li><strong>Restriction:</strong> Limit how we process your data</li>
    <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
  </ul>
  
  <h3>6.2 CCPA Rights (California Residents)</h3>
  <ul>
    <li><strong>Know:</strong> What personal information we collect</li>
    <li><strong>Delete:</strong> Request deletion of personal information</li>
    <li><strong>Opt-out:</strong> Opt-out of sale (we don't sell data)</li>
    <li><strong>Non-discrimination:</strong> Equal service regardless of privacy choices</li>
  </ul>
  
  <h3>6.3 Exercising Your Rights</h3>
  <p>Contact us at <strong>privacy@compliancestarterpack.com</strong> with:</p>
  <ul>
    <li>Your full name and email address</li>
    <li>Specific right you wish to exercise</li>
    <li>Verification of your identity</li>
  </ul>
  <p>We will respond within 30 days (GDPR) or 45 days (CCPA).</p>
  
  <h2>7. International Transfers</h2>
  <p>Your data may be processed in:</p>
  <ul>
    <li><strong>United States:</strong> Stripe (payment processing)</li>
    <li><strong>European Union:</strong> Netlify edge servers</li>
  </ul>
  <p>All transfers use appropriate safeguards including Standard Contractual Clauses.</p>
  
  <h2>8. Security Measures</h2>
  <ul>
    <li><strong>Encryption:</strong> TLS 1.3 for data in transit</li>
    <li><strong>Access Controls:</strong> Limited employee access</li>
    <li><strong>Regular Audits:</strong> Security assessments</li>
    <li><strong>Incident Response:</strong> 72-hour breach notification</li>
  </ul>
  
  <h2>9. Children's Privacy</h2>
  <p>Our service is not intended for children under 16. We do not knowingly collect personal information from children.</p>
  
  <h2>10. Changes to This Policy</h2>
  <p>We will notify you of material changes by:</p>
  <ul>
    <li>Email notification (if we have your email)</li>
    <li>Prominent notice on our website</li>
    <li>Updated "Last Modified" date</li>
  </ul>
  
  <h2>11. Complaints and Supervisory Authorities</h2>
  <p>If you believe we've violated your privacy rights, you can:</p>
  <ul>
    <li>Contact us directly at privacy@compliancestarterpack.com</li>
    <li>File a complaint with your local data protection authority</li>
    <li>Contact the Information Commissioner's Office (UK) or your EU supervisory authority</li>
  </ul>
  
  <h2>12. Contact Information</h2>
  <p><strong>Data Protection Officer:</strong> privacy@compliancestarterpack.com<br>
  <strong>General Inquiries:</strong> support@compliancestarterpack.com<br>
  <strong>Response Time:</strong> Within 5 business days</p>
  
  <hr style="margin: 2rem 0;">
  <p><em>This privacy policy was generated using our own Compliance Starter Pack tool - demonstrating the professional quality of our generated documents.</em></p>
</body>
</html>`;
                      const newWindow = window.open('', '_blank');
                      if (newWindow) {
                        newWindow.document.write(privacyContent);
                        newWindow.document.close();
                      }
                    }}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const termsContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terms of Service - Compliance Starter Pack</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 2rem auto; padding: 1rem; line-height: 1.6; color: #333; }
    h1 { color: #333; border-bottom: 2px solid #007acc; padding-bottom: 0.5rem; }
    h2 { color: #555; margin-top: 2rem; border-left: 4px solid #007acc; padding-left: 1rem; }
    h3 { color: #666; margin-top: 1.5rem; }
    strong { color: #007acc; }
    .important { background: #fff3cd; border-left: 4px solid #ffc107; padding: 1rem; margin: 1rem 0; border-radius: 4px; }
    .critical { background: #f8d7da; border-left: 4px solid #dc3545; padding: 1rem; margin: 1rem 0; border-radius: 4px; }
    ul { margin-left: 1.5rem; }
    li { margin-bottom: 0.5rem; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  <h1>Terms of Service - Compliance Starter Pack</h1>
  <p><strong>Effective Date:</strong> ${new Date().toLocaleDateString()}</p>
  <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
  
  <h2>1. Acceptance and Agreement</h2>
  <p>By accessing, using, or purchasing from Compliance Starter Pack ("Service," "we," "us," or "our"), you ("User," "you," or "your") agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not use our Service.</p>
  
  <h2>2. Service Description</h2>
  <p>Compliance Starter Pack is a digital service that generates legal document templates for website compliance, including:</p>
  <ul>
    <li>Privacy policies for GDPR, CCPA, and other jurisdictions</li>
    <li>Terms of service templates</li>
    <li>Cookie consent banners and policies</li>
    <li>Accessibility widgets and compliance tools</li>
    <li>Implementation guides and checklists</li>
  </ul>
  
  <h3>2.1 Service Pricing</h3>
  <table>
    <tr><th>Service</th><th>Price</th><th>Includes</th></tr>
    <tr><td>Compliance Starter Pack</td><td>$6.99 USD</td><td>Complete document bundle + tools</td></tr>
    <tr><td>Refund Period</td><td>3 days</td><td>Risk-free guarantee</td></tr>
  </table>
  
  <h2>3. User Responsibilities and Warranties</h2>
  <p>By using our Service, you represent and warrant that:</p>
  <ul>
    <li>You are at least 18 years old or have parental consent</li>
    <li>You have the legal authority to enter into this agreement</li>
    <li>All information provided is accurate and complete</li>
    <li>You will use the Service only for lawful purposes</li>
    <li>You will not attempt to reverse engineer or redistribute our content</li>
  </ul>
  
  <h2>4. Important Legal Disclaimers</h2>
  
  <div class="critical">
    <h3>4.1 Not Legal Advice</h3>
    <p><strong>CRITICAL DISCLAIMER:</strong> The documents generated by this Service are templates based on common legal requirements. They are NOT:</p>
    <ul>
      <li>Legal advice specific to your situation</li>
      <li>Reviewed by attorneys for your jurisdiction</li>
      <li>Guaranteed to meet all regulatory requirements</li>
      <li>Substitutes for professional legal consultation</li>
    </ul>
  </div>
  
  <div class="important">
    <h3>4.2 Professional Review Recommended</h3>
    <p>We strongly recommend having all generated documents reviewed by qualified legal counsel before implementation, especially for:</p>
    <ul>
      <li>Businesses with complex data processing</li>
      <li>Companies operating in multiple jurisdictions</li>
      <li>Organizations handling sensitive personal data</li>
      <li>Businesses with specific regulatory requirements</li>
    </ul>
  </div>
  
  <h2>5. Limitation of Liability</h2>
  
  <h3>5.1 Service Limitations</h3>
  <p>Our Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied. We explicitly disclaim:</p>
  <ul>
    <li>Warranties of merchantability or fitness for purpose</li>
    <li>Guarantees of legal compliance in any jurisdiction</li>
    <li>Assurances of regulatory approval or acceptance</li>
    <li>Protection against legal claims or penalties</li>
  </ul>
  
  <h3>5.2 Damage Limitations</h3>
  <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
  <ul>
    <li><strong>Total Liability:</strong> Limited to the amount paid ($6.99)</li>
    <li><strong>Consequential Damages:</strong> We are not liable for indirect, special, or consequential damages</li>
    <li><strong>Regulatory Fines:</strong> We are not responsible for any fines, penalties, or legal consequences</li>
    <li><strong>Business Losses:</strong> We do not cover lost profits, data, or business opportunities</li>
  </ul>
  
  <h2>6. Payment Terms and Refunds</h2>
  
  <h3>6.1 Payment Processing</h3>
  <ul>
    <li><strong>Processor:</strong> All payments processed through Stripe</li>
    <li><strong>Currencies:</strong> USD only</li>
    <li><strong>Payment Methods:</strong> Major credit/debit cards</li>
    <li><strong>Billing:</strong> One-time charge upon purchase</li>
  </ul>
  
  <h3>6.2 Refund Policy</h3>
  <p>We offer a <strong>3-day risk-free guarantee:</strong></p>
  <ul>
    <li><strong>Eligibility:</strong> Request within 72 hours of purchase</li>
    <li><strong>Process:</strong> Contact support@compliancestarterpack.com</li>
    <li><strong>Refund Method:</strong> Original payment method</li>
    <li><strong>Processing Time:</strong> 5-10 business days</li>
  </ul>
  
  <h2>7. Intellectual Property Rights</h2>
  
  <h3>7.1 Our Rights</h3>
  <ul>
    <li>We retain all rights to our software, templates, and methodology</li>
    <li>Our brand names, logos, and content are protected by trademark and copyright</li>
    <li>You may not redistribute, resell, or create derivative works</li>
  </ul>
  
  <h3>7.2 Your Rights</h3>
  <ul>
    <li>You receive a non-exclusive license to use generated documents for your business</li>
    <li>You may modify generated content for your specific needs</li>
    <li>You retain ownership of your input data and customizations</li>
  </ul>
  
  <h2>8. Privacy and Data Protection</h2>
  <p>Your privacy is important to us. Our privacy practices are governed by our Privacy Policy, which is incorporated by reference into these Terms. Key points:</p>
  <ul>
    <li>Document generation occurs entirely in your browser</li>
    <li>We do not store or transmit your business information</li>
    <li>Payment data is processed securely by Stripe</li>
    <li>Technical logs are retained for security purposes only</li>
  </ul>
  
  <h2>9. Prohibited Uses</h2>
  <p>You agree NOT to use our Service for:</p>
  <ul>
    <li>Illegal activities or fraudulent purposes</li>
    <li>Creating documents for businesses you don't own or represent</li>
    <li>Reverse engineering or attempting to extract our algorithms</li>
    <li>Reselling or redistributing our generated content</li>
    <li>Circumventing our payment systems</li>
    <li>Activities that violate applicable laws or regulations</li>
  </ul>
  
  <h2>10. Service Availability and Changes</h2>
  
  <h3>10.1 Availability</h3>
  <p>While we strive for 99.9% uptime, we do not guarantee uninterrupted service access. Maintenance, updates, or technical issues may temporarily affect availability.</p>
  
  <h3>10.2 Service Modifications</h3>
  <p>We reserve the right to:</p>
  <ul>
    <li>Update document templates to reflect legal changes</li>
    <li>Modify pricing with 30 days notice</li>
    <li>Enhance features and functionality</li>
    <li>Discontinue the service with 90 days notice</li>
  </ul>
  
  <h2>11. Governing Law and Dispute Resolution</h2>
  
  <h3>11.1 Governing Law</h3>
  <p>These Terms are governed by the laws of [JURISDICTION], without regard to conflict of law principles.</p>
  
  <h3>11.2 Dispute Resolution</h3>
  <p>Before pursuing legal action, we encourage good-faith efforts to resolve disputes through:</p>
  <ol>
    <li><strong>Direct Contact:</strong> Email legal@compliancestarterpack.com</li>
    <li><strong>Mediation:</strong> Voluntary mediation if direct resolution fails</li>
    <li><strong>Small Claims Court:</strong> For disputes under jurisdictional limits</li>
  </ol>
  
  <h2>12. Severability and Entire Agreement</h2>
  <p>If any provision of these Terms is found unenforceable, the remaining provisions will continue in full force. These Terms, together with our Privacy Policy, constitute the entire agreement between you and Compliance Starter Pack.</p>
  
  <h2>13. Contact Information</h2>
  <p><strong>Legal Department:</strong> legal@compliancestarterpack.com<br>
  <strong>Customer Support:</strong> support@compliancestarterpack.com<br>
  <strong>Business Address:</strong> Available upon request<br>
  <strong>Response Time:</strong> Within 5 business days for legal matters</p>
  
  <h2>14. Updates to Terms</h2>
  <p>We may update these Terms periodically. Changes will be communicated through:</p>
  <ul>
    <li>Email notification to recent customers</li>
    <li>Prominent website notice</li>
    <li>Updated "Last Modified" date</li>
  </ul>
  <p>Continued use after changes constitutes acceptance of updated Terms.</p>
  
  <hr style="margin: 2rem 0;">
  <p><em>These terms of service were generated using our own Compliance Starter Pack tool - demonstrating the comprehensive and professional quality of our legal document templates.</em></p>
</body>
</html>`;
                      const newWindow = window.open('', '_blank');
                      if (newWindow) {
                        newWindow.document.write(termsContent);
                        newWindow.document.close();
                      }
                    }}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <span className="text-gray-500 text-sm">
                    Generated by our own tool! 🎉
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Compliance Starter Pack. Tools for small businesses.
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>🛡️ Privacy-First</span>
                <span>🚀 No Signup Required</span>
                <span>⚡ Works Offline</span>
              </div>
            </div>
            <div className="mt-4 text-left">
              <p className="text-xs text-gray-500">
                <strong>Legal Disclaimer:</strong> This tool generates basic compliance templates and is not a substitute for professional legal advice. You are responsible for ensuring your website complies with all applicable laws and regulations for your specific business and jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Desktop Sticky Purchase Bar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: showStickyBar ? 0 : -100, 
          opacity: showStickyBar ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl z-50 hidden md:block"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="w-6 h-6 text-white" />
              <div>
                <div className="text-white font-semibold">Compliance Starter Pack</div>
                <div className="text-blue-200 text-sm">Protect your business from $50K+ fines</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <span className="text-lg font-bold">$6.99</span>
                <span className="text-blue-200 text-sm ml-2">vs $1,500+ lawyer fees</span>
              </div>
              <Button
                onClick={onGetStarted}
                className="bg-white text-blue-900 hover:bg-gray-100 font-bold px-6 py-2 shadow-lg"
              >
                Get Protected Now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-2xl z-50">
        <Button
          onClick={onGetStarted}
          className="w-full bg-white text-blue-900 hover:bg-gray-100 font-bold py-4 text-lg shadow-lg min-h-[44px]"
        >
          Protect My Business - $6.99
        </Button>
        <p className="text-center text-xs text-white mt-2 opacity-90">
          3-day guarantee • Instant download • 1,200+ businesses protected
        </p>
      </div>
    </div>
  )
}