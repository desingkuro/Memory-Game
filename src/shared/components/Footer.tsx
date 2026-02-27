export default function Footer(){
    const anoActual = new Date().getFullYear()
    return(
        <footer className="w-full xl:h-[300px] h-[150px] flex items-center justify-center xl:!mt-20 !mt-5">
            <p className="text-center xl:text-2xl text-[1rem] text-gray-500">© {anoActual} Rick and Morty Memory. All rights reserved.</p>
        </footer>
    )
}