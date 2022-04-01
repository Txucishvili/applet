import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";

interface UserServiceInterface {
}

class ContextState {
}


class UserService extends ContextState {
  public userState = {
    userName: null,
    email: null
  };

  initialState:any = { count: 0 };

  context: any = createContext({});

  useState(initState) {
    let state = initState;
    const dispatcher = (e) => {
      console.log("----- useState", e)
      Object.assign(initState,  e);
      return initState;
    };

    return [initState, dispatcher];
  }

  useReducer(reducer, initState) {
    const [state, setState] = this.useState(this.initialState);

    const dispatchs = (e) => {
      console.log('---------', e)
      const nextState = reducer(state, e);
      setState(nextState);
    }

    const dispatch = useCallback((action) => {
      const nextState = reducer(state, action)
      setState(nextState)
    }, [setState, state])
  
    return [this.initialState, dispatchs];
  }

  reducer(state, action) {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
    }
  }

  setUser() {
    console.log(this.initialState)
  }
}

const UserServices = new UserService();



export const useUserContext = () => useContext(UserServices.context);
// export const useUserReducer: any = () => useReducer(reducer, UserServices.userState);


export const UserProviderService = (props) => {
  const [state, dispatch] = UserServices.useReducer(UserServices.reducer, UserServices.initialState);

  // const [state, dispatch] = useReducers(reducer, initialState);


  useEffect(() => {
    console.log('state', state)
    // UserServices.userState.userName = state.userName;
  }, [state])

  return (
    <UserServices.context.Provider value={[state, dispatch]}>
      {props.children}
    </UserServices.context.Provider>
  )
}

export default UserServices;