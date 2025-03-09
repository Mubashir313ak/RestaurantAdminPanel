// src/screens/order/OrderDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Stack,
  Button,
} from "@mui/material";
import { GetOrderById, GetOrderByIdApi } from "../../services/order"; // Assuming you have this function

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await GetOrderByIdApi(orderId); // Fetch order details from API
        setOrder(response);
        setLoading(false);
      } catch (err) {
        setError("Error fetching order details");
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Order Details
      </Typography>
      <Card sx={{ maxWidth: 800, margin: "auto" }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Order ID: {order._id}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Customer: {order.customerId.username}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Status: {order.status || "Not Selected"}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Total: ${order.total}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Date: {new Date(order.createdAt).toLocaleDateString()}
          </Typography>

          {/* Order Items */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Order Items:
          </Typography>
          <Stack spacing={1} sx={{ marginTop: 1 }}>
            {order.items.map((item, index) => (
              <Typography key={index} variant="body2">
                {item.name} x {item.quantity} - ${item.price}
              </Typography>
            ))}
          </Stack>

          <Button
            variant="contained"
            sx={{ marginTop: 3 }}
            onClick={() => window.history.back()}
          >
            Back to Orders
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderDetail;
