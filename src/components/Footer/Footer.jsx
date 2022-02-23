import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import tmtlogo from "./TMT-logo.png";
import { Link } from "react-router-dom";

const Footer = () => (
  <div className="footer-copyright text-white text-center py-3">
    &copy; {new Date().getFullYear()} Copyright: <a href="https://wildislandnft.com/" className='link-secondary'> WildIsland Game NFT</a>
    </div>
        
          
         
    
);

export default Footer;
