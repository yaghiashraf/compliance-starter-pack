import { Button } from "./ui/button"

export function PaymentSuccessTest() {
  const handleTestPaymentSuccess = () => {
    // Store test form data
    const testData = {
      businessName: "Test Business",
      websiteUrl: "https://test.com",
      jurisdiction: "USA",
      email: "test@example.com",
      industry: "Technology"
    }
    
    localStorage.setItem('compliance_form_data', JSON.stringify(testData))
    localStorage.setItem('compliance_customer_email', testData.email)
    
    // Simulate return from Stripe with payment success
    window.location.href = window.location.pathname + "?payment_success=true&session_id=cs_test_123456789"
  }

  const handleClearStorage = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Payment Success Test</h1>
        
        <div className="space-y-6">
          <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Test Payment Flow</h2>
            <p className="text-gray-300 mb-4">
              This will simulate a successful payment return from Stripe and test file generation.
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={handleTestPaymentSuccess}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Simulate Payment Success
              </Button>
              
              <Button 
                onClick={handleClearStorage}
                variant="outline"
                className="w-full"
              >
                Clear Storage & Reset
              </Button>
            </div>
          </div>

          <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Current Storage</h2>
            <div className="space-y-2 font-mono text-sm text-gray-300">
              <div>
                <strong>Form Data:</strong> {localStorage.getItem('compliance_form_data') ? "Present" : "Missing"}
              </div>
              <div>
                <strong>Email:</strong> {localStorage.getItem('compliance_customer_email') || "Missing"}
              </div>
              <div>
                <strong>URL:</strong> {window.location.href}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}