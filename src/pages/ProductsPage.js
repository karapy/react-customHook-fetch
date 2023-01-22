import React from "react";
import { Link } from "react-router-dom"; 


const DUMMY_PRODUCTS= [
  {
    id: 1,
    name: 'Iphone 11'
  },
  {
    id: 2,
    name: 'Iphone 14 pro max'
  },
  {
    id: 3,
    name: 'Galaxy S22 Ultra'
  },
]

function ProductsPage() {
  return (
    <>
      <h1>Product List</h1>
      <ul>
        {DUMMY_PRODUCTS.map((item)=> (
          <li key={item.id}><Link to={`/product/${item.name}`}>{item.name}</Link></li>
        ))}
      </ul>
      
    </>
  );
}

export default ProductsPage;
