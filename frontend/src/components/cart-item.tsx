import { Link } from "react-router-dom";

type CartItemProps ={
    cartItem : any
};
const CartItem = ({cartItem}:CartItemProps) => {
    const [photo,productID,name,price,quantity,stock]=cartItem;
  return (
    <div className="cart-item">
       <img src={photo} alt=""/> 
       <article>
        <Link to={`/product/${productID}`}> {name}</Link>
        <span>${price}</span>
       </article>
       
    </div>
  )
}

export default CartItem;