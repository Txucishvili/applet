interface ThemeServiceInterface {
    setLocalTheme: any
}

class ThemeService implements ThemeServiceInterface {
    public themeName;

    setLocalTheme(e) {
        const hasTheme = document.documentElement.classList.value.split(" ").find((e) => e.includes('theme'));
        if (!hasTheme) {
            document.documentElement.classList.add(`${e}`);
            localStorage.setItem("theme", e)
        } else {
            document.documentElement.classList.remove(hasTheme)
            document.documentElement.classList.add(`${e}`);
            localStorage.setItem("theme", e)
        }
    }

    setTheme(e) {
        import(
            /* webpackChunkName: "theme" */
            /* webpackMode: "lazy" */

            `@sass/themes/_${e}.scss`
        ).then((m) => {
            this.themeName = e;
            this.setLocalTheme(e);
        });
    }
}

const theme = new ThemeService();

export default theme;