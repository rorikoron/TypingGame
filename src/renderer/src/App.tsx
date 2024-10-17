import { HashRouter, Route, Routes } from 'react-router-dom'
import { RouteProps } from './components/HeaderChild'
import Header from '@renderer/components/Header'
import style from '@renderer/style/App.module.scss'
import Game from '@renderer/components/Game'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  // TODO: Add component to this array of object
  const routes :RouteProps[] = [
    {title: "home", route:"/"},
    {title: "Start Game", route: "/game", component: <Game />},
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
