import { useState, useEffect } from "react"
import { Button } from "./ui/button"

export function PaymentDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({})

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const formData = localStorage.getItem('compliance_form_data')
    const email = localStorage.getItem('compliance_customer_email')
    
    setDebugInfo({
      currentUrl: window.location.href,
      urlParams: Object.fromEntries(urlParams.entries()),
      hasFormData: !!formData,
      formData: formData ? JSON.parse(formData) : null,
      storedEmail: email,
      localStorage: {
        length: localStorage.length,
        keys: Object.keys(localStorage)
      }
    })
  }, [])

  const handleClearStorage = () => {
    localStorage.clear()
    window.location.reload()
  }

  const handleTestFileGeneration = () => {
    // Simulate what should happen after payment
    const testData = {
      businessName: "Test Business",
      websiteUrl: "test.com",
      jurisdiction: "USA",
      email: "test@example.com",
      industry: "Technology"
    }
    
    localStorage.setItem('compliance_form_data', JSON.stringify(testData))
    localStorage.setItem('compliance_customer_email', testData.email)
    
    // Simulate return from Stripe
    window.location.href = window.location.pathname + "?session_id=cs_test_123456789"
  }

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', color: 'black', fontFamily: 'monospace' }}>
      <h1>Payment Flow Debug</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <Button onClick={handleClearStorage} style={{ marginRight: '10px' }}>
          Clear Storage
        </Button>
        <Button onClick={handleTestFileGeneration}>
          Test File Generation
        </Button>
      </div>

      <h2>Debug Information:</h2>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
        {JSON.stringify(debugInfo, null, 2)}
      </pre>

      <h2>Manual Tests:</h2>
      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', margin: '10px 0' }}>
        <h3>Step 1: Check if you returned from Stripe</h3>
        <p>Look for URL parameters like: session_id, payment_intent, or success=true</p>
        <p><strong>Current params:</strong> {JSON.stringify(debugInfo.urlParams)}</p>
      </div>

      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', margin: '10px 0' }}>
        <h3>Step 2: Check localStorage</h3>
        <p>Should have: compliance_form_data and compliance_customer_email</p>
        <p><strong>Has form data:</strong> {debugInfo.hasFormData ? "YES" : "NO"}</p>
        <p><strong>Has email:</strong> {debugInfo.storedEmail ? "YES" : "NO"}</p>
      </div>

      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', margin: '10px 0' }}>
        <h3>Step 3: Expected Flow</h3>
        <ol>
          <li>Fill form → stores data in localStorage</li>
          <li>Click payment → redirects to Stripe</li>
          <li>Complete payment → Stripe redirects back with session_id</li>
          <li>App detects session_id → shows success page</li>
          <li>Success page finds localStorage → generates files</li>
        </ol>
      </div>
    </div>
  )
}