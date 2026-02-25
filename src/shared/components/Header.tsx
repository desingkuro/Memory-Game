import logotipo from "../../assets/img/logo.png"

interface HeaderProp{
    tittle:string
}

export default function Header({tittle}:HeaderProp){
    return(
        <header 
            className="w-full h-auto !py-2 !px-4 flex flex-col justify-center items-center gap-2 !mb-2">
            <picture className="w-[350px] h-[160px] flex justify-center items-center">
                <img src={logotipo} alt="logotipo" className="h-full w-full object-fill" />
            </picture>
            <div className="w-auto bg-quaternary flex justify-center items-center rounded-3xl !py-1 !px-4">
                <p className="text-nowrap text-[14px] font-semibold">{tittle}</p>
            </div>
        </header>
    )
}