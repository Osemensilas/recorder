import { useRef, useState, useEffect } from "react";
import LoginComponent from "@/components/Login";
import PremiumComponent from "@/components/Premium";
import Head from "next/head";

const Presentation = () => {

    const userId = "5364";
    const premiumId = "52436";
    const [signinContainer, setSigninContainer] = useState("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30 hidden");
    const [presentBtnClicked, setPresentBtnClicked] = useState(false);
    const [recodingStarted, setRecordingStarted] = useState(false);
    const [recodingStopped, setRecordingStopped] = useState(false);
    const [micCapture, setMicCapture] = useState(true);
    const [micText, setMicText] = useState("ON");
    const [shareScreen, setShareScreen] = useState(false);
    const [shareScreenStarted, setShareScreenStarted] = useState(false);
    const [shareScreenText, setShareScreenText] = useState("Share Screen");
    const [recordedVideo, setRecordedVideo] = useState(null);
    

    const recordedChunksRef = useRef([]);
    const camStreamRef = useRef(null);
    const camPreviewRef = useRef(null);
    const micStreamRef = useRef(null);
    const audioStreamRef = useRef(null);
    const shareScreenRef = useRef(null);
    const genScreenPreview = useRef(null);
    const screenStreamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const canvasRef = useRef(null);

    const startPresentation = () => {
        if (userId === "") {
            setSigninContainer("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30");
            return;
        } else {
            setSigninContainer("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30 hidden");
            setPresentBtnClicked(true); // <-- Add this line
            setRecordingStarted(true);
        }
    };

    const micClicked = () => {
        if (micCapture === true){
            setMicCapture(false);
            setMicText("OFF");
        }else{
            setMicCapture(true);
            setMicText("ON")
        }
    }

    const shareClicked = () => {
        if (shareScreen === true){
            setShareScreen(false);
        }else{
            setShareScreen(true);
            setShareScreenText("Share Screen");
        }
    }

    const stopRecording = () => {
        if (recodingStopped === true){
            setRecordingStopped(false);
        }else{
            setRecordingStopped(true);
        }
    }

    useEffect(() => {
        let animationId;
        const draw = () => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (!canvas || !ctx) return;

            // Draw screen as background if sharing, else clear
            if (shareScreen && shareScreenRef.current?.srcObject) {
            ctx.drawImage(shareScreenRef.current, 0, 0, canvas.width, canvas.height);
            } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            }

            // Draw camera as PiP (bottom-right corner)
            if (camPreviewRef.current?.srcObject) {
            ctx.drawImage(camPreviewRef.current, canvas.width - 320, canvas.height - 240, 320, 240);
            }

            animationId = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(animationId);
    }, [shareScreen, presentBtnClicked]);

    useEffect(() => {
        const allRecords = async () => {
            recordedChunksRef.current = [];
            try {
                // Ensure camera and screen streams are started as you already do

                // Start camera stream if not already started
                if (recodingStarted === true && shareScreen === false){
                    const camRecorder = await navigator.mediaDevices.getUserMedia({video: true});
                    camStreamRef.current = camRecorder;
                    if (camPreviewRef.current){
                        camPreviewRef.current.srcObject = camRecorder;
                    }
                }

                if (shareScreen === true){
                    const screenRecorder = await navigator.mediaDevices.getDisplayMedia({video: true});
                    screenStreamRef.current = screenRecorder;
                    if (shareScreenRef.current){
                        shareScreenRef.current.srcObject = screenRecorder;
                    }
                }

                // Start screen stream if sharing and not already started
                if (shareScreen && !screenStreamRef.current) {
                    const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                    screenStreamRef.current = screenStream;
                    if (shareScreenRef.current) {
                        shareScreenRef.current.srcObject = screenStream;
                        shareScreenRef.current.play();
                    }
                }

                // Start drawing to canvas (handled by the effect above)

                // 1. Get canvas stream
                const canvas = canvasRef.current;
                const canvasStream = canvas.captureStream(30); // 30 FPS

                // 2. Add mic audio track if available
                if (micCapture) {
                    const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    audioStreamRef.current = micStream;
                    micStream.getAudioTracks().forEach(track => canvasStream.addTrack(track));
                }

                // 3. Record the canvas stream
                const mediaRecorder = new MediaRecorder(canvasStream, { mimeType: "video/webm" });
                mediaRecorderRef.current = mediaRecorder;

                mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) recordedChunksRef.current.push(e.data);
                };

                mediaRecorder.onstop = () => {
                if (recordedVideo) {
                    URL.revokeObjectURL(recordedVideo);
                }
                
                const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
                const url = URL.createObjectURL(blob);
                setRecordedVideo(url);
                downloadRecording(url);
                };

                mediaRecorder.start();
            } catch (error) {
                console.log("Error trying to record: ", error);
                setShareScreenStarted(false);
                setShareScreen(false);
                setShareScreenText("Share Screen");
            }
        };

        if (recodingStarted === true){
            allRecords();
        }
    },[recodingStarted, micCapture, shareScreen])


    useEffect(() => {
        if (recodingStopped === true) {
            mediaRecorderRef.current?.stop();

            const stopTracks = (streamRef) => {
                if (streamRef?.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                    streamRef.current = null;
                }
            };

            stopTracks(camStreamRef);
            stopTracks(screenStreamRef);
            stopTracks(audioStreamRef);

            setRecordingStarted(false);      // <-- Reset for next session
            setRecordingStopped(false);      // <-- Reset for next session
            setPresentBtnClicked(false);     // <-- Optionally reset UI
        }
    }, [recodingStopped]);

    const downloadRecording = (url) => {
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'recording.webm';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const signinCancel = () => {
        setSigninContainer("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30 hidden")
    }

    return ( 
        <>
        <Head>
            <title>Record Screen - IRUAP TECH STUDIO LTD</title>
            {presentBtnClicked && (
                <style>{`
                    #header, #footer {
                        display: none !important;
                    }
                `}</style>
            )}
        </Head>
        <section className={`w-screen
            ${presentBtnClicked ? "h-screen" : "h-[calc(100vh-100px)]"}
            `}>
                <canvas ref={canvasRef} width={1280} height={720} style={{ display: "none" }} />
            <video id="genScreenPreview" ref={genScreenPreview} className="w-full h-full absolute hidden" autoPlay muted></video>
            <div id="video-container" className={`relative w-full h-full items-end justify-center
                ${presentBtnClicked ? "" : "bg-[url(/presentation.jpg)] bg-cover bg-center"}
                `}>
                <div className={`h-[85%]
                    ${ shareScreen ? "w-[100%] flex items-center justify-center transition-all duration-500" : "hidden"}
                    `}>
                    <video id="screenPreview" ref={shareScreenRef} className="w-full h-[95%]" autoPlay muted></video>
                </div>
                <div className={`h-[85%]
                    ${presentBtnClicked && !shareScreen ? "w-[100%] flex items-center justify-center transition-all duration-500" : "hidden"}
                    `}>
                    <video ref={camPreviewRef} id="camPreview" className="w-full h-[95%]" autoPlay></video>
                </div>
                <button id="screenRecordBtn" onClick={startPresentation} className={`absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4  py-3 px-6 mr-3 bg-accent rounded-full flex items-center justify-center
                    ${presentBtnClicked ? "hidden" : ""}
                    `}><i className="fa fa-play mr-1 text-danger"></i><p className="text-primary">Start Presentation</p></button>
                <div id="record-contro-container" className="w-full h-[15%] flex items-center justify-center">
                    <div className={`w-max h-max py-3 px-10 rounded-full items-center justify-center relative  z-50 
                        ${presentBtnClicked ? "flex" : "hidden"}
                        `}>
                        <button id="stopRecordBtn" onClick={stopRecording} className="py-3 px-6 mr-3 bg-accent rounded-full flex items-center justify-center cursor-pointer relative z-50"><i className="fa fa-stop mr-1 text-danger"></i><p className="text-primary">Stop Recording</p></button>
                        <button id="audioBtn" ref={audioStreamRef} onClick={micClicked} className="ml-3 bg-accent h-10 w-10 rounded-full flex items-center justify-center relative z-50"><i className="fa fa-microphone text-danger text-2xl"></i>{micText}</button>
                        <button id="shareScreenBtn" onClick={shareClicked} className="ml-3 bg-accent h-10 w-max rounded-full flex items-center justify-center relative z-50"><i className="fa fa-desktop text-danger text-2xl"></i>{shareScreenText}</button>
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