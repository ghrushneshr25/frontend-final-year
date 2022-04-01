import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import './css/Home.css';
import bg from './images/background.jpg';

const Home = () => {
  return (
    <div className="home">
      <Header />  
      <img src={bg}
                      alt="banner.jpg"
                  className="home__banner" /> 
      <div className="home__mainoptions">
        
          <div className="home__row">        
            <Link to="/">Home</Link>                  
            <Link to="/owner">Owner</Link> 
            <Link to="/manufacturer">Manufacturer</Link>
          </div>
          <div className="home__row">
            <Link to="/distributor">Distributor</Link>       
            <Link to="/retailer">Retailer</Link>
            <Link to="/consumer">Consumer</Link>
          </div>
          </div>
    </div>
  );
};

export default Home;
