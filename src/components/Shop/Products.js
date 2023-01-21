import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 1,
    price: 6,
    title: 'My first book',
    description: 'first book I ever wrote!'
  },
  {
    id: 2,
    price: 5,
    title: 'My second book',
    description: 'my second book I wrote!'
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
      {DUMMY_PRODUCTS.map((product) => (
        //
        <ProductItem
          key={product.id}
          id = {product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />
      ))}
      </ul>
    </section>
  );
};

export default Products;
