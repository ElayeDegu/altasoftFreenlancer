import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../../context";
import AdminRoute from "../../../components/routes/AdminRoutes";
import { useRouter } from "next/router";
import { toast } from "react-toastify";


const TechnologiesUpdate = (match) => {
    // state
    const { state: { user }, dispatch } = useContext(Context);

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    // router
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        loadTechnologies();
    }, [slug]);

    const loadTechnologies = async () => {
        const { data } = await axios.get(`/api/technologies/${slug}`);
        setName(data.name);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name);
        setLoading(true);
        try {
            const { data } = await axios.put(`/api/technologies/${slug}`, { name });
            setLoading(false);
            setName("");
            console.log(data);
            toast.success(`Technologies is successfully updated`);
            router.push("/");
        }
        catch (err) {
            console.log(err);
            setLoading(false);

        }
    };

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
                // onChange={handleChange}
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
                    <h4>Update Technologies</h4>
                )}
                {technologiesForm()}
                <hr />
            </div>
        </AdminRoute>
    )
}

export default TechnologiesUpdate;