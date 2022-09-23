import React, { useState, useContext, useEffect } from "react";
import AdminRoute from "../../../components/routes/AdminRoutes";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../../context";
import Link from "next/link";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import LocalSearch from "../../../components/forms/LocalSearch";
import { useRouter } from "next/router";


const SkillCreate = () => {
    // state
    const { state: { user }, dispatch } = useContext(Context);

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState("");
    const [skills, setSkills] = useState([]);

    const router = useRouter();
    const { slug } = router.query;

    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        loadRoles();
        loadSkills();
    }, [slug]);

    const loadRoles = async () => {
        const { data } = await axios.get(`/api/roles`);
        setRoles(data);
    }

    const loadSkills = async () => {
        const { data } = await axios.get(`/api/skills`);
        setSkills(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        try {
            const { data } = await axios.post("/api/skill", { name, parent: role });
            setLoading(false);
            setName("");
            console.log(data);
            toast.success(`Role is successfully created`);
            loadSkills();
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
                const res = await axios.delete(`/api/skill/${slug}`);
                setLoading(false);
                toast.error(`Skill deleted`);
                console.log(res);
                loadSkills();
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
                    <h4>Create Skills</h4>
                )}

                <div className="form-group">
                    <label>Parent Role</label>
                    <select
                        name="role"
                        className="form-control"
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option>Please select</option>
                        {roles.length > 0 &&
                            roles.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                    </select>
                </div>

                {roleForm()}
                <hr />

                <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                {skills.filter(searched(keyword)).map((s) => (
                    <div className="alert alert-secondary" key={s._id}>

                        {s.name}
                        <span
                            onClick={() => handleRemove(s.slug)}
                            className="btn btn-sm fr float-end"
                        >
                            <DeleteOutlined className="text-danger" />
                        </span>
                        <span className="btn btn-sm float-end">
                            <EditOutlined
                                onClick={() =>
                                    router.push(`/admin/skill/${s.slug}`)
                                }
                                className="text-warning" />
                        </span>
                    </div>
                ))}

            </div>
        </AdminRoute>
    )

}

export default SkillCreate;