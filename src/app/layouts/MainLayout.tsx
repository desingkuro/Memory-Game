import { Outlet } from "react-router";
import ContainerLayout from "../../shared/components/ContainerLayout";
import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer";

export default function MainLayout() {
    return (
        <ContainerLayout>
            <Header tittle="Juego de memoria" />
            <Outlet />
            <Footer />
        </ContainerLayout>
    )
}