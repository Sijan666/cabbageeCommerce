import React, { Suspense, lazy } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import Loader from './components/Loader';
import RootLayouts from './components/layouts/RootLayouts';
import Shop from './components/pages/Shop';
import CategoryProducts from './components/pages/CategoryProducts';
import ProductDetails from './components/pages/ProductDetails';
import Quote from './components/pages/Quote';

const Home = lazy(() => import('./components/pages/Home'));
const About = lazy(() => import('./components/pages/About'));
const Error = lazy(() => import('./components/pages/Error'));
const Cart = lazy(() => import('./components/pages/Cart'));
const Wishlist = lazy(() => import('./components/pages/Wishlist'));

function App() {
  const lenisOptions = {
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 1,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<RootLayouts />}>
            <Route index element={<Home />} /> 
            <Route path="about" element={<About />} />
            <Route path="shop" element={<Shop />} />
            <Route path="category/:categoryName" element={<CategoryProducts />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="quote" element={<Quote />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </ReactLenis>
  );
}

export default App;