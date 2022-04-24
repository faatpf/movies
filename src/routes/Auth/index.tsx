// Auth Layout

import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthRoutes from "../AuthRoutes";
import "./style.scss";

/**
 * @interface IAuthProps component AuthLayout
 */
interface IAuthProps {}

/**
 * @function AuthLayout
 * @description contain general layout of Auth pages
 * @param props
 */
const AuthLayout: React.FC<IAuthProps> = (props: IAuthProps) => {
  const navigation = useNavigate();

  React.useEffect(() => {
    if (localStorage.auth_token) {
      navigation("/");
    }
  }, []);

  return (
    <>
      <header>
        <h1 className="gj-auth__heading">{"Login"}</h1>
      </header>
      <main>
        <AuthRoutes />
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default AuthLayout;
