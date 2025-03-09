import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const apiHandler = async ({
  token = false,
  method = "get",
  end_point = "",
  body = {},
  configuration = {},
}) => {
  // Get token from localStorage
  const getToken = localStorage.getItem("authToken");
  console.log("Token from localStorage:", getToken);

  // Configure headers based on whether a token is provided
  const headers = {
    ...configuration, // Add any other custom headers here
  };

  if (token && getToken) {
    headers["Authorization"] = `Bearer ${getToken}`; // Add the Authorization header if the token is available
  }

  const apiInterceptor = axios.create({
    baseURL,
    timeoutErrorMessage: "Request timeout! Please retry.",
    headers, // Attach headers directly here
  });

  const createError = (message, status) => {
    const error = new Error(message);
    error.status = status;
    return error;
  };

  apiInterceptor.interceptors.request.use(
    (req) => req,
    (error) => Promise.reject(error)
  );

  apiInterceptor.interceptors.response.use(
    (res) => res,
    (error) => Promise.reject(error)
  );

  try {
    const res = await apiInterceptor[method](end_point, body);
    return res;
  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;

      if (statusCode >= 500) {
        throw createError(
          "Something went wrong! Please try again later.",
          statusCode
        );
      } else {
        throw createError(
          error.response.data?.message || "An error occurred.",
          statusCode
        );
      }
    } else if (error.request) {
      throw createError(
        "No response from the server. Please check your connection.",
        503
      );
    } else {
      throw createError(error.message || "An unexpected error occurred.", 500);
    }
  }
};

export default apiHandler;
