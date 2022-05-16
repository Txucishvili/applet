import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeStore } from './services/ThemeService';
import { ModulesStore } from './services/ModuleService';
import { RouterStore } from './services/RouterService';
import { WidgetsStore } from './services/WidgetService';
import { UserStore } from './services/AuthService';

export async function bootstrapApp(cfg) {
  ReactDOM.render(
    <React.StrictMode>
      <ModulesStore.Provider>
        <WidgetsStore.Provider>
          <ThemeStore.Provider>
            <UserStore.Provider>
              <BrowserRouter>
                <RouterStore.Provider>
                  <App />
                </RouterStore.Provider>
              </BrowserRouter>
            </UserStore.Provider>
          </ThemeStore.Provider>
        </WidgetsStore.Provider>
      </ModulesStore.Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}