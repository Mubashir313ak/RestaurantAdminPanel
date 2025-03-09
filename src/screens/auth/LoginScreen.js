import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../../services/auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginScreen.css";
// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    const { email, password } = values;

    try {
      await dispatch(LoginApi({ email, password }));
      navigate("/dashboard");
    } catch (err) {
      setFieldError("password", "Invalid email or password");
      console.log("Login failed", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <div className="input-group">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="input-field"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="input-group">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="input-field"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
      <button onClick={() => navigate("/register")} className="register-btn">
        Register
      </button>
    </div>
  );
};

export default LoginScreen;
