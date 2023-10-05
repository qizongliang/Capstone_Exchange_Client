import React from "react"
import SlideCard from "./slidercard"

const SliderHome = () => {
  return (
    <>
    {/* <div style={{ marginTop: '50px', marginBottom: '50px' }}> */}
        <section className='homeSlide contentWidth' style={{padding:'0 250px'}}>
            <div className='container'>
                <SlideCard />
            </div>
        </section>
    {/* </div> */}
    </>
  )
}

export default SliderHome