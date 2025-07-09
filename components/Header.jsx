import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {

    const [openNav, setOpenNav] = useState(false);

    const hamClicked = () => {
        if (openNav === false){
            setOpenNav(true);
        }else{
            setOpenNav(false);
        }
    }

    const linkClicked = () => {
        setOpenNav(false);
    }

    useEffect(() => {
        if (openNav === true){
            setOpenNav(true);
        }else{
            setOpenNav(false);
        }
    }, [openNav])

    return ( 
        <>
        <header id="header" className="h-[100px] w-screen bg-primary">
            <div className="h-full w-full flex items-center justify-between px-10">
                <div className="h-max w-max">
                    <div className="h-[45px] w-[60px]">
                        <img className="w-full h-full" src="/logo.png" alt="" />
                    </div>
                </div>
                <div className={`h-full items-center justify-between transition-all duration-500
                    ${openNav ? "block sm:flex fixed p-5 top-0 left-0 h-screen w-screen bg-primary z-30 sm:w-[80%]" : "hidden sm:flex"}
                    `}>
                    <nav className={`h-max w-max
                        ${openNav ? "w-screen" : ""}
                        `}>
                        <ul className={`h-max w-max items-center list-none
                            ${openNav ? "block" : "flex"}
                            `}>
                            <li onClick={linkClicked} className={`
                                ${openNav ? "mb-5" : "mx-5"}
                                `}>
                                <Link href="/" className="nav-link">Home</Link> 
                            </li>
                            <li onClick={linkClicked} className={`
                                ${openNav ? "mb-5" : "mx-5"}
                                `}>
                                <Link href="/record-screen" className="nav-link">Record Screen</Link>
                            </li>
                            <li onClick={linkClicked} className={`
                                ${openNav ? "mb-5" : "mx-5"}
                                `}>
                                <Link href="/presentation" className="nav-link">Present</Link>
                            </li>
                            <li onClick={linkClicked} className={`
                                ${openNav ? "mb-5" : "mx-5"}
                                `}>
                                <Link href="/" className="nav-link">Meeting</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="h-max w-max">
                        <div className="h-max w-max items-center flex">
                            <Link href="/sign-in" className="sign-in-btn btn">Sign In</Link>
                            <Link href="/sign-up" className="sign-up-btn btn">Sign up</Link>
                        </div>
                        <div className="hidden relative h-max w-max">
                            <div className="h-[30px] w-[30px] cursor-pointer">
                                <i className="fa fa-user-circle-o text-[30px] text-text"></i>
                                <div className="active-user-detail">
                                    <p>Osemen Silas</p>
                                    <p>osemensilas@gmail.com</p>
                                    <button className="logout-btn btn">Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={hamClicked} className="block sm:hidden h-10 w-10 relative">
                    <span className={`absolute after:absolute before:absolute after:content-[''] before:content-[''] top-[50%] left-[50%] before:left-0 after:left-0 -translate-x-[50%] -translate-y-[50%] before:h-[2px] after:h-[2px] w-[30px] before:w-[30px] after:w-[30px] bg-text before:bg-text after:bg-text transition-all duration-500 after:transition-all after:duration-500 before:transition-all before:duration-500
                        ${openNav ? "before:top-0 after:top-0 h-0 after:rotate-45 before:-rotate-45 z-50" : "before:top-[6px] after:top-[-6px] h-[2px]"}
                        `}></span>
                </div>
            </div>
        </header>
        </>
     );
}
 
export default Header;