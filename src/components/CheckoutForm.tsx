import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Lock, ArrowLeft, Shield } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { FormState } from "../App"

interface CheckoutFormProps {
  formState: FormState
  onPaymentSuccess: () => void
  onCancel: () => void
}

export function CheckoutForm({ formState, onPaymentSuccess, onCancel }: CheckoutFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // For demo purposes, always succeed
    onPaymentSuccess()
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="text-gray-400 hover:text-white mr-4"
            disabled={isProcessing}
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
            <h1 className="text-2xl font-bold mb-2">Secure Checkout</h1>
            <p className="text-gray-400">Complete your purchase to get instant access</p>
          </div>

          {/* Order Summary */}
          <div className="bg-[#0d1117] rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Compliance Starter Pack</span>
              <span className="font-semibold">$6.99</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
              <span>For: {formState.businessName}</span>
              <span>One-time payment</span>
            </div>
            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span className="text-green-400">$6.99 USD</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isProcessing}
              />
              <p className="text-xs text-gray-500">Receipt will be sent to this email</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  required
                  disabled={isProcessing}
                />
                <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  required
                  disabled={isProcessing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, '').slice(0, 3))}
                  maxLength={3}
                  required
                  disabled={isProcessing}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-400 bg-[#0d1117] p-3 rounded-lg">
              <Lock className="w-4 h-4 text-green-400" />
              <span>Your payment information is encrypted and secure</span>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Payment...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Complete Purchase - $6.99</span>
                </div>
              )}
            </Button>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                30-day money-back guarantee included.
              </p>
            </div>
          </form>
        </motion.div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Secured by industry-standard encryption • 💳 All major cards accepted
          </p>
        </div>
      </div>
    </div>
  )
}