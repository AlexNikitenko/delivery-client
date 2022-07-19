import './shop-products.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;

function ShopProducts({ addProducts, shoppingList} ) {
  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  
  const { id } = useParams();

  console.log('shoppingList>>', shoppingList);
  
  useEffect(() => {
    fetch(`${BASE_URL}/stores/${id}/products`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('Result2>>>', result);
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [id])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="ShopProducts">
        <ul className="goods-list">
          {items.data.map(item => (
            <ul className="good" key={item._id}>
              <li className="product-image">
                <figure className="image is-4by3">
                  <img src={item.imgUrl} alt=""/>
                </figure>
              </li>
              <li className="good-info">
                <div className="good-title">
                  {item.name}
                </div>
                <div className="good-price">
                  {item.price} {item.currency}
                </div>
              </li>
              <li className="good-button">
                <button className="button" onClick={
                  () => addProducts(item)
                  }
                  disabled={shoppingList.find(el => el.item._id === item._id)}
                >
                  Add to Cart
                </button>
              </li>
            </ul>
          ))}
        </ul>
      </div>
    );
  }
}

export default ShopProducts;
