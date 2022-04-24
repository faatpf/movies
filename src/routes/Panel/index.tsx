// Panel layout

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUserInfo } from "src/store/usersSlice";
import Button from "src/components/Button";
import PanelRoutes from "../PanelRoutes";
import "./style.scss";

/**
 * @interface IPanelLayoutProps component PanelLayout props
 */
interface IPanelLayoutProps {}

/**
 * @function PanelLayout
 * @description contain general layout of Panel pages
 * @param props
 * @constructor
 */
const PanelLayout: React.FC<IPanelLayoutProps> = (props: IPanelLayoutProps) => {
  const [didMount, setDidMount] = React.useState(false);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.removeItem("auth_token");
    dispatch(resetUserInfo());
    navigation(0);
  };

  useEffect(() => {
    if (!localStorage.auth_token) {
      navigation("/login");
    }
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <>
      <header className="gj-panel__header">
        <h1>Movies</h1>
        <Button
          title="Sign out"
          className="gj-panel__btn"
          onClick={handleSignOut}
        />
      </header>
      <main>
        <PanelRoutes />
      </main>
      <footer></footer>
    </>
  );
};

export default PanelLayout;
