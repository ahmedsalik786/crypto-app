// import React from 'react'
// import "./style.css";
// import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';

// function BackToTop() {

//     let mybutton = document.getElementById("myBtn");

// // When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }

// // When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// }

//   return (
//     <div className='back-to-top-btn'  onClick={topFunction} id='myBtn'>
//         <ArrowUpwardRoundedIcon style={{color :"var(--blue)"}}/>
//     </div>
//   )
// }

// export default BackToTop


import React, { useState, useEffect } from 'react';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import './style.css';

function BackToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`back-to-top-btn ${showButton ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      <ArrowUpwardRoundedIcon style={{ color: 'var(--blue)' }} />
    </div>
  );
}

export default BackToTop;
