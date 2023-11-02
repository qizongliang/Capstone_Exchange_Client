import { Height } from "@mui/icons-material"
import { height } from "@mui/system"
import { current } from "@reduxjs/toolkit"
import React, { useState } from "react"



const ShopItem = ({shopItems,addToCar}) => {
  const [count, setCount] = useState(1)
  const increment=()=> {
    setCount(count + 1)
  }
  const decrement=()=>{
    setCount(count-1)
  }
  const reset=()=>{
    setCount(1)
  }
  const [modal, setModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null); // To keep track of the selected item
  
  const toggleModal = (item) => {
    setModal(!modal);
    setCurrentItem(item); // Set current item to the clicked one
  };
  
  return (
    <>
       {shopItems.map((shopItem, index) => {
        return(
          <div className='box' onClick={()=>toggleModal(shopItem)} key={index}>
              <div className='product mtop'>
                <div className='img'>
                  <img src={shopItem.img} alt='' />
                  <div className='product-like'>
                    <i className='fa-regular fa-heart'></i>
                  </div>
                </div>
                <div className='product-details'>
                  <div className='rate'>
                      <h3>{shopItem.title}</h3>
                  </div>
                  <div className='price'>
                    <h4>${shopItem.price}</h4>
                      <i className='fa fa-plus'></i>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        {modal && currentItem &&(
        <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          <img className="product-image" src={currentItem.img} alt="" />
          <div className="product-info">
            <h1 style={{color:'#003366'}}>{currentItem.title}</h1>
            <p>{currentItem.desp}</p>
            <div style={{marginTop:'25%'}}>
              <h2>
              Qty:
              <button className="add-to-cart-button" onClick={decrement}>-</button>
              {count}
              <button className="add-to-cart-button" onClick={increment}>+</button>
              </h2>
            </div>
            <div className="product-price">
              Price: ${currentItem.price}
            </div>
            <button className="add-to-cart" onClick={()=> {addToCar(currentItem,count); reset(); toggleModal()}}>Add To Cart</button>
            {console.log(currentItem)}
          </div>
          <button className="close-modal" onClick={toggleModal}>X</button>
        </div>
      </div>
      )}
      </>
    )
}

export default ShopItem