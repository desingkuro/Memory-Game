export default function ContainerLayout({children}: {children: React.ReactNode}){
    return(
        <main className="h-full w-full bg-primary">
            {children}
        </main>
    )
}