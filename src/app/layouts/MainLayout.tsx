import { Outlet } from "react-router";
import ContainerLayout from "../../shared/components/ContainerLayout";
import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer";
import useAuth from "../../shared/hooks/useAuth";

export default function MainLayout() {
    const { logout } = useAuth();
    return (
        <ContainerLayout>
            <Header tittle="Rick and Morty Memory Game" logout={logout} />
            <Outlet />
            <Footer />
        </ContainerLayout>
    )
}