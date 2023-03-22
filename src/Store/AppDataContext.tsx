/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useReducer, useEffect } from 'react';

export const AppDataContext = createContext<ApContext>({});

const appDataReducer = (state: any, action: { type: any; appData: any }) => {
    switch (action.type) {
        case 'STORE_APP_DATA': {
            return action.appData;
        }
        default:
            return state;
    }
};

const AppDataContextProvider = (props: {
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}) => {
    const [appData, dispatch] = useReducer(appDataReducer, [], () => {
        const localData = localStorage.getItem('appData');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('appData', JSON.stringify(appData));
    }, [appData]);

    return <AppDataContext.Provider value={{ appData, dispatch }}>{props.children}</AppDataContext.Provider>;
};
interface ApContext {
    appData?: any;
    dispatch?: any;
}

export default AppDataContextProvider;
