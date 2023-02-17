import axios from 'axios';
import { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuthContext(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState({
    total: 0,
    cartItems: [],
    cartProducts: [] 
  });

      useEffect(() => {
        getProducts(); 
        cart.total === 0 && getCartItems();       
      },[]);

      const getCartItems = async () => {
        try {
          await axios.get('api/cart').then(resp => {
            setCart({ ...cart, total: resp.data.total});
            setCart({ ...cart, cartItems: resp.data.cart-items});
            setCart({ ...cart, cartProducts: resp.data.products});
          });
          return null;
          
        } catch (error) {
          return error.message;
          
        }
      }
  
      const getProducts = async () => {
        try {
            setLoading(true);
            await axios.get('api/products').then(({data}) => {setLoading(false); console.log(data.data); setProducts(data.data);});
            return null;
        } catch (error) {
            setLoading(false)
            return error.message        
        }
      }


      const addToCart = (id) => { 
        const quantity = 1;      
        axios.post(`api/cart/add/${id}`, { quantity }).then(resp => console.log(resp)).catch( err => console.error(err));
        getCartItems();
        // alert('added')

      }



  return (
    <>
      <div>Welcome { user?.name} to home page</div>
      <p>Cart total: <h3>{cart.total}</h3></p>

      { loading && <p>...loading products</p>}
      { !loading &&
         products.map( product =>  (
          <article key={product.id} className="w-full px-6 py-6 mx-auto">
            <img src={product.image_url} />
            <h5>{product.title}</h5>
            <h5>$ {product.price}</h5>
            <button onClick={() => addToCart(product.id)}>Add to cart</button>
          </article>
        ))
      }
    </>

  )
}

export default Home;