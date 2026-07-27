import React, { Suspense, lazy } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import Loader from './components/Loader';
import RootLayouts from './components/layouts/RootLayouts';
import Shop from './components/pages/Shop';
import CategoryProducts from './components/pages/CategoryProducts';

const Home = lazy(() => import('./components/pages/Home'));
const About = lazy(() => import('./components/pages/About'));
const Error = lazy(() => import('./components/pages/Error'));

function App() {
  const lenisOptions = {
    lerp: 0.08,
    smoothWheel: true,
    syncTouch: true,
    wheelMultiplier: 1,
    touchMultiplier: 2, 
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<RootLayouts />}>
            <Route index element={<Home />} /> 
            <Route path="about" element={<About />} />
            <Route path="shop" element={<Shop />} />
            <Route path="/category/:categoryName" element={<CategoryProducts />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </ReactLenis>
  );
}

export default App;