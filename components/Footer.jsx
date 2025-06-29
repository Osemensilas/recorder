import Link from "next/link";

const Footer = () => {
    return ( 
        <>
            <footer id="footer">
                <div className="footer">
                    <div className="footer-top">
                        <div className="footer-top-left">
                            <div className="footer-logo-container">
                                <img className="footer-logo" src="/" alt="" />
                            </div>
                        </div>
                        <div className="footer-top-right">
                            <nav className="footer-navigation">
                                <ul className="page-nav">
                                    <header className="footer-nav-header">
                                        <h2>Legal</h2>
                                    </header>
                                    <li>
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link href="/record-screen">Record Screen</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Edit Video</Link>
                                    </li>
                                    <li>
                                        <Link href="/">About Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Contact Us</Link>
                                    </li>
                                </ul>
                                <ul className="legal-nav">
                                    <header className="footer-nav-header">
                                        <h2>Legal</h2>
                                    </header>
                                    <li>
                                        <Link href="/">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Terms and Coonditions</Link>
                                    </li>
                                </ul>
                            </nav>
                            <div className="subscribe-form-container">
                                <form action="/" className="subscribe-form">
                                    <header className="subscribe-form-header">
                                        <h2>Subscribe to our newsletter</h2>
                                    </header>
                                    <input type="text" className="subscribe-email" placeholder="Email address"/>
                                    <button type="submit" className="subscribe-btn">Subscribe</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="social-container">
                            <a href="#" target="_blank" className="social-link">
                                <i className="fa fa-instagram"></i>
                            </a>
                            <a href="#" target="_blank" className="social-link">
                                <i className="fa fa-facebook-square"></i>
                            </a>
                            <a href="#" target="_blank" className="social-link">
                                <i className="fa fa-twitter-square"></i>
                            </a>
                            <a href="#" target="_blank" className="social-link">
                                <i className="fa fa-linkedin-square"></i>
                            </a>
                        </div>
                        <p className="rights">All rights reserved © Ossil Tech LTD</p>
                    </div>
                </div>
            </footer>
        </>
     );
}
 
export default Footer;