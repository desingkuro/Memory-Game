import { Outlet } from "react-router";
import ContainerLayout from "../../shared/components/ContainerLayout";
import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer";

export default function MainLayout() {
    return (
        <ContainerLayout>
            <Header tittle="Rick and Morty Memory Game" />
            <Outlet />
            <Footer />
        </ContainerLayout>
    )
}