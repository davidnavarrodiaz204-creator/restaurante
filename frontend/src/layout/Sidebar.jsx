import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Productos", path: "/productos" },
    { name: "Ventas", path: "/ventas" },
    { name: "Usuarios", path: "/usuarios" }
  ];

  return (
    <div style={{
      width: "250px",
      backgroundColor: "#1e293b",
      color: "white",
      padding: "20px"
    }}>
      <h2 style={{ marginBottom: "30px" }}>
        🍽 Restaurante Admin
      </h2>

      {menu.map((item) => (
        <div key={item.path} style={{ marginBottom: "15px" }}>
          <Link 
            to={item.path}
            style={{
              textDecoration: "none",
              color: location.pathname === item.path ? "#38bdf8" : "white",
              fontWeight: location.pathname === item.path ? "bold" : "normal"
            }}
          >
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
