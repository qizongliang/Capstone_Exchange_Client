import React, { useState } from 'react'
import './style.css'
import axios from 'axios'

// addOrderToBackend
const addOrderToBackend = async (userData) => {
  const response = await axios.post('/api/orderHistory/addOrder', userData)
  console.log(response)
}
// add Seller OrderToBackend
const addSellOrderToBackend = async (sellData) => {
  const response = await axios.post('/api/sellHistory/addSellOrder', sellData)
  console.log(response)
}

function Shoppingcart({
  CartItem,
  addToCar,
  decreaseQty,
  deleteItem,
  deleteAll,
}) {
  function checkoutItemToBackend() {
    //
    const orderitemsidarr = []
    const orderitemsamtarr = []

    var email = JSON.parse(sessionStorage.getItem('user')).email
    var address = JSON.parse(sessionStorage.getItem('user')).address

    CartItem.map((item) => {
      orderitemsidarr.push(item.id)
      orderitemsamtarr.push(item.qty)
    })
    var orderitemsid = ''
    var orderitemsamt = ''

    for (let i = 0; i < orderitemsamtarr.length; i++) {
      if (i !== orderitemsamtarr.length - 1) {
        orderitemsamt = orderitemsamt + orderitemsamtarr[i] + ','
        orderitemsid = orderitemsid + orderitemsidarr[i] + ','
      } else {
        orderitemsamt = orderitemsamt + orderitemsamtarr[i]
        orderitemsid = orderitemsid + orderitemsidarr[i]
      }
    }

    const userData = {
      email: email,
      orderitemsid: orderitemsid,
      orderitemsamt: orderitemsamt,
    }
    const sellData = {
      orderitemsid: orderitemsid,
      orderitemsamt: orderitemsamt,
      address: address,
    }

    addOrderToBackend(userData)
    addSellOrderToBackend(sellData)
  }

  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    if (CartItem.length !== 0) setModal(!modal)
  }

  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0,
  ).toFixed(2)
  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {CartItem.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}

            {CartItem.map((item) => {
              const productQty = (item.price * item.qty).toFixed(2)

              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.title}</h3>
                    <h4>
                      <span>${productQty}</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button
                        className="remove"
                        onClick={() => deleteItem(item)}
                      >
                        x
                      </button>
                    </div>
                    <div className="cartControl d_flex">
                      <button
                        className="incCart"
                        onClick={() => addToCar(item)}
                      >
                        +
                      </button>
                      <button style={{ backgroundColor: 'white' }}>
                        {item.qty}
                      </button>
                      <button
                        className="desCart"
                        onClick={() => decreaseQty(item)}
                      >
                        -
                      </button>
                    </div>
                  </div>

                  {/* <div className='cart-item-price'></div> */}
                </div>
              )
            })}
            <button
              className="checkout"
              style={{ marginTop: '1%' }}
              onClick={() => deleteAll()}
            >
              <h1>removeall</h1>
            </button>
          </div>

          <div className="cart-total product">
            <h2>Cart Summary</h2>
            <div className=" d_flex">
              <h4>Total Price :</h4>
              <h3>${totalPrice}</h3>
            </div>
            <button className="checkout" onClick={() => toggleModal()}>
              <h1>checkout</h1>
            </button>
          </div>
        </div>
      </section>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div
              className="product-info"
              style={{ textAlign: 'center', justifyContent: 'center' }}
            >
              <h1>Are you sure?</h1>
              <button
                className="add-to-cart"
                style={{ marginLeft: '39%' }}
                onClick={() => {
                  checkoutItemToBackend()
                  deleteAll()
                  toggleModal()
                }}
              >
                CheckOut
              </button>
            </div>
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  )
}
export default Shoppingcart
