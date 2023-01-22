import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error from "./pages/Error";
import HomePage from './pages/HomePage';
import ProductDetail from "./pages/ProductDetail";
import ProductsPage from './pages/ProductsPage';
import RootLayout from "./pages/RootLayout";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <Error/>,
    children: [
      {
        index: true, // path: ''
        element: <HomePage/>
      },
      {
        path: 'products',
        element: <ProductsPage/>
      },
      {
        path: 'product/:id',
        element: <ProductDetail/>
      }

    ]
  },
  
]); 

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
