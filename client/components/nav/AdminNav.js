import { useState, useEffect } from "react";
import Link from "next/link";

const AdminNav = () => {
    const [current, setCurrent] = useState("");

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    return (
        <div className="nav flex-column nav-pills">
            {/* <Link href="/admin">
                <a className={`nav-link ${current === "/admin" && "active"}`}>
                    Dashboard
                </a>
            </Link> */}

            <Link href="/admin/developers/DeveloperCreate">
                <a
                    className={`nav-link ${current === "/admin/developers/DeveloperCreate" && "active"
                        }`}
                >
                    Developer
                </a>
            </Link>

            <Link href="/admin/companies/CompanyCreate">
                <a
                    className={`nav-link ${current === "/admin/companies/CompanyCreate" && "active"
                        }`}
                >
                    Company
                </a>
            </Link>


            <Link href="/admin/roles/RoleCreate">
                <a
                    className={`nav-link ${current === "/admin/roles/RoleCreate" && "active"
                        }`}
                >
                    Roles
                </a>
            </Link>

            <Link href="/admin/skill/SkillCreate">
                <a
                    className={`nav-link ${current === "/admin/skill/SkillCreate" && "active"
                        }`}
                >
                    Skills
                </a>
            </Link>

            <Link href="/admin/technologies/TechnologiesCreate">
                <a
                    className={`nav-link ${current === "/admin/technologies/TechnologiesCreate" && "active"
                        }`}
                >
                    Technologies
                </a>
            </Link>


            <Link href="/admin/profile/createProfile">
                <a
                    className={`nav-link ${current === "/admin/profile/createProfile" && "active"
                        }`}
                >
                    Financial
                </a>
            </Link>
        </div>
    );
};

export default AdminNav;
