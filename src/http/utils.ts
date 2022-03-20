interface IRequestProps {
  url: string;
  init?: RequestInit | undefined;
  type?: 'json' | 'blob';
}

/**
 * Wrapper around Fetch API for HTTP requests
 */
export const request = async <T>({ init, url, type = 'json' }: IRequestProps): Promise<T> => {
  const response = await fetch(url, init);

  if (type === 'blob') {
    // handle case
  }

  return await response.json(); // good practice to have `return await` for accurate stack traces
};
