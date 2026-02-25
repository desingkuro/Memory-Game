export default function ContainerLayout({children}: {children: React.ReactNode}){
    return(
        <div className="h-full min-h-screen w-full min-w-screen bg-primary">
            {children}
        </div>
    )
}