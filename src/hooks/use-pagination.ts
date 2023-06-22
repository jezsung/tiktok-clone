import { useState } from 'react';

type Status = 'idle' | 'loading' | 'loading-more' | 'success' | 'error';

interface State<T> {
  status: Status;
  pages: T[];
  error: any;
}

function usePagination<T>(
  fetcher: () => Promise<T>
): [State<T>, () => Promise<void>, () => Promise<void>] {
  const [state, setState] = useState<State<T>>({
    status: 'idle',
    pages: [],
    error: null,
  });

  async function fetch() {
    if (state.status === 'loading' || state.status === 'loading-more') {
      return;
    }

    setState((prev) => ({ ...prev, status: 'loading' }));

    try {
      const data = await fetcher();
      setState((prev) => ({ ...prev, status: 'success', pages: [data] }));
    } catch (error: any) {
      setState((prev) => ({ ...prev, status: 'error', error }));
    }
  }

  async function fetchNextPage() {
    if (state.status === 'loading' || state.status === 'loading-more') {
      return;
    }

    setState((prev) => ({ ...prev, status: 'loading-more' }));

    try {
      const data = await fetcher();
      setState((prev) => ({
        ...prev,
        status: 'success',
        pages: [...prev.pages, data],
      }));
    } catch (error: any) {
      setState((prev) => ({ ...prev, status: 'error', error }));
    }
  }

  return [state, fetch, fetchNextPage];
}

export default usePagination;
