import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../../context";
import AdminRoute from "../../../components/routes/AdminRoutes";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import LocalSearch from "../../../components/forms/LocalSearch";


const TechnologiesCreate = () => {
    // state
    const { state: { user }, dispatch } = useContext(Context);

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [technologies, setTechnologies] = useState([]);

    const router = useRouter();
    const { slug } = router.query;

    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        loadTechnologies();
    }, [slug]);

    const loadTechnologies = async () => {
        const { data } = await axios.get(`/api/technologiess`);
        setTechnologies(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name);
        setLoading(true);
        try {
            const { data } = await axios.post("/api/technologies", { name });
            setLoading(false);
            setName("");
            console.log(data);
            toast.success(`Technologies is successfully created`);
            loadTechnologies();
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
                const res = await axios.delete(`/api/technologies/${slug}`);
                setLoading(false);
                toast.error(`Technologies deleted`);
                console.log(res);
                loadTechnologies();
            }
            catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
    };

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    const technologiesForm = () => (
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
            <h1 className="jumbotron text-center square">Create Technologies</h1>
            <div className="col">
                {loading ? (
                    <h4 className="text-danger">Loading..</h4>
                ) : (
                    <h4>Create Technologies</h4>
                )}
                {technologiesForm()}
                <hr />

                <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                {technologies.filter(searched(keyword)).map((c) => (
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
                                    router.push(`/admin/technologies/${c.slug}`)
                                }
                                className="text-warning" />
                        </span>
                    </div>
                ))}
            </div>
        </AdminRoute>
    )

}

export default TechnologiesCreate;