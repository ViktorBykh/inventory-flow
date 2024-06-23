import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { OrderList } from "./components/Order/OrderList";
import { ProductList } from "./components/Product/ProductList";
import { CategoryList } from "./components/Category/CategoryList";
import { LoginForm } from "./components/LoginForm";

export const App = () => {
  const userRole = localStorage.getItem("role");
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/categories" Component={CategoryList} />
        {userRole === "Admin" && <Route path="/orders" Component={OrderList} />}
        <Route path="/products" Component={ProductList} />
      </Routes>
    </Router>
  );
};
