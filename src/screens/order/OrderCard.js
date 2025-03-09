import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Pagination,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Box,
  Stack,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import { GetOrderApi } from "../../services/order";
import { ChangeOrderStatus } from "../../services/order"; // Import the ChangeOrderStatus function
import { useNavigate } from "react-router-dom";

const OrderCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, page, totalPages, loading, error, limit } = useSelector(
    (state) => state.order
  );
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // success or error

  const handleStatusSelect = async (status) => {
    setSelectedStatus(status);

    if (currentOrderId) {
      const body = { orderId: currentOrderId, status };
      try {
        await ChangeOrderStatus(body); // Call the API
        setSnackbarMessage("Status updated successfully");
        setSnackbarSeverity("success");
        setOpenSnackbar(true); // Show success Snackbar
      } catch (error) {
        setSnackbarMessage("Failed to update status");
        setSnackbarSeverity("error");
        setOpenSnackbar(true); // Show error Snackbar
      }
    }
  };

  useEffect(() => {
    dispatch(GetOrderApi(page, limit));
  }, [dispatch, page, limit]);

  const handlePageChange = (event, newPage) => {
    dispatch(GetOrderApi(newPage, limit));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const handleOrderDetail = (orderId) => {
    navigate(`/order/${orderId}`);
  };
  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Orders
      </Typography>
      <Grid container spacing={3}>
        {orders?.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Order ID: {order._id}
                </Typography>
                <Typography variant="body2">
                  Customer: {order.customerId.username}
                </Typography>
                <Stack spacing={1} sx={{ marginTop: 2 }}>
                  <Typography variant="body2">
                    Status: {order.status || "Not Selected"}
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      label="Status"
                      value={selectedStatus}
                      onChange={(e) => {
                        setCurrentOrderId(order._id); // Set the current order ID
                        handleStatusSelect(e.target.value);
                      }}
                      sx={{ width: "100%" }}
                    >
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Dispatched">Dispatched</MenuItem>
                      {/* Add more status options if needed */}
                    </Select>
                  </FormControl>
                </Stack>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                  Total: ${order.total}
                </Typography>
                <Typography variant="body2">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
                <Button
                  onClick={() => handleOrderDetail(order._id)}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  Order Detail
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{
          marginTop: 3,
          display: "flex",
          justifyContent: "center",
        }}
      />

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderCard;
