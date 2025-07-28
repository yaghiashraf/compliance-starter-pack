import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "")

const SimpleCardForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [status, setStatus] = useState("Loading...")

  useEffect(() => {
    console.log("SimpleCardForm - Stripe loaded:", !!stripe)
    console.log("SimpleCardForm - Elements loaded:", !!elements)
    
    if (stripe && elements) {
      setStatus("Ready to accept payments")
    } else {
      setStatus("Still loading Stripe...")
    }
  }, [stripe, elements])

  const simpleCardOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#000000',
        '::placeholder': {
          color: '#666666',
        },
      },
    },
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', backgroundColor: 'white', color: 'black' }}>
      <h2>Simple Stripe Test</h2>
      <p>Status: {status}</p>
      
      <div style={{ 
        border: '1px solid #ccc', 
        padding: '15px', 
        borderRadius: '4px', 
        marginTop: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        {stripe && elements ? (
          <CardElement 
            options={simpleCardOptions}
            onReady={() => {
              console.log("SimpleCardForm - CardElement ready!")
              setStatus("Card element is ready - try typing!")
            }}
            onChange={(event) => {
              console.log("SimpleCardForm - Card change:", event)
              if (event.error) {
                setStatus(`Error: ${event.error.message}`)
              } else if (event.complete) {
                setStatus("Card details complete!")
              } else if (event.empty) {
                setStatus("Card element is ready - try typing!")
              } else {
                setStatus("Card details incomplete")
              }
            }}
            onFocus={() => console.log("SimpleCardForm - Card focused")}
            onBlur={() => console.log("SimpleCardForm - Card blurred")}
          />
        ) : (
          <div>Loading Stripe Elements...</div>
        )}
      </div>
      
      <p style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>
        Test with: 4242 4242 4242 4242, any future date, any CVC
      </p>
    </div>
  )
}

export function SimpleStripeTest() {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm />
    </Elements>
  )
}