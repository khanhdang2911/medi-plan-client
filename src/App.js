import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'

import { authRoutes, privateRoutes, publicRoutes } from './routes'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'
import Anonymous from './components/Anonymous/Anonymous'
import AuthenticatedPage from './components/AuthenticatedPage/AuthenticatedPage'
function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = DefaultLayout
          const Page = route.component
          if (route.layout) Layout = route.layout
          else if (route.layout === null) {
            Layout = Fragment
          }
          return (
            <Route
              key={index}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
              path={route.path}
            ></Route>
          )
        })}
        {
          <Route element={<Anonymous />}>
            {privateRoutes.map((route, index) => {
              let Layout = DefaultLayout
              const Page = route.component
              if (route.layout) Layout = route.layout
              else if (route.layout === null) {
                Layout = Fragment
              }
              return (
                <Route
                  key={index}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                  path={route.path}
                ></Route>
              )
            })}
          </Route>
        }
        {
          <Route element={<AuthenticatedPage />}>
            {authRoutes.map((route, index) => {
              let Layout = DefaultLayout
              const Page = route.component
              if (route.layout) Layout = route.layout
              else if (route.layout === null) {
                Layout = Fragment
              }
              return (
                <Route
                  key={index}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                  path={route.path}
                ></Route>
              )
            })}
          </Route>
        }
      </Routes>
    </Router>
  )
}

export default App
