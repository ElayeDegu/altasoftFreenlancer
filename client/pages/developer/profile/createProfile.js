import React, { useState, useEffect } from "react";
import axios from "axios";
import DeveloperRoute from "../../../components/routes/DeveloperRoutes";
import ProfileCreateForm from "../../../components/forms/ProfileCreateForm";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const initialState = {
    title: "",
    link: "",
    hour: "",
    rate: "",
    images: [],
    genders: ["Male", "Female", "Not Interested"],
    currencys: ["USD", "EUR", "GBP"],
    gender: "",
    currency: "",
    //developer: "",
    roles: [],
    role: "",
    skills: [],
};
const ProfileCreate = () => {
    // state
    const [values, setValues] = useState(initialState);
    const [skillOptions, setSkillOptions] = useState([]);
    const [showSkill, setShowSkill] = useState(false);

    // router
    const router = useRouter();
    const { _id } = router.query;

    useEffect(() => {
        loadRoles();
        getRoleSkills();
    }, []);

    const loadRoles = async () => {
        const { data } = await axios.get(`/api/roles`);
        setValues({ ...values, roles: data });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(values);
            const { data } = await axios.post("/api/profile", {
                ...values
            });
            console.log(data);
            toast("Great! Now you can start adding profile");
            router.push("/developer");
        } catch (err) {
            console.log(err);
            toast(err.response.data);
        }
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const getRoleSkills = async (_id) => {
        const { data } = await axios.get(`/api/role/skills/${_id}`);
        setSkillOptions(data);
    };

    const handleRoleChange = (e) => {
        e.preventDefault();
        console.log("CLICKED ROLE", e.target.value);
        setValues({ ...values, skills: [], role: e.target.value });
        const { data } = getRoleSkills(e.target.value)
        console.log("Skills OPTIONS ON ROLE CLICK", data);
        setSkillOptions({ skills: data });
        setShowSkill(true);
    };



    return (
        <DeveloperRoute>
            <h1 className="jumbotron text-center square">Create Profile</h1>


            <div className="container col-md-8">
                <ProfileCreateForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                    handleRoleChange={handleRoleChange}
                    skillOptions={skillOptions}
                    showSkill={showSkill}
                />
            </div>
            <pre>{JSON.stringify(values, null, 4)}</pre>
            <hr />
            {/* <pre>{JSON.stringify(skillOptions, null, 4)}</pre> */}
        </DeveloperRoute>
    );
};

export default ProfileCreate;
