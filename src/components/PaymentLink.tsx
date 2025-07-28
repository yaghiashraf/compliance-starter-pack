import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Lock, ArrowLeft, Shield, ExternalLink } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { FormState } from "../App"

interface PaymentLinkProps {
  formState: FormState
  onCancel: () => void
}

export function PaymentLink({ formState, onCancel }: PaymentLinkProps) {
  const [email, setEmail] = useState(formState.email || "")
  const [isRedirecting, setIsRedirecting] = useState(false)

  // Your Stripe Payment Link
  const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/aFa8wOb6r3d54TQ2Ljg3600"

  const handlePayment = () => {
    setIsRedirecting(true)
    
    // Add customer info to the payment link via URL parameters
    const paymentUrl = new URL(STRIPE_PAYMENT_LINK)
    
    // Add prefill parameters if supported by your Stripe setup
    if (email) {
      paymentUrl.searchParams.set('prefilled_email', email)
    }
    
    // Store form data in localStorage so we can restore it after payment
    localStorage.setItem('compliance_form_data', JSON.stringify(formState))
    localStorage.setItem('compliance_customer_email', email)
    
    // Redirect to Stripe Payment Link
    window.location.href = paymentUrl.toString()
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="text-gray-400 hover:text-white mr-4"
            disabled={isRedirecting}
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
              <span>🛡️ 1,200+ businesses protected</span>
              <span>•</span>
              <span>⚡ Instant download</span>
              <span>•</span>
              <span>🔒 Secure checkout</span>
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
                disabled={isRedirecting}
              />
              <p className="text-xs text-gray-500">Receipt & download link sent to this email</p>
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-center space-x-2 text-sm text-gray-400 bg-[#0d1117] p-3 rounded-lg mb-6">
            <Lock className="w-4 h-4 text-green-400" />
            <span>🔒 Secured by Stripe • All major cards accepted • No stored data</span>
          </div>

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
            disabled={isRedirecting || !email.trim()}
          >
            {isRedirecting ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Redirecting to Stripe...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Continue to Secure Payment</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            )}
          </Button>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              You'll be redirected to Stripe's secure payment page<br/>
              <span className="text-green-400">3-day risk-free guarantee</span> • <span className="text-blue-400">Instant download</span> • <span className="text-purple-400">Zero recurring fees</span>
            </p>
          </div>
        </motion.div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Secured by Stripe • 💳 All major cards accepted • ⚡ Instant download • 🛡️ Used by 1,200+ businesses
          </p>
        </div>
      </div>
    </div>
  )
}