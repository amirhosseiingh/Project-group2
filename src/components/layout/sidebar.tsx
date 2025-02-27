import { useNavigate } from "react-router";

const Sidebar = () => {
  const navigate = useNavigate();
  let pathArray = window.location.pathname;
  console.log(pathArray)
  return (
    <div className=" h-full bg-slate-700 flex flex-col gap-2 p-5">
      <ul>
        <li
          onClick={() => navigate("/products")}
          className={`text-white hover:bg-slate-600 p-2 rounded-md cursor-pointer ${pathArray === "/products" ? "bg-slate-600" : "" }`}
        >
          products
        </li>
        <li
          onClick={() => navigate("/inventory")}
          className="text-white hover:bg-slate-600 p-2 rounded-md cursor-pointer"
        >
          inventory 
        </li>
        <li
          onClick={() => navigate("/users")}
          className="text-white hover:bg-slate-600 p-2 rounded-md cursor-pointer"
        >
          users
        </li>
        <li className="text-white hover:bg-slate-600 p-2 rounded-md cursor-pointer">
          orders
        </li>
        <li className="text-white hover:bg-slate-600 p-2 rounded-md cursor-pointer">
          logout
        </li>
        <li className="text-white hover:bg-slate-600 p-2 rounded-md cursor-pointer">
          profile
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
