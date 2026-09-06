# Cabbage eCommerce - Premium Modern Web Application

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-Bear-brown?style=for-the-badge)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![DummyJSON](https://img.shields.io/badge/API-DummyJSON-blue?style=for-the-badge)

An ultra-premium, highly dynamic, and scalable front-end eCommerce web application. Designed with pixel-perfect minimalism and built using modern web technologies to ensure a seamless, high-performance user experience.

## Key Features

*   **Advanced State Management:** Powered by Zustand with `persist` middleware for seamless local storage synchronization of Cart, Wishlist, and User Sessions.
*   **Multi-Currency System:** Real-time dynamic price conversion across the entire platform (USD, BDT, EUR, INR) synced with the global store.
*   **Multi-Language Support (i18n):** Custom lightweight translation hook facilitating instant toggling between English and Bengali without page reloads.
*   **Hybrid Data Architecture:** Dynamically merges live REST API data (`DummyJSON`) with custom products generated from the Admin Panel.
*   **SEO-Friendly Routing:** Implementation of strict title-based slug routing (`/product/:slug`) instead of raw IDs for better accessibility and SEO.
*   **Dynamic Flash Sales:** 'Deal of the Day' component integrated with an automated, persistent 24-hour countdown mechanism.
*   **Advanced Filtering:** High-end mix-and-match category filtering utilizing `MixItUp` for smooth grid transitions.
*   **Premium UI/UX Animations:** Integrated `GSAP` (GreenSock) for scroll-triggered micro-interactions and `Swiper.js` for highly responsive, swipeable carousels.

## Tech Stack

*   **Frontend:** React.js (ES6+), React Router DOM v6
*   **State Management:** Zustand
*   **Styling & UI:** Tailwind CSS, CSS Modules, Glassmorphism Aesthetics
*   **Animations:** GSAP, Swiper.js, React Lenis (Smooth Scrolling)
*   **Data Fetching:** Axios
*   **Icons:** React Icons

## Core Folder Structure

```text
src/
├── assets/          # Static images and media files
├── components/      # Reusable UI components (Button, Container, Flex, Product Cards)
├── hooks/           # Custom React Hooks (e.g., useTranslation)
├── layouts/         # Major page sections (Banner, DailyDeals, BestSellers, etc.)
├── pages/           # Route-level components (Home, ProductDetails)
├── store/           # Zustand global state (useStore.js)
└── utils/           # Helper functions and localization dictionaries (translations.js)