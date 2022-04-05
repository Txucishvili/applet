import { ThemeStore } from '@/services/Theme';


export function MainPageView({ children }) {


  return (
    <div>
      {children}
    </div>
  )
}


export default function Main() {
  const [theme, setTheme]: any = ThemeStore.useContext();


  return (
    <div>
      {theme.theme}
        <MainPageView>
          Main Page
        </MainPageView>
    </div>
  )
}
