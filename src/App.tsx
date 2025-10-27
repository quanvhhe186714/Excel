import React from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "./theme";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FormulaGenerator from "./components/FormulaGenerator";
import StepByStepGuide from "./components/StepByStepGuide";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DebugAPI from "./pages/DebugAPI";
import Download from "./pages/Download";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={
                <>
                  <HeroSection />
                  <Box id="formula-generator">
                    <FormulaGenerator />
                  </Box>
                  <Box id="step-by-step">
                    <StepByStepGuide />
                  </Box>
                  <FeaturesSection />
                </>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/download" element={<Download />} />
              <Route path="/debug" element={<DebugAPI />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;