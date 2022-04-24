export type Movie = {
  backdrop: string;
  cover:string;
  duration: number;
  imdb_id: number;
  movie_type: number;
  plot: string;
  rate: number;
  series_years: number | null;
  title: string;
  tmdb_id: number;
  voute_count: number;
  year: number;
};

export type Movies = {
  count:number
  results:Array<Movie>
};

export type UserInfo ={
  mobile?:string;
  user_name?:string;
  first_name?:string;
  last_name?:string;
  email?:string;
}

export type RootState = {
  users: UserInfo;
};

export type Error = {
  code?: number;
  message?: string;
  uri?: string;
  severity?: "Fatal" | "Error" | "Warning";
};
