import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CreditCard, Lock, ArrowLeft, Shield } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { FormState } from "../App"

const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null

interface CheckoutFormProps {
  formState: FormState
  onPaymentSuccess: () => void
  onCancel: () => void
}

const CheckoutFormContent = ({ formState, onPaymentSuccess, onCancel }: CheckoutFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [email, setEmail] = useState(formState.email || "")
  const [clientSecret, setClientSecret] = useState("")
  const [error, setError] = useState("")

  // Create payment intent when component mounts
  useEffect(() => {
    // Check if Stripe is properly configured
    if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
      setError("Payment system is not configured. Missing Stripe publishable key.")
      return
    }

    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/.netlify/functions/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email || formState.email,
            businessName: formState.businessName,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to create payment intent")
        }

        const result = await response.json()
        if (result.clientSecret) {
          setClientSecret(result.clientSecret)
        } else {
          throw new Error(result.message || "No client secret returned")
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error"
        if (errorMessage.includes("configuration") || errorMessage.includes("configured")) {
          setError("Payment system is not properly configured. Please contact support.")
        } else {
          setError("Failed to initialize payment. Please try again.")
        }
        console.error("Payment intent creation failed:", err)
      }
    }

    createPaymentIntent()
  }, [formState.businessName, formState.email, email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      setError("Payment system not ready. Please wait a moment and try again.")
      return
    }

    setIsProcessing(true)
    setError("")

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      setError("Card information not found. Please refresh and try again.")
      setIsProcessing(false)
      return
    }

    try {
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: email,
            name: formState.businessName,
          },
        },
      })

      if (paymentError) {
        setError(paymentError.message || "Payment failed. Please try again.")
        setIsProcessing(false)
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment successful!
        onPaymentSuccess()
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      setIsProcessing(false)
      console.error("Payment confirmation failed:", err)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#ffffff",
        backgroundColor: "#0d1117",
        fontFamily: "system-ui, sans-serif",
        fontWeight: "400",
        lineHeight: "24px",
        "::placeholder": {
          color: "#6b7280",
        },
        ":focus": {
          color: "#ffffff",
        },
        ":hover": {
          color: "#ffffff",
        },
        ":-webkit-autofill": {
          color: "#ffffff",
        },
        iconColor: "#6b7280",
      },
      complete: {
        color: "#ffffff",
        iconColor: "#10b981",
      },
      empty: {
        color: "#ffffff",
        iconColor: "#6b7280",
      },
      invalid: {
        color: "#ef4444",
        iconColor: "#ef4444",
      },
    },
    hidePostalCode: true,
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
              <p className="text-xs text-gray-500">Receipt & download link sent to this email</p>
            </div>

            <div className="space-y-2">
              <Label>Card Details</Label>
              <div className="bg-[#0d1117] border border-gray-600 rounded-lg p-4">
                <CardElement options={cardElementOptions} />
              </div>
              <p className="text-xs text-gray-500">Enter your card number, expiry date, and CVC</p>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center space-x-2 text-sm text-gray-400 bg-[#0d1117] p-3 rounded-lg">
              <Lock className="w-4 h-4 text-green-400" />
              <span>🔒 Bank-level encryption • Powered by Stripe • No data stored</span>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
              disabled={isProcessing || !stripe || !clientSecret}
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Payment...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Complete Protection - $6.99</span>
                </div>
              )}
            </Button>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                By completing your purchase, you agree to our Terms of Service and Privacy Policy.<br/>
                <span className="text-green-400">3-day risk-free guarantee</span> • <span className="text-blue-400">Instant download</span> • <span className="text-purple-400">Zero recurring fees</span>
              </p>
            </div>
          </form>
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

export function CheckoutForm(props: CheckoutFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormContent {...props} />
    </Elements>
  )
}