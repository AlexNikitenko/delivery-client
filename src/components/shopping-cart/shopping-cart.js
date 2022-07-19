import './shopping-cart.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;

function ShoppingCart({ shoppingList, getQuantity, clearCart }) {
  console.log('Shopping list>>>', shoppingList);

  const [userInfoName, setUserInfoName] = useState([]);
  const [userInfoEmail, setUserInfoEmail] = useState([]);
  const [userInfoPhone, setUserInfoPhone] = useState([]);
  const [userInfoAddress, setUserInfoAddress] = useState([]);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const cartTotal = shoppingList.reduce((acc, curr) => {
    return acc + (curr.item.price * curr.quantity);
  }, 0);

  const getNewOrder = () => {
    const finalOrder = {};
    finalOrder.userName = userInfoName;
    finalOrder.userEmail = userInfoEmail;
    finalOrder.userPhone = userInfoPhone;
    finalOrder.userAdress = userInfoAddress;

    const itemsArr = shoppingList.map(el => {
      const obj = {};
      obj.name = el.item.name;
      obj.price = el.item.price;
      obj.quantity = +el.quantity;
      obj.currency = el.item.currency;
      return obj;
    })

    finalOrder.items = itemsArr;
    finalOrder.totalPrice = cartTotal;
    finalOrder.currency = shoppingList[0].item.currency;
    console.log("FINAL ORDER>>>", JSON.stringify(finalOrder));

    fetch(`${BASE_URL}/orders/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(finalOrder)
      })
      .then(data => data.json())
      .then(res => {
        if (!res.data.errors) {
          clearCart();
          setErrors({});
          return navigate('/shop');
        }
        setErrors(res.data.errors);
      })
      .catch(err => console.log('Error msg>>>', err.message));
    return finalOrder;
  }

  return (
    <div className="ShoppingCart">
      <div className="order-wrapper">
        <div className="user-info">
          <form className="user-form">
            <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" onChange={(e) => setUserInfoName(e.target.value)} />
              <div className="error-message">{errors.userName}</div>
            <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" onChange={(e) => setUserInfoEmail(e.target.value)} />
              <div className="error-message">{errors.userEmail}</div>
            <label htmlFor="phone">Phone:</label>
              <input type="tel" id="phone" name="phone" onChange={(e) => setUserInfoPhone(e.target.value)} />
              <div className="error-message">{errors.userPhone}</div>
            <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" onChange={(e) => setUserInfoAddress(e.target.value)} />
              <div className="error-message">{errors.userAdress}</div>
          </form>
        </div>
        <div className="cart-products">
          {shoppingList.map(item => {
            return (<ul className="cart-product" key={item.item._id}>
                    <li className="cart-product-image">
                      <figure className="image is-4by3">
                        <img src={item.item.imgUrl} alt=""/>
                      </figure>
                    </li>
                    <li className="cart-product-info">
                      <div className="cart-product-title">
                        {item.item.name}
                      </div>
                      <div className="cart-product-price">
                        {item.item.price} {item.item.currency}
                      </div>
                      <div>
                        <input className="cart-product-input" type="number" name="quantity" min="0" max="100" value={item.quantity} onChange={(e) => getQuantity(e.target.value, item.item._id)} ></input>
                      </div>
                    </li>
                  </ul>)
          })}
        </div>

      </div>
      <div className="order-result-list">
        <div className="total-price">
          Total Price: {cartTotal} {shoppingList[0].item.currency}
        </div>
        <div className="button-submit">
          <button className="button" onClick={getNewOrder} disabled={(!shoppingList.length)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
