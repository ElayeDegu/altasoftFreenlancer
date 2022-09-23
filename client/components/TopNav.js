import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
    AppstoreOutlined,
    CoffeeOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserAddOutlined,
    CarryOutOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
    const [current, setCurrent] = useState("");

    const { state, dispatch } = useContext(Context);
    const { user } = state;

    const router = useRouter();

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    const logout = async () => {
        dispatch({ type: "LOGOUT" });
        window.localStorage.removeItem("user");
        const { data } = await axios.get("/api/logout");
        toast(data.message);
        router.push("/login");
    };

    return (
        <Menu mode="horizontal" selectedKeys={[current]} className="mb-2">
            <Item
                key="/"
                onClick={(e) => setCurrent(e.key)}
                icon={<AppstoreOutlined />}
            >
                <Link href="/">
                    <a>AltaSoft</a>
                </Link>
            </Item>

            {user && user.role && user.role.includes("Developer") ? (
                <Item
                    key="/developer/profile/createProfile"
                    onClick={(e) => setCurrent(e.key)}
                    icon={<CarryOutOutlined />}
                >
                    <Link href="/developer/profile/createProfile">
                        <a>Developer</a>
                    </Link>
                </Item>

            ) : user && user.role && user.role.includes("Admin") ? (
                <>
                    {/* <Item
                        key="/admin"
                        onClick={(e) => setCurrent(e.key)}
                        icon={<CarryOutOutlined />}
                    >
                        <Link href="/developer">
                            <a>Developer</a>
                        </Link>
                    </Item> */}

                    {/* <Item
                        key="/user"
                        onClick={(e) => setCurrent(e.key)}
                        icon={<CarryOutOutlined />}
                    >
                        <Link href="/user">
                            <a>Company</a>
                        </Link>
                    </Item> */}
                </>

            )
                : (
                    <Item
                        key="/user"
                        onClick={(e) => setCurrent(e.key)}
                        icon={<TeamOutlined />}
                    >
                        <Link href="/user">
                            <a>Companies</a>
                        </Link>
                    </Item>
                )}




            {user === null && (
                <>
                    <Item
                        key="/login"
                        onClick={(e) => setCurrent(e.key)}
                        icon={<LoginOutlined />}
                    >
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </Item>

                    <Item
                        key="/register"
                        onClick={(e) => setCurrent(e.key)}
                        icon={<UserAddOutlined />}
                    >
                        <Link href="/register">
                            <a>Register</a>
                        </Link>
                    </Item>
                </>
            )}


            {user !== null && user.role && user.role.includes("Admin") ? (
                <SubMenu
                    icon={<CoffeeOutlined />}
                    title={user && user.firstName}
                    className="float-end"
                >
                    <ItemGroup>
                        <Item key="/admin">
                            <Link href="/admin">
                                <a>Dashboard</a>
                            </Link>
                        </Item>
                        <Item onClick={logout}>Logout</Item>
                    </ItemGroup>
                </SubMenu>
            ) : user && user.role && user.role.includes("Developer") ? (
                <SubMenu
                    icon={<CoffeeOutlined />}
                    title={user && user.firstName}
                    className="float-end"
                >
                    <ItemGroup>
                        <Item key="/developer">
                            <Link href="/developer">
                                <a>Dashboard</a>
                            </Link>
                        </Item>
                        <Item onClick={logout}>Logout</Item>
                    </ItemGroup>
                </SubMenu>
            ) :
                (
                    <SubMenu
                        icon={<CoffeeOutlined />}
                        title={user && user.firstName}
                        className="float-right"
                    >
                        <ItemGroup>
                            <Item key="/user">
                                <Link href="/user">
                                    <a>Dashboard</a>
                                </Link>
                            </Item>
                            <Item onClick={logout}>Logout</Item>
                        </ItemGroup>
                    </SubMenu>
                )}

            {/* {user && user.role && user.role.includes("Developer") && (
                <Item
                    key="/developer/profile/createProfile"
                    onClick={(e) => setCurrent(e.key)}
                    icon={<TeamOutlined />}
                    className="float-right"
                >
                    <Link href="/developer/profile/createProfile">
                        <a>Developer</a>
                    </Link>
                </Item>
            )} */}


        </Menu>
    );
};

export default TopNav;
