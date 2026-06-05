import './App.css'
import Home from './components/pages/Home'
import { Routes , Route } from 'react-router-dom'
import RootLayouts from './components/layouts/RootLayouts'
import Error from './components/pages/Error'

import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

function App () {

  const lenisOptions = {
    lerp: 0.08,
    smoothWheel: true,
    syncTouch: true,
    wheelMultiplier: 1,
    touchMultiplier: 2, 
  }

  return (
    <>
      <ReactLenis root options={lenisOptions}>
        <Routes>
          <Route path="/" element={<RootLayouts />}>
            <Route index element={<Home/>} />
          </Route>
          <Route path="*" element={<Error/>} />
        </Routes>
      </ReactLenis>
    </>
  )
}

export default App