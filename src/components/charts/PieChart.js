import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchOrders } from "../../services/order"; // Import the fetchOrders function

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Colors for pie chart
      },
    ],
  });
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        const allOrders = [];
        let page = 1;

        // Handle pagination and fetch all pages
        while (true) {
          const response = await fetchOrders(page);
          const orders = response.data.orders;

          if (orders.length === 0) break; // No more orders to fetch

          allOrders.push(...orders); // Add fetched orders to the list
          page++;

          if (page > response.data.totalPages) break; // Stop when all pages are fetched
        }

        const orderStatus = {
          completed: 0,
          pending: 0,
          cancelled: 0,
        };

        // Process orders to count their status
        allOrders.forEach((order) => {
          if (order.status === "completed") orderStatus.completed++;
          else if (order.status === "pending") orderStatus.pending++;
          else if (order.status === "cancelled") orderStatus.cancelled++;
        });

        // Update chart data state
        setChartData({
          labels: ["Completed", "Pending", "Cancelled"],
          datasets: [
            {
              data: [
                orderStatus.completed,
                orderStatus.pending,
                orderStatus.cancelled,
              ],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching order data:", error);
        setError("Error fetching order data. Please try again.");
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchOrderData();
  }, []); // Empty dependency array ensures this effect runs only once after component mounts

  if (loading) return <div>Loading...</div>; // Show loading indicator
  if (error) return <div>{error}</div>; // Show error message if there's an error

  return (
    <div>
      <h3>Order Status Distribution</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
