import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './custom.css';
import UserContextProvider from './Store/UserContext';
import ApplicationContextProvider from './Store/AppDataContext';
import { BrowserRouter } from 'react-router-dom';
import ModalContextProvider from './Store/ModalContext';

ReactDOM.render(
    <React.StrictMode>
        <ApplicationContextProvider>
            <ModalContextProvider>
                <UserContextProvider>
                    <BrowserRouter>
                        <div className="default-styles">
                            <App />
                        </div>
                    </BrowserRouter>
                </UserContextProvider>
            </ModalContextProvider>
        </ApplicationContextProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
