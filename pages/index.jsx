import Head from "next/head";
import { useState } from "react";
import LoginComponent from "@/components/Login";

export default function Home() {

  const userId = "user123";
  const [loginFormContainer, setLoginFormContainer] = useState("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30 hide-container");

  const tryClicked = () => {
    if (userId === ""){
      setLoginFormContainer("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30");
    }else{
      window.location.href = "/record-screen";
    }
  }

  const stopLogin = () => {
    setLoginFormContainer("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30 hide-container");
  }

  return (
    <>
    <Head>
      <title>Home Page - IRUAP TECH STUDIO LTD</title>
    </Head>
    <main id="main">
      <section id="hero" className="h-screen w-screen relative-position">
      <img src="/home-hero.png" className="absolute-position w-full h-full" />
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-1/2 h-max relative-position-clean z-10">
          <h2 className="text-center z-0">Capture What Matters. Edit with Ease. Share the impact</h2>
          <p className="text-center margin-b-20 large-text z-0">Record effortlessly, remove background noise like a pro, and edit with precision - all from your browser.</p>
          <div className="w-full h-max flex justify-center">
            <button className="btn text-center" onClick={tryClicked}>Try for Free</button>
          </div>
        </div>
      </div>
    </section>
    <section className={loginFormContainer}>
      <div className="w-full h-24 flex items-center justify-end px-10">
        <div onClick={stopLogin} className="h-10 w-10 relative cursor-pointer z-10">
          <span className="h-0.5 w-9 after:h-0.5 after:w-9 after:content-[''] bg-white after:bg-white absolute after:absolute rotate-45 after:rotate-90 top-1/2 after:top-0 left-0.5 after:left-0"></span>
        </div>
      </div>
      <LoginComponent />
    </section>
    </main>
    </>
  );
}
