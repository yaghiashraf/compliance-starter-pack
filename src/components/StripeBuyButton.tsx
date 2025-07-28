import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CreditCard, Lock, ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { FormState } from "../App"
import { StripeButtonFallback } from "./StripeButtonFallback"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'buy-button-id': string
        'publishable-key': string
      }, HTMLElement>
    }
  }
}

interface StripeBuyButtonProps {
  formState: FormState
  onCancel: () => void
  onPaymentSuccess: () => void
}


export function StripeBuyButton({ formState, onCancel, onPaymentSuccess }: StripeBuyButtonProps) {
  const [email, setEmail] = useState(formState.email || "")
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState("")
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    // Store form data for post-payment processing
    const dataToStore = { ...formState, email }
    console.log("StripeBuyButton - storing data:", dataToStore)
    
    localStorage.setItem('compliance_form_data', JSON.stringify(dataToStore))
    localStorage.setItem('compliance_customer_email', email)

    // Listen for successful payment events
    const handlePaymentSuccess = (event: any) => {
      console.log("Stripe payment success event:", event)
      onPaymentSuccess()
    }

    // Check if buy button script is loaded
    let attempts = 0
    const maxAttempts = 50 // 5 seconds max
    
    const checkStripeReady = () => {
      attempts++
      console.log(`Checking Stripe Buy Button readiness (attempt ${attempts})`)
      
      if (window.customElements && window.customElements.get('stripe-buy-button')) {
        setIsReady(true)
        console.log("Stripe Buy Button is ready!")
      } else if (attempts < maxAttempts) {
        setTimeout(checkStripeReady, 100)
      } else {
        console.error("Stripe Buy Button failed to load after 5 seconds")
        setError("Payment system failed to load. Trying fallback method...")
        setTimeout(() => setUseFallback(true), 2000)
      }
    }

    // Check if the script is already loaded
    if (document.querySelector('script[src*="buy-button.js"]')) {
      checkStripeReady()
    } else {
      console.error("Stripe Buy Button script not found in page")
      setError("Payment script not loaded. Trying fallback method...")
      setTimeout(() => setUseFallback(true), 2000)
    }

    // Listen for payment events (if available)
    window.addEventListener('stripe-buy-button-success', handlePaymentSuccess)
    
    return () => {
      window.removeEventListener('stripe-buy-button-success', handlePaymentSuccess)
    }
  }, [formState, email, onPaymentSuccess])

  // Update localStorage when email changes
  useEffect(() => {
    if (email) {
      localStorage.setItem('compliance_customer_email', email)
      const formData = localStorage.getItem('compliance_form_data')
      if (formData) {
        const parsed = JSON.parse(formData)
        localStorage.setItem('compliance_form_data', JSON.stringify({ ...parsed, email }))
      }
    }
  }, [email])

  // Show fallback component if needed
  if (useFallback) {
    return <StripeButtonFallback onBack={onCancel} />
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="text-gray-400 hover:text-white mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#161b22] border border-gray-700 rounded-xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Secure Payment - Final Step</h1>
            <p className="text-gray-400">30 seconds to complete compliance protection</p>
            <div className="mt-3 flex items-center justify-center space-x-4 text-xs text-gray-500">
              <span>1,200+ businesses protected</span>
              <span>•</span>
              <span>Instant download</span>
              <span>•</span>
              <span>Secure checkout</span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-[#0d1117] rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4">You're Getting Complete Protection</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Complete Compliance Kit</span>
              <span className="font-semibold">$6.99</span>
            </div>
            <div className="text-sm text-gray-400 mb-3">
              ✅ Privacy Policy + Terms of Service<br/>
              ✅ GDPR/CCPA Cookie Banner<br/>
              ✅ ADA Accessibility Widget<br/>
              ✅ Installation Guide
            </div>
            <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
              <span>For: {formState.businessName}</span>
              <span className="text-green-400">✨ Instant Download</span>
            </div>
            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total (vs $3,500 lawyer fees)</span>
                <span className="text-green-400">$6.99 USD</span>
              </div>
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">Receipt & download link sent to this email</p>
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-center space-x-2 text-sm text-gray-400 bg-[#0d1117] p-3 rounded-lg mb-6">
            <Lock className="w-4 h-4 text-green-400" />
            <span>Secured by Stripe • All major cards accepted • No stored data</span>
          </div>

          {/* Stripe Buy Button */}
          <div className="text-center">
            {error ? (
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-300 text-sm mb-4">
                <p className="font-semibold mb-2">Payment System Error</p>
                <p>{error}</p>
                <div className="flex space-x-2 mt-3">
                  <Button 
                    onClick={() => window.location.reload()}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm"
                  >
                    Refresh Page
                  </Button>
                  <Button 
                    onClick={() => setUseFallback(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm"
                  >
                    Try Fallback
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="stripe-buy-button-container" style={{ minHeight: '50px' }}>
                  <stripe-buy-button
                    buy-button-id="buy_btn_1RpsBBA3gGBV3QMFA7zrc9VH"
                    publishable-key="pk_live_51RY8WGA3gGBV3QMFoEn6vPBuicxVlV88vh9eLrKhnD56CAcMfVJfZmn46ba1XXJUcDUeJhJvRpQQ6oSPOG8zsKmB002qhoBlCI"
                  />
                </div>
                
                {!isReady && (
                  <div className="flex items-center justify-center space-x-2 text-gray-400 mt-4">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Loading secure payment...</span>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              Secure payment powered by Stripe<br/>
              <span className="text-green-400">3-day risk-free guarantee</span> • <span className="text-blue-400">Instant download</span> • <span className="text-purple-400">Zero recurring fees</span>
            </p>
          </div>
        </motion.div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Secured by Stripe • All major cards accepted • Instant download • Used by 1,200+ businesses
          </p>
        </div>
      </div>
    </div>
  )
}