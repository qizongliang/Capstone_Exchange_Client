import React from "react"
import Sdata from "./sliderdata"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const SlideCard = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        
      }
      return (
        <>
          <Slider {...settings}>
            {Sdata.map((value, index) => {
              return (
                <>
                  <div className='box d_flex top' key={index}>
                    <div className='left'>
                      <h1>{value.title}</h1>
                      <p>{value.desc}</p>
                      <button className='btn-primary'>Visit</button>
                    </div>
                    <div className='right'>
                      <img src={value.img} alt='' style={{height:'500px',width:'750px'}}/>
                    </div>
                  </div>
                </>
              )
            })}
          </Slider>
        </>
      )
}

export default SlideCard