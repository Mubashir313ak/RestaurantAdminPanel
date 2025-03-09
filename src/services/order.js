import { setAllOrders, setError, setLoading } from "../redux/slices/order";
import apiHandler from "./interceptor";

export const GetOrderApi = (page, limit) => {
  return async function OrderApiThunk(dispatch) {
    try {
      dispatch(setLoading(true));
      const response = await apiHandler({
        method: "get",
        end_point: `order/get-orders?page=${page}&limit=${limit}`,
        token: true,
        configuration: {},
      });

      dispatch(setAllOrders(response?.data));
      dispatch(setLoading(false));
      return response?.data?.status;
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message || "An error occurred"));
      console.error("POST request error:", error);
      throw error;
    }
  };
};

export const ChangeOrderStatus = async (body) => {
  console.log("body::", body);

  try {
    const response = await apiHandler({
      method: "patch",
      end_point: `order/change-status`,
      token: true,
      configuration: {},
      body: body,
    });
    console.log("ApIResponse:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const GetOrderByIdApi = async (orderId) => {
  try {
    const response = await apiHandler({
      method: "get",
      end_point: `order//${orderId}`,
      token: true,
      configuration: {},
    });
    console.log("ApIResponse:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("Error:", error);
  }
};
