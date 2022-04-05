import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserStore } from './services/UserService';
import { ThemeStore } from './services/Theme';

export async function  bootstrapApp(cfg) {
  ReactDOM.render(
    <React.StrictMode>
      <ThemeStore.Provider initialValue={cfg.theme}>
        <UserStore.Provider initialValue={cfg.user}>
          <BrowserRouter>
           <App />
          </BrowserRouter>
        </UserStore.Provider>
      </ThemeStore.Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}