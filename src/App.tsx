import { Route, Routes } from "react-router";
import LoginPage from "./pages/login/login";
import ProductsPage from "./pages/products/products_page";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  );
}
export default App;
