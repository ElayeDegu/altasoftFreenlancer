import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
// import user from "../../server/models/user";

const Register = () => {
    const [firstName, setFirstName] = useState("Elias");
    const [lastName, setLastName] = useState("Degu");
    const [email, setEmail] = useState("elias.degu@altasoft-solutions.com");
    const [password, setPassword] = useState("Esku2212");
    const [loading, setLoading] = useState(false);

    const {
        state: { user },
    } = useContext(Context);

    const router = useRouter();

    useEffect(() => {
        if (user !== null) router.push("/");
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/register`, {
                firstName,
                lastName,
                email,
                password,
            });
            toast("Registration successful. Please login.");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setLoading(false);
        } catch (err) {
            toast(err.response.data);
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="jumbotron text-center bg-primary square">Register</h1>

            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control mb-4 p-4"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                        required
                    />
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control mb-4 p-4"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                        required
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control mb-4 p-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control mb-4 p-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />

                    <button
                        type="submit"
                        className="btn btn-block btn-primary"
                        disabled={!firstName || !lastName || !email || !password || loading}
                    >
                        {loading ? <SyncOutlined spin /> : "Sign up"}
                    </button>
                </form>
                <p className="text-center p-3">
                    Already registered?{" "}
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Register;
