import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';



const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

const landingPageContainer = document.getElementById('landingPage');
const landingPage = createRoot(landingPageContainer);

landingPage.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>

    </React.StrictMode>
);

const loginPageContainer = document.getElementById('loginPage');
const loginPage = createRoot(loginPageContainer);

loginPage.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>

    </React.StrictMode>
);
const createUserPageContainer = document.getElementById('createUserPage');
const createUserPage = createRoot(createUserPageContainer);

createUserPage.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>

    </React.StrictMode>
);
const trackPageContainer = document.getElementById('trackPage');
const trackPage = createRoot(trackPageContainer);

trackPage.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>

    </React.StrictMode>
);

const trainPageContainer = document.getElementById('trainPage');
const trainPage = createRoot(trainPageContainer);

trainPage.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>

    </React.StrictMode>
);