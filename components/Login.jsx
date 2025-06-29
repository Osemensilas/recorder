import Link from "next/link";

const LoginComponent = () => {
    return ( 
        <>
        <div className="custom-calc w-full flex items-center justify-center">
            <form action="/" className="h-max w-96 bg-text rounded px-5 z-20 relative">
                <header className="h-max w-full py-5">
                    <h3 className="text-center text-primary text-3xl">Sign In</h3>
                </header>
                <div className="w-full h-max mb-2.5">
                    <div className="w-full h-max mb-4 flex flex-col">
                        <label htmlFor="email" className="text-silver mb-4">Email Address:</label>
                        <input type="text" id="email" className="h-10 w-full border text-primary outline-none border-silver mb-1 rounded px-2 bg-transparent" />
                        <div className="text-danger"></div>
                    </div>
                    <div className="w-full h-max mb-4 flex flex-col">
                        <label htmlFor="password" className="text-silver mb-4">Password:</label>
                        <input type="password" id="password" className="h-10 w-full border text-primary outline-none border-silver mb-1 rounded px-2 bg-transparent" />
                        <div className="text-danger"></div>
                    </div>
                    <div className="text-silver">
                        Don't have an account? <Link href="/sign-up" className="text-accent hover:underline transition duration-300 ease-in-out">Sign Up</Link>
                    </div>
                </div>
                <div className="h-max w-full py-2 5">
                    <button className="w-full py-2 5 bg-btns text-text rounded">Sign In</button>
                </div>
            </form>
        </div>
        </>
     );
}
 
export default LoginComponent;