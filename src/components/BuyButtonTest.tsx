import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export function BuyButtonTest() {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [customElementReady, setCustomElementReady] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if script is loaded
    const scriptElement = document.querySelector('script[src*="buy-button.js"]')
    setScriptLoaded(!!scriptElement)
    
    // Check if custom element is defined
    let attempts = 0
    const checkCustomElement = () => {
      attempts++
      if (window.customElements && window.customElements.get('stripe-buy-button')) {
        setCustomElementReady(true)
        console.log("✅ Stripe Buy Button custom element is ready")
      } else if (attempts < 50) {
        setTimeout(checkCustomElement, 100)
      } else {
        setError("❌ Stripe Buy Button custom element failed to load after 5 seconds")
        console.error("Stripe Buy Button custom element not available")
      }
    }
    
    if (scriptElement) {
      checkCustomElement()
    } else {
      setError("❌ Stripe Buy Button script not found in page")
    }
  }, [])

  const handleTestBuyButton = () => {
    // Test a simple buy button with a known working ID
    const testContainer = document.getElementById('test-buy-button-container')
    if (testContainer && window.customElements.get('stripe-buy-button')) {
      testContainer.innerHTML = `
        <stripe-buy-button
          buy-button-id="buy_btn_1RpsBBA3gGBV3QMFA7zrc9VH"
          publishable-key="pk_live_51RY8WGA3gGBV3QMFoEn6vPBuicxVlV88vh9eLrKhnD56CAcMfVJfZmn46ba1XXJUcDUeJhJvRpQQ6oSPOG8zsKmB002qhoBlCI">
        </stripe-buy-button>
      `
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Stripe Buy Button Debug Test</h1>
        
        <div className="space-y-6">
          {/* Status Checks */}
          <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">System Status</h2>
            <div className="space-y-2 font-mono text-sm">
              <div className={scriptLoaded ? "text-green-400" : "text-red-400"}>
                {scriptLoaded ? "✅" : "❌"} Script Loaded: {scriptLoaded ? "YES" : "NO"}
              </div>
              <div className={customElementReady ? "text-green-400" : "text-red-400"}>
                {customElementReady ? "✅" : "❌"} Custom Element Ready: {customElementReady ? "YES" : "NO"}
              </div>
              {error && (
                <div className="text-red-400">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Current URL and Environment */}
          <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Environment Info</h2>
            <div className="space-y-2 font-mono text-sm text-gray-300">
              <div>URL: {window.location.href}</div>
              <div>Protocol: {window.location.protocol}</div>
              <div>Host: {window.location.host}</div>
              <div>User Agent: {navigator.userAgent.slice(0, 100)}...</div>
            </div>
          </div>

          {/* Manual Test Button */}
          <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Manual Test</h2>
            <Button onClick={handleTestBuyButton} className="mb-4">
              Load Test Buy Button
            </Button>
            <div 
              id="test-buy-button-container" 
              className="min-h-[100px] border border-gray-600 rounded p-4 bg-[#0d1117]"
            >
              <p className="text-gray-400 text-center">Test buy button will appear here</p>
            </div>
          </div>

          {/* Original Buy Button Test */}
          <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Original Buy Button</h2>
            <div className="min-h-[100px] border border-gray-600 rounded p-4 bg-[#0d1117]">
              {customElementReady ? (
                <stripe-buy-button
                  buy-button-id="buy_btn_1RpsBBA3gGBV3QMFA7zrc9VH"
                  publishable-key="pk_live_51RY8WGA3gGBV3QMFoEn6vPBuicxVlV88vh9eLrKhnD56CAcMfVJfZmn46ba1XXJUcDUeJhJvRpQQ6oSPOG8zsKmB002qhoBlCI">
                </stripe-buy-button>
              ) : (
                <div className="text-center text-gray-400">
                  {error ? "❌ Buy Button Failed to Load" : "⏳ Loading Buy Button..."}
                </div>
              )}
            </div>
          </div>

          {/* Console Logs */}
          <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <div className="text-sm text-gray-300 space-y-2">
              <p>1. Open browser dev tools (F12)</p>
              <p>2. Check the Console tab for any errors</p>
              <p>3. Look for network requests to js.stripe.com</p>
              <p>4. Check if the buy button renders properly above</p>
              <p>5. If you see a "sad page" icon, it usually means:</p>
              <ul className="ml-4 mt-2 space-y-1">
                <li>• Invalid buy-button-id</li>
                <li>• Invalid publishable-key</li>
                <li>• Network/CORS issues</li>
                <li>• Script loading problems</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}