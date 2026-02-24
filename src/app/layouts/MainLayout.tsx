import { Outlet } from "react-router";

export default function MainLayout(){
    return(
        <div className="w-full h-full">
            <header>
                <h1>Rick and Morty Memory</h1>
            </header>
            <Outlet/>
            <footer>
                <p>© 2026 Rick and Morty Memory. All rights reserved.</p>
            </footer>
        </div>
    )
}