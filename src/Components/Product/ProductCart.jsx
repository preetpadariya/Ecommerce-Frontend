import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/products/${product._id}`}>
        <img src={product.image} alt={product.title} className="w-full h-48 object-cover object-center" />
      </Link>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h2>
        <p className="text-gray-700 mb-2">${product.price}</p>
        <p className="text-gray-700 mb-4">Color: {product.color}</p>
        <Link
          to={`/products/${product._id}`}
          className="block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md text-sm text-center transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
