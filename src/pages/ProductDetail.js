import React from 'react'

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

function ProductDetail() {
    const params = useParams();
    
  return (
    <div>
        <h1>Product {params.id}</h1>
        <Link to="..">Back</Link>
    </div>
  )
}

export default ProductDetail