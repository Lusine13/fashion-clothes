import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <header>
        <h2>Fashion Clothes</h2>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
