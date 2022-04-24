import React from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "src/components/TextInput";
import Button from "src/components/Button";
import { LOGIN_STATE } from "src/routes/Auth/Login";
import './style.scss'

/**
 * @interface ILoginFormProps  LoginForm Component Props
 */
interface ILoginFormProps {
  handleSubmit: (item?: React.SyntheticEvent) => void;
  handleChange: (item?: React.FormEvent<HTMLInputElement>) => void;
  setLoginStep: React.Dispatch<React.SetStateAction<string>>;
  loginStep: string;
  loading: boolean;
  className?: string;
}

/**
 * @function LoginForm component
 * @description handle login form
 * @param props: LoginFormProps
 */
const Login: React.FC<ILoginFormProps> = (props: ILoginFormProps) => {
  const { handleSubmit, handleChange, setLoginStep, loading } = props;

  return (
    <form
      name="login"
      id="login-form"
      onSubmit={handleSubmit}
      className="gj-login-form__form"
    >
      <div className="gj-login-form__description">
        {"Please Enter Your Number:"}
      </div>
      <TextInput
        name="mobile"
        placeholder={"+989123456789"}
        pattern="\d*"
        inputMode="numeric"
        onChange={handleChange}
        defaultValue="+98"
        maxLength={13}
        className="gj-login-form__input"
      />
      <Button
        onClick={() => {
          handleSubmit();
          if (!loading) setLoginStep(LOGIN_STATE.VERIFICATION);
        }}
        title="Get Verification Code"
        type="button"
        className="gj-login-form__btn"
      ></Button>
    </form>
  );
};

/**
 * @function VerificationForm component
 * @description handle verification forms
 * @param props: VerificationFormsProps
 */
const Verification: React.FC<ILoginFormProps> = (props: ILoginFormProps) => {
  const { handleSubmit, handleChange } = props;
  const navigation = useNavigate();
  
  return (
    <form
      name="verification"
      id="verification-form"
      onSubmit={handleSubmit}
      className="gj-login-form__form"
    >
      <div>{'Enter 5-Digit SMS Verification Code:'}</div>
      <TextInput
        name="verification_code"
        placeholder={"5 Dgit Verification Code"}
        pattern="\d*"
        inputMode="numeric"
        onChange={handleChange}
        autoFocus
        maxLength={5}
        className="gj-login-form__input"
      />
      <Button
        onClick={async () => {
          await handleSubmit();
          if (localStorage.auth_token) navigation(0);
        }}
        title="Send"
        type="button"
        className="gj-login-form__btn"
      ></Button>
    </form>
  );
};

/**
 * @function LoginForm
 * @description LoginForm component
 * @param props: ILoginFormProps
 */
const LoginForm: React.FC<ILoginFormProps> = (props: ILoginFormProps) => {
  const { loginStep, className } = props;
  return (
    <div className={`gj-login-form${className ? ` ${className}` : ""}`}>
      {loginStep === LOGIN_STATE.LOGIN && <Login {...props} />}
      {loginStep === LOGIN_STATE.VERIFICATION && <Verification {...props} />}
    </div>
  );
};
export default LoginForm;
