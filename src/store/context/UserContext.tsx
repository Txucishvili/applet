import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";


const localToken = localStorage.getItem("user-token") ?? null;

const UserState = {
    userName: null,
    email: null
};


export function reducer(state: any, dispatcher: any): any {
    const {
        action, payload
    } = dispatcher;


    let returnState = {
        ...state,
        ...payload
    };
    // console.log('[User reducer]', Object.assign({}, returnState))

    return Object.assign({}, returnState);
}

const context: any = createContext(UserState);

const contextHook: any = () => useContext(context);
const reducerHook: any = () => useReducer(reducer, UserState);


const Provider = (props) => {
    const [state, dispatch] = reducerHook();

    useEffect(() => {
    }, [])

    return (
        <context.Provider value={[state, dispatch]}>
            {props.children}
        </context.Provider>
    )
}


export { Provider as UserProvider, context as UserContext, contextHook as useUser };