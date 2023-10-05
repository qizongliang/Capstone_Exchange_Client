import React from "react"
import "./home.css"
import SliderHome from "./slider"

const Home = () => {
  return (
    <>
      <section className='home'>
        <div className='container d_flex'>
            <SliderHome />
          </div>
      </section>
    </>
  )
}

export default Home