import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";

let store: any;

const initialState = {
  postsData: [],
  singlePost: {},
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        postsData: action.payload,
      };
    case "SET_POST":
      return {
        ...state,
        singlePost: action.payload,
      };
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(reducer, preloadedState, applyMiddleware());
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
