import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Footer() {
    const user = useSelector((state) => state?.session?.user);

    const newTab = (url) => {
        window.open(url, '_blank', 'noopener, noreferrer')
    }
    let decideView;

    if (user || !user ) {
        decideView = (
            <footer className="footer">
                <ul className="footer-ul">
                    <li>
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            href="https://github.com/ptruongg"
                        >
                            <i className="fab fa-github" />
                        </a>
                    </li>
                    <li className="footer-text">
                        <div className='github' onClick={() => newTab('https://github.com/Ptruongg/airbnb-cl0ne')}>
                            <img src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' style={{ height: "30px", width: "30px", marginLeft: "10px", marginRight: "10px" }} />
                        </div>
                    </li>
                    <li>
                        <div className='linkedin' onClick={() => newTab('https://www.linkedin.com/in/truongphilip408/')}>
                            <img src='https://cdn-icons-png.flaticon.com/512/174/174857.png' style={{ height: "30px", width: "30px", marginLeft: "10px", marginRight: "10px" }} />
                        </div>
                    </li>
                    <li>Express</li>
                    <li>Node Js</li>
                    <li>React</li>
                    <li>Redux</li>
                    <li>Javascript</li>
                    <li>PostgreSQL</li>
                    <li>SQLite</li>
                    <li>Sequelize</li>
                </ul>
            </footer>
        );
    } else {
        decideView = <></>;
    }

    return <div>{decideView}</div>;
}

export default Footer;
