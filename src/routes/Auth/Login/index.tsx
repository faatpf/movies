// Login page

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { BASE_URL } from "src/config/defaultValues";
import LoginForm from "src/components/LoginForm";
import Loader from "src/components/Loader";
import Button from "src/components/Button";
import { setUserInfo } from "src/store/usersSlice";
import "./style.scss";

export enum LOGIN_STATE {
  LOGIN = "login",
  VERIFICATION = "verification",
}

const sendVerificationCode = async (
  mobile: string,
  setError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res = await fetch(`${BASE_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile }),
    });
  } catch (e) {
    setError(true);
    console.log("-------- Login - Send Verification code -------", e);
  }
};

const submitVerificationCode = async (
  mobile: string,
  code: string,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: React.Dispatch<AnyAction>
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/token/login/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, otp_token: code }),
      }
    );
    const data = await response.json();
    const { auth_token: authToken } = data;
    localStorage.setItem("auth_token", authToken);
    dispatch(setUserInfo("user"));
  } catch (e) {
    setError(true);
    console.log("-------- Verification - submit verification -------", e);
  }
};

/**
 * @interface ILoginProps component AuthLayout
 */
interface ILoginProps {}

/**
 * @function Login
 * @description Login page
 * @param props
 */
const Login: React.FC<ILoginProps> = (props: ILoginProps) => {
  const [loginStep, setLoginStep] = useState<string>(LOGIN_STATE.LOGIN);
  const [mobile, setMobile] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    if (loginStep === LOGIN_STATE.LOGIN) {
      setMobile(e.target.value);
    }
    if (loginStep === LOGIN_STATE.VERIFICATION) {
      setCode(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (loginStep === LOGIN_STATE.LOGIN) {
      setLoading(true);
      try {
        await sendVerificationCode(mobile, setError);
      } finally {
        setLoading(false);
      }
    }
    if (loginStep === LOGIN_STATE.VERIFICATION) {
      setLoading(true);
      try {
        await submitVerificationCode(mobile, code, setError, dispatch);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="gj-login">
      {loading && <Loader />}

      {error && (
        <>
          <div className="gj-login__error">
            {"Oops! An error has occurred."}
          </div>
          <Button
            title="Retrieve Verification Code"
            onClick={() => {
              setError(false);
              setLoginStep(LOGIN_STATE.LOGIN);
            }}
          />
        </>
      )}
      
      {!loading && !error && (
        <LoginForm
          handleSubmit={handleSubmit}
          handleChange={(e) => {
            handleChange(e);
          }}
          loginStep={loginStep}
          setLoginStep={setLoginStep}
          loading={loading}
        />
      )}
    </div>
  );
};
export default Login;
