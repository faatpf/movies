import React from "react";
import "./style.scss";

/**
 * @interface IButtonProps  Button Component Props
 */
interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  htmlType?: "submit" | "reset" | "button";
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  containerClassName?: string;
}
/**
 * @description Button component
 * @param props: ButtonProps
 */
const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  const {
    title,
    htmlType = "button",
    onClick,
    className,
    containerClassName,
    ...rest
  } = props;
  return (
    <div
      className={`gj-btn__container${
        containerClassName ? ` ${containerClassName}` : ""
      }`}
    >
      <button
        type={htmlType}
        onClick={onClick}
        className={`gj-btn${className ? ` ${className}` : ""}`}
        {...rest}
      >
        {<span className={"gj-btn__title"}>{title}</span>}
      </button>
    </div>
  );
};

export default Button;
