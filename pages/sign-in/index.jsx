import Link from "next/link";
import Head from "next/head";

const Signin = () => {
    return ( 
        <>
        <Head>
            <title>Sign In - Ossil Tech LTD</title>
            <style>{`
                #header,
                #footer {
                    display: none;
                }
            `}</style>
        </Head>
        <section className="w-screen h-screen flex">
            <div className="hidden sm:block w-3/5 h-full">
                <img src="/signin.jpg" alt="" className="w-full h-full" />
            </div>
            <div className="w-full sm:w-2/5 h-full flex justify-center items-center">
                <form action="/" className="w-4/5 h-max">
                    <header className="mb-5">
                        <h2>Sign In</h2>
                    </header>
                    <div className="w-full h-max mb-2.5">
                        <div className="w-full h-max mb-4">
                            <label htmlFor="email" className="text-silver mb-4">Email Address:</label>
                            <input type="text" id="email" className="h-10 w-full border text-silver outline-none border-silver mb-1 rounded px-2 bg-transparent" />
                            <div className="text-danger"></div>
                        </div>
                        <div className="w-full h-max mb-4">
                            <label htmlFor="password" className="text-silver mb-4">Password:</label>
                            <input type="password" id="password" className="h-10 w-full border text-silver outline-none border-silver mb-1 rounded px-2 bg-transparent" />
                            <div className="text-danger"></div>
                        </div>
                        <div className="text-silver">
                            Don't have an account? <Link href="/sign-up" className="text-accent hover:underline transition duration-300 ease-in-out">Sign Up</Link>
                        </div>
                    </div>
                    <div className="h-max w-full py-2 5">
                        <button className="w-full py-2 5 bg-btns text-text rounded">Sign In</button>
                    </div>
                    <div className="w-full h-max-my-2">
                        <Link href="/forget-password" className="text-accent hover:underline transition duration-300 ease-in-out">Forget Password?</Link>
                    </div>
                </form>
            </div>
        </section>
        </>
     );
}
 
export default Signin;