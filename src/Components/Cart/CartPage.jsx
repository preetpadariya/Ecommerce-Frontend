import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeFromCart, updateCartQuantity } from '../../Actions/Cart'; // Adjust path as per your project structure
import { useNavigate } from 'react-router-dom';
import Loading from '../Loader/Loading'; 

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [dispatch, isAuthenticated]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateCartQuantity(productId, quantity));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-extrabold text-white mb-12 text-center">Shopping Cart</h1>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-100 bg-red-600 p-4 rounded-md">{error}</div>
        ) : cartItems.length === 0 ? (
          <div className="text-center text-gray-200">Your cart is currently empty.</div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6">
                <img src={item.image} alt={item.title} className="w-32 h-32 object-cover rounded-lg mr-0 md:mr-6 mb-4 md:mb-0" />
                <div className="flex-grow">
                  <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-gray-700 mb-2">Price: ${item.price.toFixed(2)}</p>
                  <div className="flex items-center mb-4">
                    <label htmlFor={`quantity-${item.productId}`} className="text-gray-700 mr-2">Quantity:</label>
                    <input
                      type="number"
                      id={`quantity-${item.productId}`}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.productId, Number(e.target.value))}
                      className="border rounded-lg w-16 text-center py-1"
                      min="1"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900 mb-2">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => handleRemoveFromCart(item.productId)}
                    className="text-sm text-red-600 hover:text-red-800 transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="mt-10">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md ml-auto">
              <h2 className="text-2xl font-semibold mb-4">Total Price: ${calculateTotalPrice().toFixed(2)}</h2>
              <button
                onClick={handleCheckout}
                className="w-full bg-purple-500 text-white font-bold py-2 rounded-lg hover:bg-purple-600 transition duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
