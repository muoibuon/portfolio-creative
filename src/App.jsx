import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import HologramBg from './components/HologramBg';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import AboutCourse from './components/AboutCourse';
import CourseProjects from './components/CourseProjects';
import Summary from './components/Summary';
import CourseFooter from './components/CourseFooter';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <HologramBg />
      <CustomCursor />
      <Navbar />
      <ScrollToTop />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/"          element={<AboutCourse />} />
          <Route path="/du-an"     element={<CourseProjects />} />
          <Route path="/loi-ket"   element={<Summary />} />
        </Routes>
      </main>
      <CourseFooter />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
