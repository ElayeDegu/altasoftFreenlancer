import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../../context";
import AdminRoute from "../../../components/routes/AdminRoutes";
import { useRouter } from "next/router";
import { toast } from "react-toastify";


const RoleUpdate = (match) => {
    // state
    const { state: { user }, dispatch } = useContext(Context);

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    // router
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        loadRole();
    }, [slug]);

    const loadRole = async () => {
        const { data } = await axios.get(`/api/role/${slug}`);
        setName(data.name);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name);
        setLoading(true);
        try {
            const { data } = await axios.put(`/api/role/${slug}`, { name });
            setLoading(false);
            setName("");
            console.log(data);
            toast.success(`Role is successfully updated`);
            router.push("/");
        }
        catch (err) {
            console.log(err);
            setLoading(false);

        }
    };

    const roleForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoFocus
                    required
                // onChange={handleChange}
                />
                <br />
                <button className="btn btn-outline-primary">Save</button>
            </div>
        </form>
    );

    return (
        <AdminRoute>
            <h1 className="jumbotron text-center square">Create Role</h1>
            <div className="col">
                {loading ? (
                    <h4 className="text-danger">Loading..</h4>
                ) : (
                    <h4>Update Role</h4>
                )}
                {roleForm()}
                <hr />
            </div>
        </AdminRoute>
    )
}

export default RoleUpdate;