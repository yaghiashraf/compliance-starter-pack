import { useEffect } from "react"
import { Button } from "./ui/button"

interface StripeButtonFallbackProps {
  onBack: () => void
}

export function StripeButtonFallback({ onBack }: StripeButtonFallbackProps) {
  useEffect(() => {
    // Load the Stripe script if not already loaded
    if (!document.querySelector('script[src*="buy-button.js"]')) {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://js.stripe.com/v3/buy-button.js'
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <Button 
          onClick={onBack}
          className="mb-8 text-gray-400 hover:text-white"
        >
          ← Back to Form
        </Button>
        
        <div className="bg-[#161b22] border border-gray-700 rounded-xl p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Purchase</h1>
          
          <div className="text-center mb-6">
            <p className="text-gray-300 mb-4">
              Click the button below to securely complete your payment with Stripe.
            </p>
            
            {/* Fallback with direct script injection */}
            <div 
              dangerouslySetInnerHTML={{
                __html: `
                  <script async src="https://js.stripe.com/v3/buy-button.js"></script>
                  <stripe-buy-button
                    buy-button-id="buy_btn_1RpsBBA3gGBV3QMFA7zrc9VH"
                    publishable-key="pk_live_51RY8WGA3gGBV3QMFoEn6vPBuicxVlV88vh9eLrKhnD56CAcMfVJfZmn46ba1XXJUcDUeJhJvRpQQ6oSPOG8zsKmB002qhoBlCI">
                  </stripe-buy-button>
                `
              }}
            />
          </div>
          
          <div className="text-center text-xs text-gray-500">
            <p>Secure payment powered by Stripe</p>
            <p>All major cards accepted • 256-bit SSL encryption</p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Having trouble? Try refreshing the page or contact support.
          </p>
        </div>
      </div>
    </div>
  )
}