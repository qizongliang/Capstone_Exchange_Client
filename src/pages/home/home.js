import React from "react"
import "./home.css"
import SliderHome from "./slider"
import TopCate from "../../components/top/TopCate"
import ADS from "../../components/ads/ads"
import Shop from "../../components/shop/Shop"

const Home = ({shopItems,addToCar}) => {
  return (
    <>
      <section className='home'>
        <div className='container d_flex'>
          <SliderHome/>
        </div>
      </section>
      <TopCate/>
      <ADS/>
      <Shop shopItems={shopItems} addToCar={addToCar}/>
    </>
  )
}

export default Home