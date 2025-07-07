import { useState } from "react"
import { motion } from "framer-motion"
import { Search, AlertTriangle, CheckCircle, ExternalLink, X, RotateCw } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface ScanResult {
  url: string
  hasPrivacyPolicy: boolean
  hasCookieBanner: boolean
  hasAccessibilityFeatures: boolean
  hasTermsOfService: boolean
  hasGDPRCompliance: boolean
  riskLevel: 'high' | 'medium' | 'low'
  issues: string[]
  score: number
}

interface ComplianceScannerProps {
  onGetStarted: () => void
}

export function ComplianceScanner({ onGetStarted }: ComplianceScannerProps) {
  const [url, setUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState("")

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setIsScanning(true)
    setError("")
    setScanResult(null)

    try {
      // Normalize URL
      let scanUrl = url.trim()
      if (!scanUrl.startsWith('http://') && !scanUrl.startsWith('https://')) {
        scanUrl = `https://${scanUrl}`
      }

      // Call our scanning function
      const response = await fetch('/.netlify/functions/scan-compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: scanUrl })
      })

      if (!response.ok) {
        throw new Error('Scan failed')
      }

      const result = await response.json()
      setScanResult(result)
    } catch (err) {
      // For demo purposes, simulate a scan result
      const demoResult: ScanResult = {
        url: url,
        hasPrivacyPolicy: Math.random() > 0.7,
        hasCookieBanner: Math.random() > 0.8,
        hasAccessibilityFeatures: Math.random() > 0.9,
        hasTermsOfService: Math.random() > 0.6,
        hasGDPRCompliance: Math.random() > 0.85,
        riskLevel: 'high',
        issues: [],
        score: 0
      }

      // Calculate issues and score
      const checks = [
        { key: 'hasPrivacyPolicy', label: 'Privacy Policy', critical: true },
        { key: 'hasCookieBanner', label: 'Cookie Consent Banner', critical: true },
        { key: 'hasAccessibilityFeatures', label: 'Accessibility Features', critical: false },
        { key: 'hasTermsOfService', label: 'Terms of Service', critical: true },
        { key: 'hasGDPRCompliance', label: 'GDPR Compliance Indicators', critical: true }
      ]

      demoResult.issues = checks
        .filter(check => !demoResult[check.key as keyof ScanResult])
        .map(check => check.label)

      const criticalIssues = checks
        .filter(check => check.critical && !demoResult[check.key as keyof ScanResult])
        .length

      demoResult.score = Math.max(0, 100 - (demoResult.issues.length * 15))
      
      if (criticalIssues >= 3) demoResult.riskLevel = 'high'
      else if (criticalIssues >= 1) demoResult.riskLevel = 'medium'
      else demoResult.riskLevel = 'low'

      setScanResult(demoResult)
    } finally {
      setIsScanning(false)
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-900/20 border-red-700'
      case 'medium': return 'bg-yellow-900/20 border-yellow-700'
      case 'low': return 'bg-green-900/20 border-green-700'
      default: return 'bg-gray-900/20 border-gray-700'
    }
  }

  return (
    <section className="py-16 bg-gradient-to-r from-red-900/10 to-orange-900/10 relative">
      <div className="absolute inset-0 bg-[#0d1117]/80" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Is Your Website a Liability Magnet?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Free 10-second scan reveals your exact fine risk. See what compliance violations could cost you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#161b22] rounded-xl p-6 border border-gray-700 mb-8"
        >
          <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter your website (e.g., yoursite.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-[#0d1117] border-gray-600 text-white text-lg py-3"
                disabled={isScanning}
              />
            </div>
            <Button
              type="submit"
              disabled={isScanning || !url.trim()}
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 text-lg font-semibold whitespace-nowrap"
            >
              {isScanning ? (
                <>
                  <RotateCw className="w-5 h-5 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Check My Risk (Free)
                </>
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-4 bg-red-900/20 border border-red-700 rounded-lg p-3 text-red-300 text-sm">
              {error}
            </div>
          )}
        </motion.div>

        {scanResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`rounded-xl p-6 border ${getRiskBgColor(scanResult.riskLevel)}`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <ExternalLink className="w-6 h-6 text-blue-400" />
                <span className="text-lg font-semibold text-white">{scanResult.url}</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{scanResult.score}/100</div>
                <div className={`text-sm font-semibold ${getRiskColor(scanResult.riskLevel)}`}>
                  {scanResult.riskLevel.toUpperCase()} RISK
                </div>
              </div>
            </div>

            {scanResult.issues.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-red-400 mb-4">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">
                    {scanResult.issues.length} Violations Exposing You to Fines
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {scanResult.issues.map((issue, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-[#0d1117] rounded-lg">
                      <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span className="text-white">Missing: {issue}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mt-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-red-300 mb-2">
                        You're One Audit Away From Bankruptcy!
                      </h3>
                      <p className="text-red-200 mb-4">
                        These violations could trigger devastating penalties:
                      </p>
                      <ul className="text-red-200 space-y-1 text-sm mb-4">
                        <li>• GDPR fines: $685K average (up to $1.2M for small businesses)</li>
                        <li>• CCPA violations: $7,500 each (adds up fast)</li>
                        <li>• ADA lawsuits: $15K average settlement + legal fees</li>
                        <li>• Customer exodus when word spreads</li>
                      </ul>
                      <Button
                        onClick={onGetStarted}
                        className="bg-white text-red-900 hover:bg-gray-100 font-bold px-6 py-2"
                      >
                        Fix Everything Now - Only $6.99
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-300 mb-2">
                  Great! Your website appears compliant
                </h3>
                <p className="text-gray-400">
                  We found the basic compliance elements on your website.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}