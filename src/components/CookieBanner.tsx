import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Cookie, Settings, Check, X as XIcon } from "lucide-react"
import { Button } from "./ui/button"

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false
  })

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookie-consent')
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      preferences: prefs,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }))
    setIsVisible(false)
    setShowPreferences(false)
  }

  const acceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      marketing: true,
      functional: true
    })
  }

  const rejectAll = () => {
    savePreferences({
      essential: true,
      analytics: false,
      marketing: false,
      functional: false
    })
  }

  const saveCustomPreferences = () => {
    savePreferences(preferences)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#161b22] border-t border-gray-700 shadow-2xl"
      >
        {!showPreferences ? (
          <div className="max-w-6xl mx-auto p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-3 flex-1">
                <Cookie className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    We Value Your Privacy
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    We use essential cookies for functionality and optional cookies for analytics and improving your experience. 
                    You can customize your preferences or accept/reject all non-essential cookies.
                  </p>
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="text-blue-400 hover:text-blue-300 text-sm underline mt-2"
                  >
                    Customize Settings
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                  onClick={rejectAll}
                  variant="ghost"
                  className="text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500"
                >
                  Reject All
                </Button>
                <Button
                  onClick={acceptAll}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Essential Cookies */}
              <div className="border border-gray-700 rounded-lg p-4 bg-[#0d1117]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">Essential Cookies</h4>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">Always On</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  Required for the website to function. These cookies ensure basic functionality and security features.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-gray-700 rounded-lg p-4 bg-[#0d1117]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">Analytics Cookies</h4>
                  <button
                    onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.analytics ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-400">
                  Help us understand how visitors interact with our website by collecting anonymous usage data.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-gray-700 rounded-lg p-4 bg-[#0d1117]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">Marketing Cookies</h4>
                  <button
                    onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.marketing ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-400">
                  Used to track visitors across websites for targeted advertising and personalized content.
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="border border-gray-700 rounded-lg p-4 bg-[#0d1117]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">Functional Cookies</h4>
                  <button
                    onClick={() => setPreferences(prev => ({ ...prev, functional: !prev.functional }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.functional ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.functional ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-400">
                  Enable enhanced functionality like live chat, remembering preferences, and social media features.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={rejectAll}
                variant="ghost"
                className="text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500"
              >
                <XIcon className="w-4 h-4 mr-2" />
                Reject All
              </Button>
              <Button
                onClick={saveCustomPreferences}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Check className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
              <Button
                onClick={acceptAll}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Accept All
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}