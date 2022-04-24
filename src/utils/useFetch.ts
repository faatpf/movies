import React from "react";
import { AxiosError, AxiosResponse } from "axios";
import { Error } from "../utils/types";

interface UseFetchOption<T = any, E = Error> {
  loadingTimeout?: number;
  onLoadingSlow?: any;
  onSuccess?: (res: AxiosResponse<T>) => any;
  onError?: (err: AxiosError<E>) => any;
}

export function useFetch<T = any, E = Error>(
  url: string,
  method: "GET" | "PUT" | "DLETE" | "POST",
  depend: Array<any> = [],
  body?: {},
  initial: T = {} as T,
  option: UseFetchOption<T, E> = {}
): [T, E | null, boolean] {
  const [response, setResponse] = React.useState<T>(initial);
  const [error, setError] = React.useState<E | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { onSuccess, onError, loadingTimeout, onLoadingSlow } = option;
  React.useEffect(() => {
    (async () => {
      let loadingSlowTimeout;
      try {
        if (onLoadingSlow && loadingTimeout)
          loadingSlowTimeout = setTimeout(onLoadingSlow, loadingTimeout);
        setLoading(true);
        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        clearTimeout(loadingSlowTimeout as NodeJS.Timeout);
        onSuccess && onSuccess(data);
        setResponse(data);
        setError(null);
      } catch (err) {
        setResponse(initial);
        clearTimeout(loadingSlowTimeout as NodeJS.Timeout);
        onError && onError(err as AxiosError);
        setError(
          ((err as AxiosError).response &&
            (err as AxiosError).response?.data) ||
            (err as AxiosError).message
        );
      } finally {
        setLoading(false);
      }
    })();
  }, depend);
  return [response, error, loading];
}
