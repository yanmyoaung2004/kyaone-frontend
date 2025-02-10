import {AppSidebar} from "../components/Sales/AppSidebar";
import Header from "../components/Sales/Header";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


const Layout = ({ children }) => {
  return (
    <>
        <SidebarProvider>
          <AppSidebar />
       
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            {children}
          </main>
      </div>
      <Toaster />
    </SidebarProvider>
    </>
  );
};

export default Layout;
