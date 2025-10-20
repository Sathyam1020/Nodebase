import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AppHeader />
            <main className="flex-1">
                {children}
            </main>
        </>
    )
}

export default Layout; 