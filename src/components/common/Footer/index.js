import React from 'react'
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailIcon from '@material-ui/icons/Email';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import "./style.css"

function Footer() {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div className='footer'>
      <h2 className="logo" onClick={()=>topFunction()}>CryptoTracker</h2>
      <div className="social-links">
        <a href="https://www.facebook.com/sahihul.jami/" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
        <a href="https://www.linkedin.com/in/salik-ahmed-3ab120215/" target="_blank" rel="noopener noreferrer"><LinkedInIcon /></a>
        <a href="https://github.com/ahmedsalik786" target="_blank" rel="noopener noreferrer"><GitHubIcon /></a>
        <a href="https://www.facebook.com/sahihul.jami/" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
      </div>
    </div>
  )
}

export default Footer