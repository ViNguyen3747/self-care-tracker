import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { SIGN_UP } from "../../utils/graphQL/mutation";
import { registerSchema } from "../../utils/validation/authenticationValidation";
import "./Auth.scss";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [addUser] = useMutation(SIGN_UP, {
    onError: (err) => {
      if (
        err.message === "Username is already taken" ||
        err.message === "Email is already registred"
      )
        setError(err);
    },
  });
  const [cap, setCap] = useState(false);
  const CapsLock = "CapsLock";
  const handleKeydown = (event) => {
    const code = event.code;
    setCap(() => event.getModifierState?.(CapsLock) || code === CapsLock);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const onSubmit = async (userData) => {
    try {
      const { retypePassword, ...userInput } = userData;
      const { data } = await addUser({
        variables: { newUser: { ...userInput, status: "Pending" } },
      });
      if (data) setSuccess(data.signup.message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <div className="formWrapper">
          <div className="header">Sign Up</div>
          {error && <div className="errorText">{error.message}</div>}
          {cap && <div className="errorText">Capslock is on!</div>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group widths="equal">
              <Form.Field required>
                <input
                  type="text"
                  {...register("firstName")}
                  placeholder="First Name..."
                />
                <p className="errorText">{errors.firstName?.message}</p>
              </Form.Field>
              <Form.Field required>
                <input
                  type="text"
                  {...register("lastName")}
                  placeholder="Last Name..."
                />
                <p className="errorText">{errors.lastName?.message}</p>
              </Form.Field>
            </Form.Group>
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
                type="text"
                {...register("username")}
                placeholder="User Name..."
              />
              <p className="errorText">{errors.username?.message}</p>
            </Form.Field>

            <Form.Group widths="equal">
              <Form.Field required>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password..."
                />
                <p className="errorText">{errors.password?.message}</p>
              </Form.Field>
              <Form.Field required>
                <input
                  type="password"
                  {...register("retypePassword")}
                  placeholder="Confirm Password..."
                />
                <p className="errorText">{errors.retypePassword?.message}</p>
              </Form.Field>
            </Form.Group>
            {success && <div>{success}</div>}
            <div>
              <Button secondary type="submit">
                Submit
              </Button>
            </div>
            <div className="authlink">
              <p>
                Already have an acount? <Link to="/signin">Sign in</Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
