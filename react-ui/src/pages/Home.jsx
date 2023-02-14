import axios from 'axios';
import { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuthContext(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

      useEffect(() => {
        getProducts();        
      },[]);
  
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



  return (
    <>
      <div>Welcome { user?.name} to home page</div>

      { loading && <p>...loading products</p>}
      { !loading &&
         products.map( product =>  (
          <article key={product.id} className="w-full px-6 py-6 mx-auto">
            <img src={product.image_url} />
            <h5>{product.title}</h5>
            <h5>$ {product.price}</h5>
          </article>
        ))
      }
    </>

  )
}

export default Home;