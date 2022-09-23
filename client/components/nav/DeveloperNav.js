import { useState, useEffect } from "react";
import Link from "next/link";

const DeveloperNav = () => {
    const [current, setCurrent] = useState("");

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    return (
        <div className="nav flex-column nav-pills">
            <Link href="/developer">
                <a className={`nav-link ${current === "/developer" && "active"}`}>
                    Dashboard
                </a>
            </Link>
            <Link href="/developer/profile/createProfile">
                <a
                    className={`nav-link ${current === "/developer/profile/createProfile" && "active"
                        }`}
                >
                    Profile
                </a>
            </Link>
            <Link href="/developer/portfolio/createPortfolio">
                <a
                    className={`nav-link ${current === "/developer/portfolio/createPortfolio" && "active"
                        }`}
                >
                    Portfolio
                </a>
            </Link>
            <Link href="/developer/profile/createProfile">
                <a
                    className={`nav-link ${current === "/developer/profile/createProfile"
                        }`}
                >
                    Conversations
                </a>
            </Link>
            <Link href="/developer/profile/createProfile">
                <a
                    className={`nav-link ${current === "/developer/profile/createProfile"
                        }`}
                >
                    Jobs
                </a>
            </Link>
            <Link href="/developer/profile/createProfile">
                <a
                    className={`nav-link ${current === "/developer/profile/createProfile"
                        }`}
                >
                    Financial
                </a>
            </Link>
        </div>
    );
};

export default DeveloperNav;
