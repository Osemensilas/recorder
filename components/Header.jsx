import Link from "next/link";

const Header = () => {
    return ( 
        <>
        <header id="header">
            <div className="header">
                <div className="header-top">
                    <div className="header-top-left">
                        <div className="header-logo-container">
                            <img className="header-logo" src="/logo.png" alt="" />
                        </div>
                    </div>
                    <nav className="nav-container">
                        <ul className="nav-list">
                            <li className="nav-item">
                                <Link href="/" className="nav-link">Home</Link> 
                            </li>
                            <li className="nav-item">
                                <Link href="/record-screen" className="nav-link">Record Screen</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/presentation" className="nav-link">Present</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/" className="nav-link">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/" className="nav-link">Contact Us</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="header-top-right">
                        <div className="cta-btn-container">
                            <Link href="/sign-in" className="sign-in-btn btn">Sign In</Link>
                            <Link href="/sign-up" className="sign-up-btn btn">Sign up</Link>
                        </div>
                        <div className="active-user">
                            <div className="active-user-container">
                                <i className="fa fa-user-circle-o"></i>
                                <div className="active-user-detail">
                                    <p>Osemen Silas</p>
                                    <p>osemensilas@gmail.com</p>
                                    <button className="logout-btn btn">Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        </>
     );
}
 
export default Header;