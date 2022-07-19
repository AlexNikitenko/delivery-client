import './app.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AppNavbar from '../app-navbar/app-navbar';
import Shop from '../shop/shop';
import ShoppingCart from '../shopping-cart/shopping-cart';
import PageNotFound from '../page-not-found/page-not-found';
import ShopProducts from '../shop-products/shop-products';
import { useState } from 'react';
import 'bulma/css/bulma.min.css';

function App() {
  const [cartProducts, setCartProducts] = useState([]);

  const addProductToCart = (item) => {
    if (!cartProducts.find(cartItem => cartItem.item._id === item._id )) {
      setCartProducts([...cartProducts, {item, quantity: 1}]);
    }  
  }

  const changeCartItemQuantity = (qty, id) => {
    const newArr = cartProducts.map(el => {
      if (el.item._id === id) {
        return { item: el.item, quantity: qty };
      }
      return el;
    });
    setCartProducts(newArr);
  }

  const clearCart = () => {
    setCartProducts([]);
  }

  return (
    <div className="App">
      <BrowserRouter>
      <AppNavbar/>
        <Routes>
          <Route exact path="shop" element={<Shop/>}>
            <Route exact path=":id" element={<ShopProducts addProducts={addProductToCart} shoppingList={cartProducts}/>}/>
          </Route>
          <Route exact path="shopping-cart" element={<ShoppingCart shoppingList={cartProducts} getQuantity={changeCartItemQuantity} clearCart={clearCart} />} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
