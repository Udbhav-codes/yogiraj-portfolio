import { useCallback, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import StudioLogin from "./pages/studio/StudioLogin";
import StudioDashboard from "./pages/studio/StudioDashboard";

function PublicSite() {
  const [loading, setLoading] = useState(true);
  const handleLoaderDone = useCallback(() => setLoading(false), []);

  return (
    <>
      <Cursor />
      {loading && <Loader onDone={handleLoaderDone} />}
      <div
        className="cursor-none-fine"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.6s ease" }}
      >
        <div className="grain" />
        <div className="vignette" />
        <SmoothScroll>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </SmoothScroll>
      </div>
    </>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/studio" element={<StudioLogin />} />
              <Route
                path="/studio/dashboard"
                element={
                  <ProtectedRoute>
                    <StudioDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/*" element={<PublicSite />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
