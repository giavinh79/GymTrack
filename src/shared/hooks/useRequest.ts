import { useState } from 'react';

interface IUseRequestInput<T> {
  request: () => Promise<T>;
}

interface IUseRequestApi<T> {
  data: null | T;
  error: null | Error;
  isLoading: boolean;

  execute: () => Promise<T | undefined>;
}

/**
 * Custom hook that executes request and returns the different states (data, errors, loading)
 *
 * @TODO replace with React Query at a later point
 */
export const useRequest = <T>({ request }: IUseRequestInput<T>): IUseRequestApi<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const handleRequestExecution = async (): Promise<T | undefined> => {
    try {
      setIsLoading(true);

      const data = await request();
      setData(data);
      setIsLoading(false);

      return data;
    } catch (err) {
      setError(err as Error);
    }
  };

  return {
    data,
    error,
    isLoading,
    execute: handleRequestExecution,
  };
};

interface IUseMultipleRequestInput {
  requests: Array<() => Promise<any>>;
}

interface IUseMultipleRequestApi {
  error: null | Error;
  isLoading: boolean;

  execute: () => Promise<void>;
}

/**
 * Custom hook that executes multiple requests concurrently and just returns a loading or error state (does not return data)
 *
 * @TODO replace with React Query at a later point
 */
export const useMultipleRequest = ({ requests }: IUseMultipleRequestInput): IUseMultipleRequestApi => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRequestExecution = async () => {
    try {
      setIsLoading(true);

      await Promise.all(requests);

      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
    }
  };

  return {
    error,
    isLoading,
    execute: handleRequestExecution,
  };
};
