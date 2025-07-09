import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import LoginComponent from "@/components/Login";
import PremiumComponent from "@/components/Premium";

const RecordScreen = () => {

    const userId = "user123";
    const premiumId = "";
    const [loginFormContainer, setLoginFormContainer] = useState("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30 hide-container");
    const [premiumContainer, setPremiumContainer] = useState("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30 premium-hide");
    const [isRecording, setIsRecording] = useState(false);
    const [fullScreen, setFullScreen] = useState("relative w-full h-full bg-[url(/sceen-recorder-back.jpg)] bg-cover bg-center flex items-end justify-center");
    const [startBtn, setStartBtn] = useState("absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4  py-3 px-6 mr-3 bg-accent rounded-full flex items-center justify-center");
    const [stopBtnContainer, setStopBtnContainer] = useState("w-max h-max py-3 px-10 rounded-full items-center justify-center relative  z-50 hidden");
    const [audioIcon, setAudioIcon] = useState("fa fa-microphone text-danger text-2xl");
    const [recoredSection, setRecorderSection] = useState("w-screen rec-calc relative");
    const [editSection, setEditSection] = useState("relative rec-calc w-screen hidden");
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [useMic, setUseMic] = useState(true);
    const videoRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [startX, setStartX] = useState(0);  
    const [stopX, setStopX] = useState(0);  
    const timelineRef = useRef(null); 
    const [dragging, setDragging] = useState(null);
    const [downloadLink, setDownloadLink] = useState("")

    
    const recordedChunksRef = useRef([]);
    const screenPreview = useRef(null);
    const audioStreamRef = useRef(null);
    
    const mediaRecorderRef = useRef(null);
    const screenStreamRef = useRef(null);

    
    const ffmpegRef = useRef(null);

    
    const audioBtnClick = () => {
        const newMicState = !useMic;
        setUseMic(newMicState); // Update the state

        // Toggle icon
        if (audioIcon === "fa fa-microphone text-danger text-2xl"){
            setAudioIcon("fa fa-microphone text-danger text-2xl btn-active");
        }else{
            setAudioIcon("fa fa-microphone text-danger text-2xl");
        }

        // Enable or disable the mic track
        if (audioStreamRef.current) {
            audioStreamRef.current.getAudioTracks().forEach(track => {
                track.enabled = newMicState;
            });
        }
    };



    const startRecording = async () => {
        if (userId === ""){
            setLoginFormContainer("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30");
            return;
        }else{
            recordedChunksRef.current = [];
        
            try{
                const screenRecorder = await navigator.mediaDevices.getDisplayMedia({video: true});
                const allTracks = [...screenRecorder.getTracks()];
                screenStreamRef.current = screenRecorder;

                setStartBtn("absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4  py-3 px-6 mr-3 bg-accent rounded-full flex items-center justify-center hidden");
                setStopBtnContainer("w-max h-max py-3 px-10 rounded-full items-center justify-center flex");
                setFullScreen("relative w-screen h-screen bg-[url(/sceen-recorder-back.jpg)] bg-cover bg-center flex items-end justify-center");

                if (useMic) {
                    const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    audioStreamRef.current = micStream;
                    allTracks.push(micStream.getAudioTracks()[0]);
                }

                const combinedStream = new MediaStream(allTracks);
                screenPreview.current.srcObject = combinedStream;

                const mediaRecorder = new MediaRecorder(combinedStream);
                mediaRecorderRef.current = mediaRecorder;

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0){
                        recordedChunksRef.current.push(e.data);
                    }
                }

                mediaRecorder.onstop = () => {
                    
                    if (recordedVideo) {
                        URL.revokeObjectURL(recordedVideo);
                    }

                    const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    setRecordedVideo(url);
                    setDownloadLink(url);
                };

                mediaRecorder.start();
                setIsRecording(true);
            }catch(error){
                console.log("Error from recording", error);
            }
        }
    }


    useEffect(() => {
        if (recordedVideo && videoRef.current) {
            const video = videoRef.current;

            const handleLoadedMetadata = () => {
                if (video.duration === Infinity) {
                    video.currentTime = 1e101;
                    video.ontimeupdate = () => {
                        video.ontimeupdate = null;
                        video.currentTime = 0;
                        setDuration(video.duration);
                    };
                } else {
                    setDuration(video.duration);
                }
            };

            video.addEventListener("loadedmetadata", handleLoadedMetadata);
            video.load(); // Force reload of metadata

            return () => {
                video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            };
        }
    }, [recordedVideo]);


    
    const stopRecording = async () => {
        setStartBtn("absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4  py-3 px-6 mr-3 bg-accent rounded-full flex items-center justify-center");
        setStopBtnContainer("w-max h-max py-3 px-10 rounded-full items-center justify-center hidden");
        setFullScreen("relative w-full h-full bg-[url(/sceen-recorder-back.jpg)] bg-cover bg-center flex items-end justify-center");
        
        mediaRecorderRef.current?.stop();

        const stopTracks = (streamRef) => {
            if (streamRef?.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };

        stopTracks(screenStreamRef);
        stopTracks(audioStreamRef);

        setIsRecording(false);
        setRecorderSection("w-screen rec-calc relative hidden");
        setEditSection("relative w-screen rec-calc");

        setStartX(0);
        setStopX(0);
    }

    const handlePlay = () => {
        if (premiumId === ""){
            setPremiumContainer("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30");
            return;
        }else{
            if (videoRef.current) {
                videoRef.current.play();
            }
        }
    };

    const handlePause = () => {
        if (premiumId === ""){
            setPremiumContainer("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30");
            return;
        }else{
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }
    };

    const handleStop = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (dragging === "start" && timelineRef.current) {
                const rect = timelineRef.current.getBoundingClientRect();
                const newX = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
                setStartX(newX < stopX ? newX : stopX - 1); // Keep within bounds
            } else if (dragging === "stop" && timelineRef.current) {
                const rect = timelineRef.current.getBoundingClientRect();
                const newX = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
                setStopX(newX > startX ? newX : startX + 1);
            }
        };

        const handleMouseUp = () => setDragging(null);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, startX, stopX]);
    

    const handleCut = async () => {
        if (premiumId === ""){
            setPremiumContainer("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30");
        }else{

        }
    };


    const handleBackward = () => {
        if (premiumId === ""){
            setPremiumContainer("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30");
            return;
        }else{
            if (videoRef.current) {
                videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
            }
        }
    };

    const handleForward = () => {
        if (premiumId === ""){
            return;
        }else{
            if (videoRef.current) {
                videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5);
            }
        }
    };

    const stopLogin = () => {
        setLoginFormContainer("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30 hide-container");
    }

    const stopPremium = () => {
        setPremiumContainer("w-screen h-screen fixed after:absolute after:content-[''] after:h-screen after:w-screen after:bg-black after:opacity-50 after:top-0 after:left-0 top-0 left-0 z-30 premium-hide");
    }

    return ( 
        <>
            <Head>
                <title>Record Screen - IRUAP TECH STUDIO LTD</title>
                {isRecording && (
                    <style>{`
                        #header, #footer {
                            display: none !important;
                        }
                    `}</style>
                )}
            </Head> 
            <section className={recoredSection}>
                <div id="video-container" className={fullScreen}>
                    <video id="screenPreview" ref={screenPreview} className="w-full h-full absolute" autoPlay muted></video>
                    <button id="screenRecordBtn" onClick={startRecording} className={startBtn}><i className="fa fa-play mr-1 text-danger"></i><p className="text-primary">Start Recording</p></button>
                    <div id="record-contro-container" className="w-full h-1/5 flex items-center justify-center">
                        <div className={stopBtnContainer}>
                            <button id="stopRecordBtn" onClick={stopRecording} className="py-3 px-6 mr-3 bg-accent rounded-full flex items-center justify-center cursor-pointer relative z-50"><i className="fa fa-stop mr-1 text-danger"></i><p className="text-primary">Stop Recording</p></button>
                            <button id="audioBtn" ref={audioStreamRef} onClick={audioBtnClick} className="ml-3 bg-accent h-10 w-10 rounded-full flex items-center justify-center relative z-50"><i className={audioIcon}></i></button>
                        </div>
                    </div>
                </div>
            </section>
            <section id="video-edit" className={editSection}>
                <div id="video-edit-top" className="h-4/5 w-full">
                    <video 
                    ref={videoRef} 
                    src={recordedVideo}
                    onTimeUpdate={() => {
                        const time = videoRef.current.currentTime;
                        setCurrentTime(time);
                    }}
                    onLoadedMetadata={() => {
                        const dur = videoRef.current.duration;
                        setDuration(dur);
                    }}
                    controls={false} 
                    className="h-full w-full"></video>
                    <a href={downloadLink} download="recording.webm" className="absolute top-[10px] left-[85%] py-2 px-4 rounded bg-btns text-text">Download Video</a>
                </div>
                <div id="video-edit-bottom" className="h-1/5 w-full bg-primary">
                    <div id="video-edit-bottom-top" className="h-2/5 w-full flex items-center px-10">
                        <button onClick={handlePlay} id="play-btn" className="h-max w-max mr-5">
                            <i className="fa fa-play text-green-900 text-base"></i>
                        </button>
                        <button onClick={handlePause} id="pause-btn" className="h-max w-max mr-5">
                            <i className="fa fa-pause text-danger text-base"></i>
                        </button>
                        <button onClick={handleStop} id="pause-btn" className="h-max w-max mr-5">
                            <i className="fa fa-stop text-danger text-base"></i>
                        </button>
                        <button onClick={handleBackward} id="handleBackward" className="h-max w-max mr-5">
                            <i className="fa fa-backward text-accent text-base"></i>
                        </button>
                        <button onClick={handleForward} id="handleForeward" className="h-max w-max mr-5">
                            <i className="fa fa-forward text-accent text-base"></i>
                        </button>
                        <button onClick={handleCut} id="cut-btn" className="h-max w-max">
                            <i className="fa fa-cut text-danger text-base"></i>
                        </button>
                    </div>
                    <div id="video-edit-bottom-bottom" className="px-10 w-full h-3/5">
                        <div ref={timelineRef} className="w-full h-20 bg-silver relative rounded overflow-hidden">
                            <div id="handleDragStart"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                setDragging("start");
                            }}
                            className="z-10 absolute top-0 left-0 cursor-grab bg-green-900 h-full w-1 after:content-[''] after:top-0 after:left-0 after:h-3 after:w-3 after:bg-green-900 after:absolute"
                            style={{ left: `${startX}px` }}
                            ></div>
                            <div id="handleDragStop" 
                            onMouseDown={(e) => {
                                e.preventDefault();
                                setDragging("stop");
                            }}
                            className="z-10 absolute top-0 left-0 cursor-grab bg-red-900 h-full w-1 after:content-[''] after:top-0 after:-left-3 after:h-3 after:w-3 after:bg-red-900 after:absolute"
                            style={{ left: `${stopX}px` }}
                            ></div>
                            <div className="h-full bg-accent absolute top-0 left-0" style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%" }}></div>
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
            <section id="premium-container" className={premiumContainer}>
                <div className="w-full h-24 flex items-center justify-end px-10">
                    <div onClick={stopPremium} className="h-10 w-10 relative cursor-pointer z-10">
                        <span className="h-0.5 w-9 after:h-0.5 after:w-9 after:content-[''] bg-white after:bg-white absolute after:absolute rotate-45 after:rotate-90 top-1/2 after:top-0 left-0.5 after:left-0"></span>
                    </div>
                </div>
                <PremiumComponent />            
            </section>
        </>
     );
}
 
export default RecordScreen;