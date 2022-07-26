import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./Components/Navigation";
import Cart from "./pages/Cart";
import Singleproduct from "./pages/Singleproduct";
import Productspage from "./pages/Productspage";
import { CartContext } from "./pages/CartContext";
import { useEffect, useState } from "react";

const App = () => {
  const [cart,setCart] = useState({});

  useEffect(() => {
      const cart = window.localStorage.getItem('cart');
      setCart(JSON.parse(cart));
  },[]);

  useEffect(() => {
    window.localStorage.setItem('cart',JSON.stringify(cart));
  },[cart]);
  
  return (
    <>
      <Router>
        <CartContext.Provider value = {{cart, setCart}}>
          <Navigation />
          <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route path="/products" exact component={Productspage}></Route>
            <Route path="/products/:_id" component={Singleproduct}></Route>
            <Route path="/cart" component={Cart}></Route>
          </Switch>
        </CartContext.Provider>
      </Router>
    </>
  );
};
export default App;
