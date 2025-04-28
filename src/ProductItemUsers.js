import React from 'react';

const ProductItemUser = ({ product, onAdd }) => {
  return (

    <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.images[0]} alt={product.name} />
      </div>
      <div className="mt-3 text-gray-500/60 text-sm">
        <p>{product.title}</p>

      </div>
      <div className="flex items-end justify-between mt-3">
        <p className="md:text-xl text-base font-medium text-indigo-500">
          ${product.price} <span className="text-gray-500/60 md:text-sm text-xs">${product.price}</span>
        </p>
        <div className="text-indigo-500">
          <p>{product.category.name}</p>

        </div>
      </div>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => onAdd(product)}
          className="w-32 py-2 active:scale-95 transition text-xs text-white rounded-lg bg-slate-700 mr-2 hover:bg-slate-800"
        >
          Add to Cart
        </button>
       
      </div>
    </div>
  );
};

export default ProductItemUser;
