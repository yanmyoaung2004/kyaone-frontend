import { Sidebar } from "../../components/warehouse/sidebar";
import { TopBar } from "../../components/warehouse/top-bar";


const WarehouseLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <TopBar />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

export default WarehouseLayout;