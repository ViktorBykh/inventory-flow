import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
};

export const Navigation: React.FC<Props> = ({ title }) => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleGoToCategories = () => {
    navigate("/categories");
  };

  const handleGoToOrders = () => {
    navigate("/orders");
  };

  const handleGoToProducts = () => {
    navigate("/products");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="is-flex is-justify-content-space-between">
      <h1 className="title">{title}</h1>
      <div className="buttons" style={{ marginBottom: "10px" }}>
        {title !== "Category List" && userRole === "Admin" && (
          <button className="button is-link" onClick={handleGoToCategories}>
            Categories
          </button>
        )}
        {title !== "Order List" && (
          <button className="button is-link" onClick={handleGoToOrders}>
            Orders
          </button>
        )}
        {title !== "Product List" && (
          <button className="button is-link" onClick={handleGoToProducts}>
            Products
          </button>
        )}
        <button className="button is-link" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
