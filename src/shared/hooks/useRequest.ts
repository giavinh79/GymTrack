import { useCallback, useEffect, useState } from 'react';
import { useIsMounted } from './useIsMounted';

interface IUseRequestInput<T> {
  request: () => Promise<T>;
  executeRightAway?: boolean;

  onSuccess?: ((data: T) => Promise<void>) | ((data: T) => void);
  onError?: ((error: Error) => Promise<void>) | ((error: Error) => void);
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
 * @example
 * const { data, error, isLoading, execute } = useRequest({
 *   request: fetchUsers,
 *   onSuccess: () => alert('users have been fetched!')
 * })
 */
export const useRequest = <T>({
  executeRightAway = true,
  onSuccess,
  onError,
  request,
}: IUseRequestInput<T>): IUseRequestApi<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const isMounted = useIsMounted();

  const handleRequestExecution = useCallback(async (): Promise<T | undefined> => {
    try {
      if (!isMounted) return; // no need to send request if component is being unmounted

      setIsLoading(true);

      const data = await request();

      if (!isMounted.current) return; // no need to set state or call onSuccess if component is being unmounted
      setData(data);
      setIsLoading(false);

      onSuccess && onSuccess(data);

      return data;
    } catch (err) {
      setIsLoading(false);
      setError(err as Error);
      isMounted && onError && onError(err as Error);
    }
  }, []);

  useEffect(() => {
    if (executeRightAway) {
      handleRequestExecution();
    }
  }, [handleRequestExecution]);

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
