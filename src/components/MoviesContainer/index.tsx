import React from "react";
import "./style.scss";

/**
 * @interface IMovieContainerProps component MovieContainer
 */
interface IMovieContainerProps {
  title: string;
  rate: number;
}

/**
 * @function MovieContainer
 * @description MovieContainer page
 * @param props
 */
const MovieContainer: React.FC<IMovieContainerProps> = (
  props: IMovieContainerProps
) => {
  const { title, rate } = props;
  return (
    <div className="gj-Movie-container">
      <div className="gj-Movie-container__title">{title}</div>
      <div className="gj-Movie-container__rate">{rate}</div>
    </div>
  );
};
export default MovieContainer;
