export default function ContainerLayout({children}: {children: React.ReactNode}){
    return(
        <main className="min-h-dvh w-full bg-primary">
            {children}
        </main>
    )
}