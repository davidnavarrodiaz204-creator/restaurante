import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        
        <main style={{ 
          flex: 1, 
          padding: "20px",
          backgroundColor: "#f4f6f9"
        }}>
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;
