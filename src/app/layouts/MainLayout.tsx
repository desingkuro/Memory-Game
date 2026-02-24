import { Outlet } from "react-router";
import ContainerLayout from "../../shared/components/ContainerLayout";

export default function MainLayout(){
    return(
        <ContainerLayout>
            <header>
                <h1>Rick and Morty Memory</h1>
            </header>
            <Outlet/>
            <footer>
                <p>© 2026 Rick and Morty Memory. All rights reserved.</p>
            </footer>
        </ContainerLayout>
    )
}