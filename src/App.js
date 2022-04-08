import React from "react";
import Particles from "react-tsparticles";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./Home";
import OwnerPage from "./OwnerPage";
import ManufacturerPage from "./ManufacturerPage";
import DistributorPage from "./DistributorPage";
import RetailerPage from "./RetailerPage";
import ConsumerPage from "./ConsumerPage";
import Header from "./Header";


function App() {
  const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (


    
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={
   
            <Home />}>
          </Route> 
          <Route path="/owner" element={<OwnerPage />}></Route>
          <Route path="/manufacturer" element={<ManufacturerPage />}></Route>
          <Route path="/distributor" element={<DistributorPage />}></Route>
          <Route path="/retailer" element={<RetailerPage />}></Route>
          <Route path="/consumer" element={<ConsumerPage />}></Route>
        </Routes>
      </Router>
      


    </div>

            
    
  );
}

export default App;
