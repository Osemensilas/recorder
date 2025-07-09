import Link from "next/link";
import Head from "next/head";

const SignUp = () => {
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
                <img src="/signup.jpg" alt="" className="w-full h-full" />
            </div>
            <div className="w-full sm:w-2/5 h-full flex justify-center items-center">
                <form action="/" className="w-4/5 h-max">
                    <header className="mb-2.5">
                        <h2>Sign Up</h2>
                    </header>
                    <div className="w-full h-max">
                        <div className="w-full h-max mb-2.5">
                            <label htmlFor="fullname" className="text-silver mb-4">Fullname:</label>
                            <input type="text" id="fullname" className="h-10 w-full border text-silver outline-none border-silver mb-1 rounded px-2 bg-transparent" />
                            <div className="text-danger"></div>
                        </div>
                        <div className="w-full h-max mb-2.5">
                            <label htmlFor="email" className="text-silver mb-4">Email Address:</label>
                            <input type="text" id="email" className="h-10 w-full border text-silver outline-none border-silver mb-1 rounded px-2 bg-transparent" />
                            <div className="text-danger"></div>
                        </div>
                        <div className="w-full h-max mb-2.5">
                            <label htmlFor="password" className="text-silver mb-4">Password:</label>
                            <input type="password" id="password" className="h-10 w-full border text-silver outline-none border-silver mb-1 rounded px-2 bg-transparent" />
                            <div className="text-danger"></div>
                        </div>
                        <div className="w-full h-max mb-2.5">
                            <label htmlFor="confirm-password" className="text-silver mb-4">Confirm Password:</label>
                            <input type="password" id="confirm-password" className="h-10 w-full border text-silver outline-none border-silver mb-1 rounded px-2 bg-transparent" />
                            <div className="text-danger"></div>
                        </div>
                        <div className="w-full h-max">
                            <input type="checkbox" className="mr-1" name="" id="checkbox" />
                            <label htmlFor="checkbox" className="text-silver">By checking this box, you agree to our <Link href="/" className="text-accent hover:underline transition duration-300 ease-in-out">terms and conditions</Link> and <Link href="/" className="text-accent hover:underline transition duration-300 ease-in-out">privacy policy</Link>.</label>
                        </div>
                    </div>
                    <div className="h-max w-full py-2 5">
                        <button className="w-full py-2 5 bg-btns text-text rounded">Sign Up</button>
                    </div>
                    <div className="text-silver">
                        Already have an account? <Link href="/sign-in" className="text-accent hover:underline transition duration-300 ease-in-out">Sign In</Link>
                    </div>
                </form>
            </div>
        </section>
        </>
     );
}
 
export default SignUp;