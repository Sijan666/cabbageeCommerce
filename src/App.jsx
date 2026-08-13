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
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import Blogs from './components/pages/Blogs';
import BlogDetails from './components/pages/BlogDetails';
import Contact from './components/pages/Contact';
import BackToTop from './components/BackToTop'; 
import FloatingChat from './components/FloatingChat';
import ToastContainer from './components/Toast';
import Success from './components/pages/Success';
import Receipt from './components/pages/Receipt';

{/* lazy loaded components */}
const Home = lazy(() => import('./components/pages/Home'));
const About = lazy(() => import('./components/pages/About'));
const Error = lazy(() => import('./components/pages/Error'));
const Cart = lazy(() => import('./components/pages/Cart'));
const Wishlist = lazy(() => import('./components/pages/Wishlist'));
const Checkout = lazy(() => import('./components/pages/Checkout'));
const AdminDashboard = lazy(() => import('./components/pages/AdminDashboard'));

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
          {/* main website layout with navbar & footer */}
          <Route path="/" element={<RootLayouts />}>
            <Route index element={<Home />} /> 
            <Route path="about" element={<About />} />
            <Route path="shop" element={<Shop />} />
            <Route path="category/:categoryName" element={<CategoryProducts />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="quote" element={<Quote />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="contact" element={<Contact />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="success" element={<Success />} />
            <Route path="receipt" element={<Receipt />} />
          </Route>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
      <BackToTop />
      <FloatingChat />
      <ToastContainer />
    </ReactLenis>
  );
}

export default App;