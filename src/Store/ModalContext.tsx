/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useReducer, useEffect } from 'react';

export const ModalContext = createContext<MyContext>({});

const modalReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_LOADER': {
            return action.data;
        }
        default:
            return state;
    }
};

const ModalContextProvider = (props: {
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}) => {
    const [loader, loaderDispatch] = useReducer(modalReducer, { text: '', isLoading: false });

    return <ModalContext.Provider value={{ loader, loaderDispatch }}>{props.children}</ModalContext.Provider>;
};

interface MyContext {
    loader?: any;
    loaderDispatch?: any;
}

export default ModalContextProvider;
