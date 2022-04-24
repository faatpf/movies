import React from "react";
import "./style.scss";

/**
 * @interface LoaderProps  Loader Component Props
 */
interface LoaderProps {
  className?: string;
  containerClassName?: string;
}
/**
 * @description Loader component
 * @param props: LoaderProps
 */
const Loader: React.FC<LoaderProps> = (props: LoaderProps) => {
  const { className, containerClassName } = props;
  return (
    <div
      className={`gj-Loader__container${
        containerClassName ? ` ${containerClassName}` : ""
      }`}
    >
      <div className={`gj-Loader${className ? ` ${className}` : ""}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
