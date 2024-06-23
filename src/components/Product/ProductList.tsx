import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../api/products";
import { Product } from "../../types/Product";
import { ProductItem } from "./ProductItem";
import { ProductEdit } from "./ProductEdit";
import { ProductLoader } from "./ProductLoader";
import { ProductAdd } from "./ProductAdd";
import { wait } from "../../utils/wait";
import { Helmet } from "react-helmet";
import { Navigation } from "../Navigation";

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const title = "Product List";

  wait(5000).then(() => setErrorMessage(""));

  useEffect(() => {
    setLoading(true);
    wait(500).then(() =>
      getProducts()
        .then((response: any) => {
          return response.message === "No products yet"
            ? setProducts([])
            : setProducts([...response]);
        })
        .catch(() => setErrorMessage("Error while fetching products"))
        .finally(() => setLoading(false))
    );
  }, []);

  const handleAddProduct = (newProduct: Product) => {
    createProduct(newProduct)
      .then((response) => {
        const newProductId = response._id;
        if (products.length === 0) {
          setProducts([{ ...newProduct, _id: newProductId }]);
          return;
        }
        setProducts([...products, { ...newProduct, _id: newProductId }]);
      })
      .catch(() => setErrorMessage("Error while adding products"))
      .finally(() => setEditingProduct(null));
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    updateProduct(updatedProduct)
      .then(() =>
        setProducts(
          products.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product
          )
        )
      )
      .catch(() => setErrorMessage("Error while updating products"))
      .finally(() => setEditingProduct(null));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((product) => product._id !== productId));
    deleteProduct(productId)
      .catch(() => setErrorMessage("Error while deleting products"))
      .finally(() => setEditingProduct(null));
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <section className="section">
        <div className="container">
          <Navigation title={title} />

          {errorMessage && (
            <div className="title has-text-danger">{errorMessage}</div>
          )}

          {loading && <ProductLoader />}

          <div className="columns is-multiline">
            {!loading && !errorMessage && (
              <ProductAdd onAdd={handleAddProduct} />
            )}

            {!loading &&
              !errorMessage &&
              products.length > 0 &&
              products.map((product, index) => (
                <ProductItem
                  key={`${product._id}-${index}`}
                  product={product}
                  index={index}
                  onEdit={() => setEditingProduct(product)}
                />
              ))}
          </div>

          {editingProduct && (
            <ProductEdit
              product={editingProduct}
              onUpdate={handleUpdateProduct}
              onCancel={() => setEditingProduct(null)}
              onDelete={handleDeleteProduct}
            />
          )}
        </div>
      </section>
    </>
  );
};
