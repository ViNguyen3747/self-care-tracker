import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import { ACTIVATE_USER } from "../../utils/graphQL/mutation";

const Activation = () => {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [activateUSer] = useMutation(ACTIVATE_USER);
  useEffect(() => {
    if (activation_token)
      try {
        activate(activation_token);
      } catch (e) {
        setErr("Fail to activate account");
      }
  }, [activation_token]);

  const activate = async (token) => {
    let { data } = await activateUSer({ variables: { token } });
    if (data) {
      setSuccess(data.activateEmail.message);
    }
  };
  return (
    <div className="container">
      <div className="formWrapper">
        {err && <div>{err}</div>}{" "}
        {success && (
          <div>
            {success}
            <br />
            <br />
            <NavLink to="/signin">
              <Button color="black" className="linkModal">
                {" "}
                Sign In
              </Button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activation;
