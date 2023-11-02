import React, { useState } from 'react'
import "./style.css"



function Shoppingcart({CartItem,addToCar,decreaseQty,deleteItem,deleteAll}) {

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    if(CartItem.length !== 0 )
      setModal(!modal);
  };

  const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0).toFixed(2)
  return (
    <>
      <section className='cart-items'>
        <div className='container d_flex'>

          <div className='cart-details'>
            {CartItem.length === 0 && <h1 className='no-items product'>No Items are add in Cart</h1>}

            {CartItem.map((item) => {
              const productQty = (item.price * item.qty).toFixed(2)

              return (
                <div className='cart-list product d_flex' key={item.id}>
                  <div className='img'>
                    <img src={item.img} alt='' />
                  </div>
                  <div className='cart-details'>
                    <h3>{item.title}</h3>
                    <h4>
                      <span>${productQty}</span>
                    </h4>
                  </div>
                  <div className='cart-items-function'>
                    <div className='removeCart'>
                      <button className='remove' onClick={()=>deleteItem(item)}>
                        x
                      </button>
                    </div>
                    <div className='cartControl d_flex'>
                      <button className='incCart' onClick={() => addToCar(item)}>
                        +
                      </button>
                      <button style={{backgroundColor:'white'}}>{item.qty}</button>
                      <button className='desCart' onClick={() => decreaseQty(item)}>
                        -
                      </button>
                    </div>
                  </div>

                  {/* <div className='cart-item-price'></div> */}
                </div>
              
              )
            })}
            <button className='checkout' style={{marginTop:'1%'}} onClick={()=>deleteAll()}>
                <h1>removeall</h1>
              </button>
          </div>
            
          <div className='cart-total product'>
            <h2>Cart Summary</h2>
            <div className=' d_flex'>
              <h4>Total Price :</h4>
              <h3>${totalPrice}</h3>
            </div>
              <button className='checkout' onClick={()=>toggleModal()}>
                <h1>checkout</h1>
              </button>
          </div>
        </div>
      </section>
      {modal&&(
        <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          <div className='product-info' style={{textAlign:'center',justifyContent: 'center'}}>
            <h1>Are you sure?</h1>
            <button onClick={()=>{deleteAll(); toggleModal()}}>check</button>
          </div>
          <button className="close-modal" onClick={toggleModal}>X</button>
        </div>
      </div>
      )}
    </>
  )
}
export default Shoppingcart
