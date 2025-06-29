import { useRef, useState } from "react";
import LoginComponent from "@/components/Login";
import PremiumComponent from "@/components/Premium";

const Presentation = () => {

    const userId = "";
    const premiumId = "52436";
    const [signinContainer, setSigninContainer] = useState("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30 hidden");
    const [presentBtnClicked, setPresentBtnClicked] = useState();
    

    let recordedChunksRef = useRef([]);

    const startPresentation = () => {
        let user;

        if (userId === ""){
            setSigninContainer("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30")
            return;
        }else{
            setSigninContainer("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30 hidden");
        }
    }

    const signinCancel = () => {
        setSigninContainer("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30 hidden")
    }

    return ( 
        <>
        <section className="h-[calc(100vh-100px)] w-screen">
            <canvas className="h-screen w-screen fixed top-0 left-0 border border-primary -z-10"></canvas>
            <div id="video-container" className="relative w-full h-full bg-[url(/presentation.jpg)] bg-cover bg-center flex items-end justify-center">
                <div className="hidden w-[70%] h-full items-center justify-center">
                    <video id="screenPreview" className="w-[95%] h-[95%]" autoPlay muted></video>
                </div>
                <div className="hidden w-[30%] h-full">
                    <video id="camPreview" className="w-full h-full" autoPlay></video>
                </div>
                <button id="screenRecordBtn" onClick={startPresentation} className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4  py-3 px-6 mr-3 bg-accent rounded-full flex items-center justify-center"><i className="fa fa-play mr-1 text-danger"></i><p className="text-primary">Start Presentation</p></button>
                <div id="record-contro-container" className="w-full h-1/5 flex items-center justify-center">
                    <div className="w-max h-max py-3 px-10 rounded-full items-center justify-center relative  z-50 hidden">
                        <button id="stopRecordBtn" className="py-3 px-6 mr-3 bg-accent rounded-full flex items-center justify-center cursor-pointer relative z-50"><i className="fa fa-stop mr-1 text-danger"></i><p className="text-primary">Stop Recording</p></button>
                        <button id="audioBtn" className="ml-3 bg-accent h-10 w-10 rounded-full flex items-center justify-center relative z-50"><i className="fa fa-microphone text-danger text-2xl"></i></button>
                    </div>
                </div>
            </div>
        </section>
        <section className={signinContainer}>
            <div className="w-full h-24 flex items-center justify-end px-10">
                <div onClick={signinCancel} className="h-10 w-10 relative cursor-pointer z-10">
                    <span className="h-0.5 w-9 after:h-0.5 after:w-9 after:content-[''] bg-white after:bg-white absolute after:absolute rotate-45 after:rotate-90 top-1/2 after:top-0 left-0.5 after:left-0"></span>
                </div>
            </div>
            <LoginComponent />
        </section>
        <section id="premium-container" className="w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30 premium-hide">
            <div className="w-full h-24 flex items-center justify-end px-10">
                <div className="h-10 w-10 relative cursor-pointer z-10">
                    <span className="h-0.5 w-9 after:h-0.5 after:w-9 after:content-[''] bg-white after:bg-white absolute after:absolute rotate-45 after:rotate-90 top-1/2 after:top-0 left-0.5 after:left-0"></span>
                </div>
            </div>
            <PremiumComponent />            
        </section>
        </>
     );
}
 
export default Presentation;