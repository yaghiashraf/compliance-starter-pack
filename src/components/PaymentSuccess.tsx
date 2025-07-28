import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Download, ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"

interface PaymentSuccessProps {
  onGenerateFiles: () => void
  onBackToForm: () => void
}

export function PaymentSuccess({ onGenerateFiles, onBackToForm }: PaymentSuccessProps) {
  const [customerData, setCustomerData] = useState<any>(null)

  useEffect(() => {
    // Check if user is returning from Stripe payment
    const urlParams = new URLSearchParams(window.location.search)
    const sessionId = urlParams.get('session_id')
    
    if (sessionId) {
      // User returned from successful Stripe payment
      console.log("Payment successful, session ID:", sessionId)
      
      // Retrieve stored form data
      const formData = localStorage.getItem('compliance_form_data')
      const email = localStorage.getItem('compliance_customer_email')
      
      if (formData) {
        setCustomerData({
          ...JSON.parse(formData),
          email,
          sessionId
        })
        
        // Automatically start file generation
        setTimeout(() => {
          onGenerateFiles()
        }, 2000)
      }
    }
  }, [onGenerateFiles])

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-[#161b22] border border-gray-700 rounded-xl p-8 shadow-2xl text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4 text-green-400">Payment Successful!</h1>
          
          <p className="text-gray-300 mb-6">
            Thank you for your purchase! We're now generating your complete compliance package.
          </p>

          {customerData && (
            <div className="bg-[#0d1117] rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2 text-center">Order Details</h3>
              <div className="text-sm text-gray-400 space-y-1">
                <div>Business: {customerData.businessName}</div>
                <div>Email: {customerData.email}</div>
                <div>Session: {customerData.sessionId?.substring(0, 20)}...</div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Button
              onClick={onGenerateFiles}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
            >
              <Download className="w-5 h-5 mr-2" />
              Generate My Files
            </Button>

            <Button
              variant="ghost"
              onClick={onBackToForm}
              className="w-full text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Form
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Files will be ready for download in just a few seconds
          </p>
        </motion.div>
      </div>
    </div>
  )
}