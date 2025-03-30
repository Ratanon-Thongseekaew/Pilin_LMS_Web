import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import useAuthStore from "../../../../store/auth-store";
import { checkOut } from "../../../../api/order";
import { useParams } from "react-router";

const stripePromise = loadStripe(
  "pk_test_51R3rIn2MGjRxxELS3FitZjf74sc9E2jrQ6cx43gXpROi1QWEZKhVZhZAwEiYPmWCvQxP8ENLyU1dX80BtwAOIBfr00CKCGuHfP"
);

function CheckoutwithStripe() {
  const token = useAuthStore((state) => state.token);
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch the client secret only once on component mount
  useEffect(() => {
    let isMounted = true;
    
    const getClientSecret = async () => {
      try {
        setLoading(true);
        console.log("Fetching checkout for order ID:", id);
        
        const res = await checkOut(token, id);
        console.log("Checkout response received");
        
        // Only update state if the component is still mounted
        if (isMounted && res.data && res.data.clientSecret) {
          console.log("Setting client secret");
          setClientSecret(res.data.clientSecret);
          setLoading(false);
        } else if (isMounted) {
          console.error("No client secret in response");
          setError("Failed to initialize checkout");
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error getting client secret:", error);
          setError(error.message || "Error preparing checkout");
          setLoading(false);
        }
      }
    };
    
    if (id && token) {
      getClientSecret();
    } else {
      setLoading(false);
      setError("Missing order information");
    }
    
    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
    };
  }, [id, token]);
  
  if (loading) {
    return <div className="p-4 text-center">Preparing your checkout...</div>;
  }
  
  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }
  
  if (!clientSecret) {
    return <div className="p-4 text-center">Could not initialize checkout</div>;
  }
  return (  
    <div id="checkout" >
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{ clientSecret }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  </div>
  );
}

export default CheckoutwithStripe;
