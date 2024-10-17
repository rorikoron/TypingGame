import { HashRouter, Route, Routes } from 'react-router-dom'
import { RouteProps } from './components/HeaderChild'
import Header from './components/Header'
import style from './assets/App.module.scss'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  // TODO: Add component to this array of object
  const routes :RouteProps[] = [
    {title: "home", route:"/"},
    {title: "Start Game", route: "/game"},
    {title: "Setting", route: "setting"}
  ]

  console.log("rendering app")
  return (
    <>

        <HashRouter >
          <div className={`${style.content}`}>
            <Header routes = {routes} />
            <Routes>
            {
              routes.map(({route, component}) => (
                <Route path={route} element={component} />
              ))
            }
            </Routes>
          </div>
          </HashRouter>
    </>
  )
}

export default App
