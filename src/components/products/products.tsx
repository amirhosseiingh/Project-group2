import { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import Layout from "../layout/layout";
import { productsAPI } from "../../api/api";
import { MdDeleteForever, MdOutlineEditNote } from "react-icons/md";
// import { Heading, HStack, Stack, Table, useDisclosure } from '@chakra-ui/react';
import AddingModal from "../modal/adding_modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  deleteProduct,
} from "../../redux/reducers/productsReducer";
import { IProduct } from "../../interfaces/Iproduct";
import EditModal from "../modal/edit_modal";
import axios from "axios";

import {
  HStack,
  Heading,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import { LinkButton } from "../ui/link-button";

export default function Products() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products);
  console.log("products", products);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://67c1934d61d8935867e38135.mockapi.io/shop"
      );
      console.log("Products fetched successfully:", response.data);
      dispatch(setProducts(response.data));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditProduct = (product: IProduct) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    if (selectedProduct) {
      onOpen();
    }
  };

  const handleAddProduct = () => {
    setIsEditMode(false);
    onOpen();
  };

  const handleDeleteProduct = async (id: string) => {
    const res = await axios.delete(
      `https://67c1934d61d8935867e38135.mockapi.io/shop/${id}`
    );
    if (res.status === 200) {
      dispatch(deleteProduct(id));
    }
    console.log(deleteProduct);
  };

  return (
    <Layout>
      {/* <div className="p-4 bg-custom-black w-full h-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-4 text-custom-white">
            Products
          </h1>
          <button
            onClick={handleAddProduct}
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
                      <button
                        onClick={() => handleDeleteProduct(product.id!)}
                        className="bg-red-700 rounded-lg p-2 mx-2"
                      >
                        <MdDeleteForever />
                      </button>

                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-yellow-500 rounded-lg p-2"
                      >
                        <MdOutlineEditNote />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div> */}
      <Stack width="full" gap="5">
        <div className="flex justify-between items-center">
          <Heading size="xl">Products</Heading>
          <LinkButton onClick={handleAddProduct}>Add Product</LinkButton>
        </div>

        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Quantity</Th>
              <Th isNumeric>Rating</Th>
              <Th isNumeric>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products?.map((item: IProduct) => (
              <Tr key={item.id}>
                <Td>
                  <img
                    className="min-h-20 w-20 p-2 rounded-lg"
                    src={item.imageURL}
                    alt={item.title}
                  />
                </Td>
                <Td>{item.title}</Td>
                <Td isNumeric>{item.price}</Td>
                <Td isNumeric>{item.inventory}</Td>
                <Td isNumeric>{item.rating}</Td>
                <Td isNumeric>
                  <button
                    onClick={() => handleDeleteProduct(item.id!)}
                    className="bg-red-700 rounded-lg p-2 mx-2"
                  >
                    <MdDeleteForever />
                  </button>
                  <button
                    onClick={() => handleEditProduct(item)}
                    className="bg-yellow-500 rounded-lg p-2"
                  >
                    <MdOutlineEditNote />
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <PaginationRoot
          count={products?.length || 0}
          pageSize={pageSize}
          page={page}
          onPageChange={setPage}
        />
      </Stack>
      {isEditMode ? (
        selectedProduct && (
          <EditModal
            onClose={onClose}
            isOpen={isOpen}
            product={selectedProduct}
          />
        )
      ) : (
        <AddingModal onClose={onClose} isOpen={isOpen} />
      )}
    </Layout>
  );
}
