import Head from "next/head";

const ForgetPassword = () => {
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
                <img src="/password.jpg" alt="" className="w-full h-full" />
            </div>
            <div className="w-full sm:w-2/5 h-full flex justify-center items-center">
                <form action="/" className="w-4/5 h-max hide-container">
                    <header className="mb-5">
                        <h2>Forget Password</h2>
                    </header>
                    <div className="w-full h-max mb-2.5">
                        <div className="w-full h-max mb-4">
                            <label htmlFor="email" className="text-silver mb-4">Email Address:</label>
                            <input type="text" id="email" className="h-10 w-full border text-silver outline-none border-silver mb-1 rounded px-2 bg-transparent" />
                            <div className="text-danger"></div>
                        </div>
                    </div>
                    <div className="h-max w-full py-2 5">
                        <button className="w-full py-2 5 bg-btns text-text rounded">Submit</button>
                    </div>
                </form>
                <form action="/" className="w-4/5 h-max ">
                    <header className="mb-5">
                        <h2 className="text-center">Osemen Silas</h2>
                    </header>
                    <div className="w-full h-max mb-2.5">
                        <p htmlFor="email" className="text-silver w-full mb-4 label-center">Enter 6-digit code sent to your email address</p>
                        <div className="w-full h-max mb-4 flex justify-center">
                            <input type="text" id="email" className="text-center h-10 w-10 mx-2 border text-silver outline-none border-silver rounded px-2 bg-transparent" />
                            <input type="text" id="email" className="text-center h-10 w-10 mx-2 border text-silver outline-none border-silver rounded px-2 bg-transparent" />
                            <input type="text" id="email" className="text-center h-10 w-10 mx-2 border text-silver outline-none border-silver rounded px-2 bg-transparent" />
                            <input type="text" id="email" className="text-center h-10 w-10 mx-2 border text-silver outline-none border-silver rounded px-2 bg-transparent" />
                            <input type="text" id="email" className="text-center h-10 w-10 mx-2 border text-silver outline-none border-silver rounded px-2 bg-transparent" />
                            <input type="text" id="email" className="text-center h-10 w-10 mx-2 border text-silver outline-none border-silver rounded px-2 bg-transparent" />
                            <div className="text-danger"></div>
                        </div>
                    </div>
                </form>
                <form action="/" className="w-4/5 h-max hide-container">
                    <header className="mb-5">
                        <h2>Set New Password</h2>
                    </header>
                    <div className="w-full h-max mb-2.5">
                        <div className="w-full h-max mb-4">
                            <label htmlFor="password" className="text-silver mb-4">Password:</label>
                            <input type="password" id="password" className="h-10 w-full border text-silver outline-none border-silver mb-1 rounded px-2 bg-transparent" />
                            <div className="text-danger"></div>
                        </div>
                        <div className="w-full h-max mb-4">
                            <label htmlFor="confirm-password" className="text-silver mb-4">Confirm Password:</label>
                            <input type="password" id="confirm-password" className="h-10 w-full border text-silver outline-none border-silver mb-1 rounded px-2 bg-transparent" />
                            <div className="text-danger"></div>
                        </div>
                    </div>
                    <div className="h-max w-full py-2 5">
                        <button className="w-full py-2 5 bg-btns text-text rounded">Submit</button>
                    </div>
                </form>
            </div>
        </section>
        </>
     );
}
 
export default ForgetPassword;