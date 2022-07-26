import { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";

const Cart = () => {
  let total = 0;
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  const [pricefetched, toggelpricefetched] = useState(false);

  useEffect(() => {
    if (!cart.items) {
      return;
    }
    if (pricefetched) {
      return;
    }

    fetch("/api/products/cart-items", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ids: Object.keys(cart.items) }),
    })
      .then((res) => res.json())
      .then((products) => {
        setProducts(products);
        toggelpricefetched(true);
      });
  }, [cart,pricefetched]);

  const getquan = (productId) => {
    return cart.items[productId];
  };

  const increment = (productId) => {
    const existingquan = cart.items[productId];
    const _cart = { ...cart };
    _cart.items[productId] = existingquan + 1;
    _cart.totalItems += 1;
    setCart(_cart);
  };

  const decrement = (productId) => {
    const existingquan = cart.items[productId];
    if (existingquan === 1) {
      return;
    }
    const _cart = { ...cart };
    _cart.items[productId] = existingquan - 1;
    _cart.totalItems -= 1;
    setCart(_cart);
  };

  const getsum = (productId, Price) => {
    const sum = Price * getquan(productId);
    total += sum;
    return sum;
  };

  const handleDelete = (productId) => {
    const _cart = {...cart};
    const qty = _cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItems-=qty;
    setCart(_cart);
    const updatedList = products.filter((product) => product._id !== productId);
    setProducts(updatedList);
  };

  const hadleOrderNow = () => {
    window.alert('Order placed succefully');
    setProducts([]);
    setCart({});
  };

  return products.length ? (
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="my-12 font-bold">Cart items</h1>
      <ul>
        {products.map((product) => {
          return (
            <li className="mb-12 key={product._id}">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img style={{ height: 80 }} src={product.image} alt="" />
                  <span className="font-bold ml-4 w-48">{product.name}</span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      decrement(product._id);
                    }}
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                  >
                    -
                  </button>
                  <b className="px-4">{getquan(product._id)}</b>
                  <button
                    onClick={() => {
                      increment(product._id);
                    }}
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                  >
                    +
                  </button>
                </div>
                <span>₹ {getsum(product._id, product.price)}</span>
                <button
                  onClick={() => {
                    handleDelete(product._id);
                  }}
                  className="bg-red-500 px-4 py-2 rounded-full leading-none text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <hr className="my-6" />
      <div className="text-right">
        <b>Grand Total:</b> ₹ {total}
      </div>
      <div className="text-right mt-6">
        <button onClick = {hadleOrderNow} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">
          Order Now
        </button>
      </div>
    </div>
  ) : (
    <img
      style={{ height: 600 }}
      className="mx-auto w-1/2 mt-8 "
      src="/images/empty-cart.png"
      alt="empty"
    />
  );
};

export default Cart;
