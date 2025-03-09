import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ items, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (paymentMethod === "card") {
      const { data } = await axios.post(
        "http://localhost:5000/api/order/create-payment-intent",
        {
          amount: totalAmount * 100, // in cents
        }
      );

      const { clientSecret } = data;

      // Confirm card payment
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
      } else if (paymentIntent.status === "succeeded") {
        // Send paymentIntentId with order details
        await placeOrder("card", paymentIntent.id);
      }
    } else {
      // Handle Cash on Delivery
      await placeOrder("cash");
    }
  };

  // Function to place the order with backend
  const placeOrder = async (paymentMethod, paymentIntentId = "") => {
    try {
      // Get address details (collecting these from user input or static for now)
      const address = {
        street: "123 Main St",
        city: "City Name",
        state: "State Name",
        postalCode: "12345",
        country: "Country Name",
      };
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzAzNGM5NDBkZjIwNWU0MjQ4MzlkZiIsImlhdCI6MTc0MDc2NjA0MiwiZXhwIjoxNzQzMzU4MDQyfQ.GcLL8bGld04tR_rmupX903S96yDL-sKTcjHgbibjims";
      const items = [
        {
          meal: "67c04e2b7c319d401808be86",
          quantity: 5,
        },
        {
          meal: "67c04e2b7c319d401808be88",
          quantity: 10,
        },
      ];

      const response = await axios.post(
        "http://localhost:5000/api/order/place-order",
        {
          items, // items array already defined
          address, // structured address object
          paymentMethod, // either 'card' or 'cash'
          cardPaymentDetails:
            paymentMethod === "card" ? { paymentIntentId } : null, // Only include cardPaymentDetails for card payments
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adding the Bearer token in the headers
          },
        }
      );

      console.log("Order placed successfully", response.data);
      alert("Order placed successfully!");
    } catch (err) {
      setError("Error placing order");
      setLoading(false);
      console.error("Error placing order:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <div>
        <input
          type="radio"
          name="paymentMethod"
          value="card"
          checked={paymentMethod === "card"}
          onChange={() => setPaymentMethod("card")}
        />
        <label>Pay by Card</label>
        <input
          type="radio"
          name="paymentMethod"
          value="cash"
          checked={paymentMethod === "cash"}
          onChange={() => setPaymentMethod("cash")}
        />
        <label>Cash on Delivery</label>
      </div>

      {paymentMethod === "card" && (
        <div>
          <CardElement />
        </div>
      )}

      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Place Order"}
      </button>

      {error && <div>{error}</div>}
    </form>
  );
};

export default CheckoutForm;
