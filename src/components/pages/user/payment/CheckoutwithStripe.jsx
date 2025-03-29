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
  
  console.log("Order ID from URL params:", id); // Debugging
  useEffect(() => {
    console.log("URL Params - Order ID:", id);
  }, [id]);
  const fetchClientSecret = async () => {
    try {
      // Make sure id is being passed here
      const res = await checkOut(token, id);
      console.log("check stripe res", res);
      return res.data?.clientSecret;
    } catch (error) {
      console.log(error);
      return null; // Return null on error to avoid undefined
    }
  };
  
  const options = { fetchClientSecret };
  
  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

export default CheckoutwithStripe;
