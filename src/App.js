import './App.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Maincontaint/Home/Home";
import Footer from "./Components/Footer/Footer";

import About from "./Components/Maincontaint/About/About";
import Certificates from "./Components/Maincontaint/Certificates/Certificates";
import Contacts from "./Components/Maincontaint/Contacts/Contacts";
import Domain from "./Components/Maincontaint/Domain/Domain";
import Projects from "./Components/Maincontaint/Projects/Projects";
import Skills from "./Components/Maincontaint/Skills/Skills";

import { HashRouter, Routes, Route } from "react-router-dom";

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
    
    {/* basename used here to deal with BrowserRouter routing but it not able to deal problem of refreshpage on git pages */}
    {/* <BrowserRouter basename="/PortfolioSanjeevSingh"></BrowserRouter> */}

    {/* hashrouter can easily deal routing as well as page refreshing */}
    <HashRouter>
      <ScrollToTop />
      <Navbar/>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="certificates" element={<Certificates/>}/>
          <Route path="contacts" element={<Contacts/>}/>
          <Route path="domain" element={<Domain/>}/>
          <Route path="projects" element={<Projects/>}/>
          {/* <Route path="skills" element={<Skills/>} /> */}
        </Routes>
      </main>
      <Footer/>
    </HashRouter>  
      
    </div>
  );
}

export default App;
