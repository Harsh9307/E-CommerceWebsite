import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";

const Home = () => {
  const addToCartHandler =()=>{

  }
  return (
    <div className="home">
      <section> s</section>
      <h1>
        Latest Product
        <Link to="/search" className="findmore">More</Link>
      </h1>
      <main>
        <ProductCard 
          productId="hjasda"
          photo="https://m.media-amazon.com/images/I/71YG+VrvrTL._SX466_.jpg" 
          name="Macbook" 
          price={465} 
          stock={5} 
          handler={addToCartHandler} />
      </main>
    </div>
  )
}

export default Home;