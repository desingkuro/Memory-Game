export default function Footer(){
    const anoActual = new Date().getFullYear()
    return(
        <footer>
            <p>© {anoActual} Rick and Morty Memory. All rights reserved.</p>
        </footer>
    )
}