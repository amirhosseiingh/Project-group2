import { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import Layout from "../layout/layout";
import { productsAPI } from "../../api/api";
import { MdDeleteForever, MdOutlineEditNote } from "react-icons/md";
import { useDisclosure } from "@chakra-ui/react";
import AddingModal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/reducers/productsReducer";
import { IProduct } from "../../interfaces/Iproduct";

export default function Products() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products);
  console.log("products", products);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const response = await productsAPI.getProducts();
      console.log("Products fetched successfully:", response.data.records);
      dispatch(setProducts(response.data.records));
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
      <div className="p-4 bg-custom-black w-full h-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-4 text-custom-white">
            Products
          </h1>
          <button
            onClick={onOpen}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
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
            <table className="bg-custom-gray">
              <thead className="h-10">
                <tr>
                  <th className="text-custom-white ">Image</th>
                  <th className="text-custom-white">Name</th>
                  <th className="text-custom-white">Price</th>
                  <th className="text-custom-white">Quantity</th>
                  <th className="text-custom-white">Rating</th>
                  <th className="text-custom-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: IProduct) => (
                  <tr
                    key={product.id}
                    className="bg-custom-white border border-custom-black  "
                  >
                    <td className="flex justify-center items-center">
                      <img
                        className=" min-h-20 w-20 p-2 rounded-lg"
                        src={product.imageURL}
                        alt="productImage"
                      />
                    </td>
                    <td className="text-center">{product.title}</td>
                    <td className="text-center">{product.price}</td>
                    <td className="text-center">{product.inventory}</td>
                    <td className="text-center">{product.rating}</td>
                    <td className="text-center ">
                      <button className="bg-red-700 rounded-lg p-2 mx-2">
                        <MdDeleteForever />
                      </button>

                      <button className="bg-yellow-500 rounded-lg p-2">
                        <MdOutlineEditNote />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <AddingModal onClose={onClose} isOpen={isOpen} />
    </Layout>
  );
}
