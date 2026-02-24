export default function Login() {
    return (
        <div className="h-[100dvh] w-full flex items-center justify-center bg-primary">
            <form action="" className=" w-[612px] h-[657px] bg-secondary rounded-xl flex flex-col items-center justify-center gap-4">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}