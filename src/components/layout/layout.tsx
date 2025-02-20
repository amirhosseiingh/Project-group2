import Sidebar from './sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen w-full">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4">{children}</div>
    </div>
  );
};

export default Layout;
