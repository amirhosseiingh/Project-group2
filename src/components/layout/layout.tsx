import Sidebar from "./sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen w-full">
      <div className="w-[10%]">
        <Sidebar />
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
