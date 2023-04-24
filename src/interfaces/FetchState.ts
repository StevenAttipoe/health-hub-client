interface FetchState<T> {
    loading: boolean;
    data: T | undefined;
    error: Error | undefined;
  }

export default FetchState;