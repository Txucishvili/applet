import {
    createContext
} from 'react';
// before app boot config
import '@sass/_theme.scss';

const setTheme = async function (name) {
    const documentEl = document.documentElement;
    documentEl.classList.add(name);

    import(
        /* webpackChunkName: "theme-root" */
        `@sass/themes/_${name}.scss`
    )
}

export const BootContext = createContext({});

const checkUser = () => {
    const user = fetch('/api/Authentication.json').then(r => r.json());
    console.log("user", user)
    return user;
}

const bootConfig = async () => {
    const appBootConfig = {};

    const theme = localStorage.getItem("theme") ?? "theme-default";
    const userToken = localStorage.getItem("user-token") ?? null;

    // const user = await checkUser();
    // console.log("----", user)

    Object.assign(appBootConfig, {
        theme,
        userToken: userToken,
    });

    setTheme(theme);
    console.log('[App booting]', appBootConfig);
}


export {
    bootConfig
};