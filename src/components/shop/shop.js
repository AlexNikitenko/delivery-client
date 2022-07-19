import './shop.css';
import { useEffect, useState, useRef } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;

console.log('BASE>>>', process.env);

function Shop() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  let activeStyle = {
    textDecoration: "underline",
  };


  const navigate = useNavigate();
  const navigateRef = useRef({ navigate });

  useEffect(() => {
    navigateRef.current = { navigate };
  }, [navigate]);

  useEffect(() => {
    fetch(`${BASE_URL}/stores`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('Result>>>', result);
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  useEffect(() => {
    if (items?.data?.length && navigateRef.current.navigate) {
      navigateRef.current.navigate(`/shop/${items.data[0]._id}`);
    }
  }, [items])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="Shop">
        <div className="shops-wrapper">
          <div className="shop-title">Shops:</div>
          <ul className="shops-list">
            {items.data.map(item => (
              <li key={item._id}>
                <NavLink to={`/shop/${item._id}`} className="button" 
                style={({ isActive }) =>
                isActive ? activeStyle : undefined}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <Outlet/>

      </div>
    );
  }
}

export default Shop;
