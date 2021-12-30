import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD } from "../../utils/graphQL/mutation";
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [sendEmail] = useMutation(FORGOT_PASSWORD, {
    onError: (err) => {
      if (err.message === "Email not found") setError(err);
    },
  });

  const onSubmit = async (userData) => {
    try {
      const { data } = await sendEmail({ variables: { ...userData } });
      if (data) {
        setSuccess(data.forgotPassword.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="formContainer">
        <div className="formWrapper">
          <div className="header">Reset Password</div>
          {error && <div className="errorText">{error.message}</div>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Field required>
              <input
                type="email"
                {...register("email")}
                placeholder="Email..."
              />
            </Form.Field>
            <Button secondary type="submit">
              Send Email
            </Button>
          </Form>
          {success && <div>{success}</div>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
