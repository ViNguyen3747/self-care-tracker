import React, { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../../utils/graphQL/mutation";
import Auth from "../../utils/auth";
import { signinSchema } from "../../utils/validation/authenticationValidation";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signinSchema) });
  const [error, setError] = useState(null);
  const [login] = useMutation(SIGN_IN, {
    onError: (err) => {
      if (
        err.message === "Email not found" ||
        err.message === "Incorrect Password" ||
        err.message === "Pending Account. Please Verify Your Email"
      )
        setError(err);
    },
  });

  const handleFormSubmit = async (userData) => {
    try {
      const { data } = await login({
        variables: { ...userData },
      });
      if (data) {
        Auth.login(data.signin.token);
        window.location.assign("/today");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <div className="formWrapper">
          <div className="header">Sign In</div>
          {error && <div className="errorText">{error.message}</div>}
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Form.Field required>
              <input
                type="email"
                {...register("email")}
                placeholder="Email..."
              />
              <p className="errorText">{errors.email?.message}</p>
            </Form.Field>
            <Form.Field required>
              <input
                type="password"
                {...register("password")}
                placeholder="Password..."
              />
              <p className="errorText">{errors.password?.message}</p>
            </Form.Field>

            <div>
              <Button secondary type="submit">
                Submit
              </Button>
            </div>
            <div className="authlink">
              <p>
                Forgot your password?{" "}
                <Link to="/user/forgotPassword">Reset Password</Link>
              </p>
              <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
