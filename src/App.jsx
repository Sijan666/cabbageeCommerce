import './App.css'
import Home from './components/pages/Home'
import { Routes , Route } from 'react-router-dom'
import RootLayouts from './components/layouts/RootLayouts'
import Error from './components/pages/Error'



function App () {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayouts />}>
          <Route index element={<Home/>} />
        </Route>
          <Route path="*" element={<Error/>} />
      </Routes>
    </>
  )
}

export default App


