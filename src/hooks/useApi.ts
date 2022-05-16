import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface iOptionsModel<Q = any> {
  initialRequest?: boolean;
  query?: Q;
  onDebounce?: Function;
  debounceTime?: number;
}

interface IReturnModel<Q> {
  isLoading?: boolean | null;
  isLoaded?: boolean | null;
  data?: any | null;
  errors?: any | null;
  requestCount: number;
  refetch: Function;
  options?: iOptionsModel<Q>;
  query: Q;
  updateQuery: (p: Partial<Q>) => void;
  resetQuery: Function;
  getQuery: Function;
  cancel: Function;
}

interface IStateModel {
  isLoading?: boolean | null;
  isLoaded?: boolean | null;
  data?: any | null;
  errors?: any | null;
  requestCount: number;
  onRefetch?: Function;
}

interface IUseAPIProps {
  name: string;
  fetchFN: Function | null;
}

const defaultOptions: iOptionsModel = {
  initialRequest: false,
  query: null,
  onDebounce: () => { },
  debounceTime: 800
}
const initialState = {
  isLoading: null,
  data: null,
  errors: null,
  isLoaded: null,
  requestCount: 0

}

export default function useApi<Q>(
  name: any,
  fetchFN: any,
  options: iOptionsModel<Q> = defaultOptions
): IReturnModel<Q> {

  const [state, setstate] = useState(initialState);
  const [query, setQuery]: [any, any] = useState(options.query);
  const didMountRef = useRef(false);
  const { data, isLoading, isLoaded, errors, requestCount } = state;
  // const debounceDone = useRef(false)
  const [debounceDone, setdebounceDone] = useState(false)

  useEffect(() => {
    console.log('[options] options', name, options);

    if (options.initialRequest) {
      updateState({
        ...state,
        isLoading: true,
      });

      refetch({ query });
    }
    return () => {
      fetchFN = null;
    }
  }, []);

  useEffect(() => {
    if (didMountRef.current) {
      if (typeof options.onDebounce == 'function') {
        debounceQuery(() => {
          console.log("DoneDebounce", query);
          onDebounce(query);
        })
      }
    }
    didMountRef.current = true;
  }, [query])

  useEffect(() => {
    if (state.isLoading != null && state.isLoading == false) {
      updateState({
        requestCount: state.requestCount + 1
      })
    }
  }, [state.isLoading])

  const debounceQuery = useCallback(debounce(cb => {
    cb();
  }, options.debounceTime), [])

  const onDebounce = useCallback((q) => {
    console.log('object')
    if (options.onDebounce) {
      options.onDebounce(q);
    }
  }, [query])

  const refetch = useCallback(
    async (props) => {
      const currCount = state.requestCount;
      if (state.isLoading) {
        return;
      }
     
      updateState({
        ...state,
        isLoading: true,
      });

      await fetchFN({ query })
        .then((r) => {
          updateState({
            isLoading: false,
            isLoaded: true,
            errors: null,
            data: r,

          })
        })
        .catch((e) => {
          updateState({
            isLoading: false,
            isLoaded: false,
            errors: 'error on loading',
          })
        });


    },
    [state, query],
  )

  const updateState = useCallback(
    (args) => {
      setstate({
        ...state,
        ...args,
      });
    },
    [state, query],
  )

  const updateQuery = useCallback(
    (newState) => {
      setQuery({
        ...query,
        ...newState
      })
    },
    [query],
  )

  const resetQuery = useCallback(
    (newState) => {
      console.log("query reset", options.query)
      setQuery(options.query)
    },
    [],
  )

  const getQuery = useCallback(
    () => {
      console.log('query', query)
      return query
    },
    [query],
  )
  
  const cancel = () => {
    updateState({
      requestCount: state.requestCount += 1
    })
  }


  return { data, isLoading, errors, refetch, cancel, requestCount, query, updateQuery, resetQuery, getQuery };
}
