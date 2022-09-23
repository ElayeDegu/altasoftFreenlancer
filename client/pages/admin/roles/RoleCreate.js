import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../../context";
import AdminRoute from "../../../components/routes/AdminRoutes";
import { toast } from "react-toastify";
import Link from "next/link";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import LocalSearch from "../../../components/forms/LocalSearch";


const RoleCreate = () => {
    // state
    const { state: { user }, dispatch } = useContext(Context);

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);

    const router = useRouter();
    const { slug } = router.query;

    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        loadRoles();
    }, [slug]);

    const loadRoles = async () => {
        const { data } = await axios.get(`/api/roles`);
        setRoles(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name);
        setLoading(true);
        try {
            const { data } = await axios.post("/api/role", { name });
            setLoading(false);
            setName("");
            console.log(data);
            toast.success(`Role is successfully created`);
            loadRoles();
        }
        catch (err) {
            console.log(err);
            setLoading(false);

        }
    };

    const handleRemove = async (slug) => {
        if (window.confirm("Delete?")) {
            try {
                setLoading(true);
                const res = await axios.delete(`/api/role/${slug}`);
                setLoading(false);
                toast.error(`Role deleted`);
                console.log(res);
                loadRoles();
            }
            catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
    };

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
                    <h4>Create Role</h4>
                )}
                {roleForm()}
                <hr />

                <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                {roles.filter(searched(keyword)).map((c) => (
                    <div className="alert alert-secondary" key={c._id}>

                        {c.name}
                        <span
                            onClick={() => handleRemove(c.slug)}
                            className="btn btn-sm fr float-end"
                        >
                            <DeleteOutlined className="text-danger" />
                        </span>
                        <span className="btn btn-sm float-end">
                            <EditOutlined
                                onClick={() =>
                                    router.push(`/admin/roles/${c.slug}`)
                                }
                                className="text-warning" />
                        </span>
                    </div>
                ))}
                {/* <pre>{JSON.stringify(roles, null, 4)}</pre> */}
            </div>
        </AdminRoute>
    )

}

export default RoleCreate;