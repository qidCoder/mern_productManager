import logo from './logo.svg';
import './App.css';
import {Redirect, Router, Link} from "@reach/router";
import "bootstrap/dist/css/bootstrap.css";

// import components and views
import NotFound from "./views/NotFound";
import NewProduct from "./views/NewProduct";

function App() {
  return (
    <div className="container">
      {/* nav bar */}
      {/* <nav className="row my-5">
        <Link to="/products">
          <span className="btn btn-sm btn-outline-primary mr-1">Click to go to all Products</span>
        </Link>

        <Link to="/products/new">
          <span className="btn btn-sm btn-outline-primary mr-1">New Product</span>
        </Link>

      </nav> */}

      {/* routes */}
      <Router>
        {/* nothrow means not to throw an error when the redirect actually happens. Since we haven't set up /products yet, it will go to NotFound */}
        <Redirect from="/" to="/products" noThrow="true" />
        <NewProduct path="/products/new" />


        {/* if any URL visited is not found, it will defaul to the NotFound display */}
        <NotFound default />
      </Router>

    </div>
  );
}

export default App;
