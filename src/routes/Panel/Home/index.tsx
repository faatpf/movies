import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { MOVIE_BASE_URL } from "src/config/defaultValues";
import MovieContainer from "src/components/MoviesContainer";
import Pagination from "src/components/Pagination";
import Rating from "src/components/Rating";
import Loader from "src/components/Loader";
import { useFetch } from "src/utils/useFetch";
import { Movies,RootState } from "src/utils/types";
import "./style.scss";

/**
 * @interface IHomeProps component Home
 */
interface IHomeProps {}

/**
 * @function Home
 * @description Home page
 * @param props
 */
const Home: React.FC<IHomeProps> = (props: IHomeProps) => {
  const [page, setPage] = React.useState<number>(1);
  const [minRate, setMinRate] = React.useState<string>('');
  const [maxRate, setMaxRate] = React.useState<string>('');
  const [url, setUrl] = React.useState<string>(`${MOVIE_BASE_URL}/?page=${page}`);
  const [movies, error, loading] = useFetch<Movies>(url, "GET", [url, page]);
  const users = useSelector((state: RootState) => state.users);


  const getPageNumber = (value: number) => {
    setPage(value);
  };

  const handleMinChange = (e: any) => {
    setMinRate(e.target.value);
  };

  const handleMaxChange = (e: any) => {
    setMaxRate(e.target.value);
  };

  const handleFilter = () => {
    setUrl(
      `${MOVIE_BASE_URL}/?page=${page}${minRate ? `&rate__gte=${minRate}` : ""}${
        maxRate ? `&rate__lte=${maxRate}` : ""
      }`
    );
  };

  const handleResetFilter = () => {
    setMaxRate('');
    setMinRate('');
    setUrl(`${MOVIE_BASE_URL}/?page=${page}`);
  };

  useEffect(() => {
    setUrl(
      `${MOVIE_BASE_URL}/?page=${page}${minRate ? `&rate__gte=${minRate}` : ""}${
        maxRate ? `&rate__lte=${maxRate}` : ""
      }`
    );
  }, [page]);
  
  return (
    <div className="gj-home">

      <h2 className="gj-home__heading">{`Welcome ${users.user_name}`}</h2>

      <Rating
        handleMinChange={handleMinChange}
        handleMaxChange={handleMaxChange}
        handleFilter={handleFilter}
        handleResetFilter={handleResetFilter}
        minInputDefaultValue={minRate}
        maxInputDefaultValue={maxRate}
        className='gj-home__rating'
        title="Filter Movies Based On Rate"
      />

      {loading && !error && <Loader />}

      {!loading && !error && movies.results.length === 0 && (
        <div>{"No movies found"}</div>
      )}

      {error && <div>{"Oops! an error has occurred."}</div>}

      {!loading && !error && movies.results.length > 0 && (
        <>
          <div className="gj-home__description">
            <div>{"Movie Name"}</div>
            <div>{"Movie Rate"}</div>
          </div>
          {movies.results.map((movie) => (
            <MovieContainer
              key={movie.imdb_id}
              title={movie.title}
              rate={movie.rate}
            />
          ))}
        </>
      )}

      <Pagination total={movies.count} sendPageNumber={getPageNumber} />
      
    </div>
  );
};
export default Home;
