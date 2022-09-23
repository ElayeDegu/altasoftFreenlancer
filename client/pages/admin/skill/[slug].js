import React, { useState, useContext, useEffect } from "react";
import AdminRoute from "../../../components/routes/AdminRoutes";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../../context";
import Link from "next/link";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import LocalSearch from "../../../components/forms/LocalSearch";
import { useRouter } from "next/router";


const SkillUpdate = () => {
    // state
    const { state: { user }, dispatch } = useContext(Context);

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    // const [role, setRole] = useState("");
    // const [skills, setSkills] = useState([]);
    const [parent, setParent] = useState("");

    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        loadRoles();
        loadSkills();
    }, [slug]);

    const loadRoles = async () => {
        const { data } = await axios.get(`/api/roles`);
        setRoles(data);
    }

    const loadSkills = async () => {
        const { data } = await axios.get(`/api/skill/${slug}`);
        setName(data.name);
        setParent(data.parent);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post("/api/skill", { name, parent });
            setLoading(false);
            setName("");
            console.log(data);
            toast.success(`Skill is successfully Updated`);
            router.push("/admin");
        }
        catch (err) {
            console.log(err);
            setLoading(false);
        }
    };


    const roleForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group pt-3">
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
            <h1 className="jumbotron text-center square">Create Skill</h1>
            <div className="col">
                {loading ? (
                    <h4 className="text-danger">Loading..</h4>
                ) : (
                    <h4>Update Skills</h4>
                )}

                <div className="form-group">
                    <label>Parent Role</label>
                    <select
                        name="role"
                        className="form-control"
                        onChange={(e) => setParent(e.target.value)}
                    >
                        <option>Please select</option>
                        {roles.length > 0 &&
                            roles.map((c) => (
                                <option key={c._id} value={c._id} selected={c._id === parent}>
                                    {c.name}
                                </option>
                            ))}
                    </select>
                </div>

                {roleForm()}

            </div>
        </AdminRoute>
    )

}

export default SkillUpdate;