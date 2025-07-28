import { useState, useEffect } from "react";
import { ComplianceForm } from "./components/Form";
import { SuccessModal } from "./components/SuccessModal";
import { LandingPage } from "./components/LandingPage";
import { StripePaymentLink } from "./components/StripePaymentLink";
import { PaymentSuccess } from "./components/PaymentSuccess";
import { CookieBanner } from "./components/CookieBanner";
import { SimpleStripeTest } from "./components/SimpleStripeTest";
import { PaymentDebug } from "./components/PaymentDebug";
import { BuyButtonTest } from "./components/BuyButtonTest";
import { genZip } from "./utils/genZip";
import { Progress } from "./components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "./components/ui/button";

export type FormState = {
  businessName: string;
  websiteUrl: string;
  jurisdiction: string;
  email: string;
  industry: string;
};

type AppState = "landing" | "form" | "payment" | "payment_success" | "generating" | "success";

function App() {
  const [formState, setFormState] = useState<FormState>({
    businessName: "",
    websiteUrl: "",
    jurisdiction: "USA",
    email: "",
    industry: "",
  });
  const [appState, setAppState] = useState<AppState>("landing");
  const [progress, setProgress] = useState(0);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);

  // Debug mode check
  const isDebugMode = window.location.search.includes('debug=stripe') || window.location.pathname.includes('/debug');

  // Check for payment success on app load and listen for Stripe events
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const sessionId = urlParams.get('session_id')
    const success = urlParams.get('success')
    const paymentIntent = urlParams.get('payment_intent')
    
    console.log("Payment return check:", {
      sessionId,
      success,
      paymentIntent,
      allParams: Object.fromEntries(urlParams.entries()),
      currentUrl: window.location.href
    })
    
    // Function to handle successful payment
    const handlePaymentComplete = () => {
      console.log("Payment success detected!")
      
      const formData = localStorage.getItem('compliance_form_data')
      const email = localStorage.getItem('compliance_customer_email')
      
      console.log("Stored form data:", formData ? "Found" : "Missing")
      console.log("Stored email:", email)
      
      if (formData) {
        const parsedFormData = JSON.parse(formData)
        setFormState({ ...parsedFormData, email: email || parsedFormData.email })
        setAppState("generating")  // Go directly to generating files
        
        // Clean up URL without reloading page
        window.history.replaceState({}, document.title, window.location.pathname)
      } else {
        console.error("No form data found in localStorage")
        setAppState("form")
      }
    }
    
    // Check for URL-based success (redirect from Stripe)
    if (sessionId || success === 'true' || paymentIntent) {
      handlePaymentComplete()
    }

    // Listen for Stripe Buy Button success events
    const handleStripeBuyButtonSuccess = (event: any) => {
      console.log("Stripe Buy Button success event:", event)
      handlePaymentComplete()
    }

    // Add event listener for buy button success
    window.addEventListener('stripe-buy-button-success' as any, handleStripeBuyButtonSuccess)
    
    return () => {
      window.removeEventListener('stripe-buy-button-success' as any, handleStripeBuyButtonSuccess)
    }
  }, [])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleGetStarted = () => {
    setAppState("form");
  };

  const handleBackToLanding = () => {
    setAppState("landing");
    setProgress(0);
    setZipBlob(null);
    setFormState({
      businessName: "",
      websiteUrl: "",
      jurisdiction: "USA",
      email: "",
      industry: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Normalize website URL before proceeding
    let normalizedUrl = formState.websiteUrl.trim();
    if (normalizedUrl && !normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`;
      setFormState(prev => ({ ...prev, websiteUrl: normalizedUrl }));
    }
    
    // Go to payment
    setAppState("payment");
  };

  const handlePaymentSuccess = async () => {
    setAppState("generating");
    setProgress(0);
    setZipBlob(null);

    const blob = await genZip(formState, setProgress);

    setZipBlob(blob);
    setAppState("success");
  };

  const handlePaymentCancel = () => {
    setAppState("form");
  };

  const handleReset = () => {
    setAppState("form");
    setProgress(0);
    setZipBlob(null);
  };

  // Debug mode - show debug tools
  if (isDebugMode) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Debug Mode</h1>
        <p>URL: {window.location.href}</p>
        
        {window.location.search.includes('payment') ? (
          <PaymentDebug />
        ) : window.location.search.includes('buybutton') ? (
          <BuyButtonTest />
        ) : (
          <SimpleStripeTest />
        )}
      </div>
    );
  }

  if (appState === "landing") {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <AnimatePresence mode="wait">
        {appState === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8"
          >
            <div className="w-full max-w-2xl mx-auto">
              <div className="flex items-center mb-8">
                <Button
                  variant="ghost"
                  onClick={handleBackToLanding}
                  className="text-gray-400 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </div>
              
              <div className="text-center mb-8">
                <div className="mb-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 mb-2">
                    <span>Step 1 of 2</span>
                    <span>•</span>
                    <span>Almost there!</span>
                  </div>
                  <div className="w-48 h-2 bg-gray-700 rounded-full mx-auto">
                    <div className="w-1/2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Protect Your Business in 2 Minutes
                </h1>
                <p className="mt-3 text-lg text-gray-400">
                  Enter your details below to generate instant compliance protection
                </p>
              </div>

              <ComplianceForm
                formState={formState}
                onFormChange={handleFormChange}
                onSubmit={handleSubmit}
              />
            </div>
          </motion.div>
        )}

        {appState === "payment" && (
          <StripePaymentLink
            formState={formState}
            onCancel={handlePaymentCancel}
          />
        )}

        {appState === "payment_success" && (
          <PaymentSuccess
            onGenerateFiles={handlePaymentSuccess}
            onBackToForm={() => setAppState("form")}
          />
        )}

        {appState === "generating" && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8"
          >
            <div className="w-full max-w-md mx-auto">
              <div className="bg-[#161b22] border border-gray-700 rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      ⚡
                    </motion.div>
                  </div>
                  <h2 className="text-2xl font-semibold">Generating Your Pack</h2>
                  <p className="text-gray-400 mt-2">
                    Creating your compliance bundle...
                  </p>
                </div>
                
                <Progress value={progress} className="w-full mb-4" />
                <p className="text-center text-sm text-green-400 font-mono">
                  {progress.toFixed(0)}% Complete
                </p>
                
                <div className="mt-6 text-xs text-gray-500 text-center">
                  <p>✨ Everything happens in your browser</p>
                  <p>🔒 No data sent to external servers</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SuccessModal
        isOpen={appState === "success"}
        onClose={handleReset}
        zipBlob={zipBlob}
        businessName={formState.businessName}
      />

      <CookieBanner />
    </div>
  );
}

export default App;
