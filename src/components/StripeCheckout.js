import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm";

// Replace with your actual Stripe public key
const stripePromise = loadStripe(
  "pk_test_51Qwhvq052eypM0VDeBtNvoLyWJedvwZg08sGivHwCBliD6nEgO5K3VTJMNFwNDStfEqpJyGA4xEyDLfZH1FJC8NF00Su7w4EbK"
);

function StripeCheckout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm items={[]} totalAmount={10} />
    </Elements>
  );
}

export default StripeCheckout;
