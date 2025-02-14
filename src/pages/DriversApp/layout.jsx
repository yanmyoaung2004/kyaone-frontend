import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";


export const metadata = {
  title: "v0 App",
  description: "Created with v0",
};

export default function DriversLayout({ children }) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
