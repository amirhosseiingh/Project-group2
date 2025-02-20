import { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import Layout from "../layout/layout";
import { productsAPI } from "../../api/api";

interface Product {
  id: string;
  title: string;
  price: number;
  imageURL: string;
  inventory: number;
  rating: number;
  createdAt: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const response = await productsAPI.getProducts();
      console.log("Products fetched successfully:", response.data.records);
      setProducts(response.data.records);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-4">Products</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Add Product
          </button>
        </div>
        {loading && <div>Loading products...</div>}

        {error && (
          <div className="text-red-500">Error loading products: {error}</div>
        )}

        {!loading && !error && products.length === 0 && (
          <div>No products found</div>
        )}

        {products.length > 0 && (
          <div className="flex flex-col">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 px-4 bg-slate-100 hover:bg-slate-200 p-2 rounded-md cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.imageURL}
                    alt={product.title}
                    className="w-1/12"
                  />
                  <h2>{product.title}</h2>
                  <p>{product.price}</p>
                  <p>{product.inventory}</p>
                  {Array.from({ length: product.rating }).map((_, index) => (
                    <AiFillStar key={index} className="w-4 h-4" />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
