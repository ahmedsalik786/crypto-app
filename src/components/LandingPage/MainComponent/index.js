import React from 'react'
import "./style.css"
import Button from "../../common/Button"
import iphone from "../../../assets/iphone.png"
import gradient from "../../../assets/gradient.png"
import { RWebShare } from 'react-web-share'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function MainComponent() {
  return (
    <div   className='flex-info'>
      <div className="left-component">
        <motion.h1 
        className="track-crypto-heading"
        initial={{opacity:0,x:100,scale:0}}
        animate={{opacity:1,x:0,scale:1}}
        transition={{duration:1}}
        
        >
          Track Crypto</motion.h1>
        <motion.h1 className="real-time-heading"
        initial={{opacity:0,y:50}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.5,delay:0.5}}
        
        >Real Time.</motion.h1>
        <motion.p className="info-text"
        initial={{opacity:0,y:50}}
        animate={{opacity:1,y:0}}
        transition={{duration:1, delay:0.75}}
        >
          Track crypto through a public API in real time . Visit the DashBoard to do so !!!
        </motion.p>
        <motion.div className="btn-flex"
        initial={{opacity:0,x:50}}
        animate={{opacity:1,x:0}}
        transition={{duration:1,delay:1.5}}
        >
          <Link to="/dashboard">
          <Button text={"Dashboard"}
          onClick={()=>console.log("Dashboard")}
          />

          </Link>
          <RWebShare
          data={{
            text: "Blast Off into the World of Cryptos!",
            url: "https://chipper-platypus-576377.netlify.app/",
            title: "crypto-app.",
          }}
          onClick={() => console.log("shared successfully!")}
          >
              <Button text={"share"} outlined={true}/>
          </RWebShare>
        </motion.div>
      </div>
      <div className="phone-container">
        <motion.img src={iphone} alt=""  className='iphone'
          initial={{y:-10}}
          animate={{y:10}}
          transition={{duration:2,type:"smooth",repeatType:"mirror",repeat:Infinity}}
        />
        {/* <img src={phone} alt=""  className='phone'/> */}
        <img src={gradient} alt=""  className='gradient'/>
      </div>
    </div>
  )
}

export default MainComponent;