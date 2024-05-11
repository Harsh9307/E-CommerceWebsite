import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cart-item";
import { Link } from "react-router-dom";

const cartItems = [

{
  productID : "akbsdhba",
  photo : "https://m.media-amazon.com/images/I/71YG+VrvrTL._SX466_.jpg",
  name:"Macbook",
  price:3000,
  quantity:4,
  stock:10,
}

];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18);
const shippingCharges = 200;
const total = subTotal+tax+shippingCharges;
const discount=400;

const Cart = () => {
  const [couponCode,setCouponCode] = useState("");
  const [isValidCouponCode,setIsValidCouponCode] = useState<boolean>(false);

  useEffect(()=>{
    const timeOutID = setTimeout(()=>{
      if( Math.random()>0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    },1000);

    return ()=>{
      clearTimeout(timeOutID);
      setIsValidCouponCode(false);
    }
  },[couponCode])



  return (
    <div className="cart">
      <main>

      {
        cartItems.length >0 ? (
          cartItems.map((i,idx)=><CartItem key={idx} cartItem={i}/>)
        ):(
          <h1>No Items Availalbe</h1>
        )
      }


      </main>
      <aside>
        <p>Subtotal: ${subTotal}</p>
        <p> Shipping Charges: ${shippingCharges}</p>
        <p> Tax: ${tax}</p>
        <p>
          Discount : <em> - {discount}$</em>
        </p>
        <p>
          <b>Total : {total}</b>
        </p>

        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e)=>setCouponCode(e.target.value)} 
        />

        {
          couponCode && 
          (
            isValidCouponCode? 
          (
          <span className="green">
            ${discount} off using the <code>{couponCode}</code>
            </span>
            ):
            (
            <span className="red">Invalid Coupon<VscError/></span>
          )
          )
        }

        {
          cartItems.length >0 && <Link to="/shipping">Checkout</Link>
        }

      </aside>

    </div>
  )
}

export default Cart