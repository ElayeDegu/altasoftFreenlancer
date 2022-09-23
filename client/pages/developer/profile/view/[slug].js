import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import DeveloperRoute from "../../../../components/routes/DeveloperRoutes";
import { Avatar, Tooltip, Button, Modal, List, Descriptions } from "antd";
import { EditOutlined, CheckOutlined, UploadOutlined } from "@ant-design/icons";
import AddProjectForm from "../../../../components/forms/AddProjectForm";
import AddEducationForm from "../../../../components/forms/AddEducationForm";
import AddExperienceForm from "../../../../components/forms/AddExperienceForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import Item from "antd/lib/list/Item";
import Link from "next/link";

const ProfileView = () => {
    const [profile, setProfile] = useState({});
    // for projects
    const [visible, setVisible] = useState(false);
    const [values, setValues] = useState({
        projectName: "",
        startDate: "",
        completionDate: "",
        duration: "",
        content: "",
        technologiess: [],
        technologies: "",
        images: [],
    });

    const [education, setEducation] = useState({
        educationName: "",
        fieldOfStudy: "",
        degree: "",
    });

    const [experience, setExperience] = useState({
        jobTitle: "",
        durations: "",
        responsibility: "",
    });
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
    const [uploading, setUploading] = useState(false);
    const [uploadVideoButtonText, setUploadVideoButtonText] = useState("Upload Video");
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [technologiessOptions, setTechnologiessOptions] = useState([]);

    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        loadProfile();
        loadTechnologiess();
    }, [slug]);

    const loadProfile = async () => {
        const { data } = await axios.get(`/api/profile/${slug}`);
        setProfile(data);
    };

    const loadTechnologiess = async () => {
        const { data } = await axios.get(`/api/technologiess`);
        setValues({ ...values, technologiess: data });
        setTechnologiessOptions({ technologiess: data });
    }

    // FUNCTIONS FOR ADD Projects
    const handleAddProject = async (e) => {
        e.preventDefault();
        // console.log(values);
        try {
            const { data } = await axios.post(
                `/api/profile/project/${slug}/${profile.developer._id}`,
                values
            );
            // console.log(data)
            setValues({ ...values, projectName: "", startDate: "", completionDate: "", duration: "", content: "", technologies: {}, images: {}, video: {} });
            setVisible(false);
            setUploadVideoButtonText("Upload video");
            setProfile(data);
            toast("Project added");
        } catch (err) {
            console.log(err);
            toast("Project add failed");
        }
    };

    // FUNCTIONS FOR ADD Education
    const handleAddEducation = async (e) => {
        e.preventDefault();
        // console.log(values);
        try {
            const { data } = await axios.post(
                `/api/profile/education/${slug}/${profile.developer._id}`,
                education
            );
            // console.log(data)
            setEducation({ ...education, educationName: "", fieldOfStudy: "", degree: "" });
            setVisible(false);
            setProfile(data);
            toast("Education added");
        } catch (err) {
            console.log(err);
            toast("Education add failed");
        }
    };

    // FUNCTIONS FOR ADD Experience
    const handleAddExperience = async (e) => {
        e.preventDefault();
        // console.log(values);
        try {
            const { data } = await axios.post(
                `/api/profile/experience/${slug}/${profile.developer._id}`,
                experience
            );
            // console.log(data)
            setExperience({ ...experience, jobTitle: "", durations: "", responsibility: "" });
            setVisible(false);
            setProfile(data);
            toast("Experience added");
        } catch (err) {
            console.log(err);
            toast("Experience add failed");
        }
    };

    const handleImage = (e) => {
        let file = e.target.files[0];
        setPreview(window.URL.createObjectURL(file));
        setUploadButtonText(file.name);
        setValues({ ...values, loading: true });
        // resize
        Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
            try {
                let { data } = await axios.post("/api/profile/upload-image", {
                    image: uri,
                });
                console.log("IMAGE UPLOADED", data);
                // set image in the state
                setImage(data);
                setValues({ ...values, loading: false });
            } catch (err) {
                console.log(err);
                setValues({ ...values, loading: false });
                toast("Image upload failed. Try later.");
            }
        });
    };

    const handleImageRemove = async () => {
        try {
            setValues({ ...values, loading: true });
            const res = await axios.post("/api/profile/remove-image", { image });
            setImage({});
            setPreview("");
            setUploadButtonText("Upload Image");
            setValues({ ...values, loading: false });
        } catch (err) {
            console.log(err);
            setValues({ ...values, loading: false });
            toast("Image upload failed. Try later.");
        }
    };

    return (
        <DeveloperRoute>
            <div className="container col-md-9 ">
                {/* <pre>{JSON.stringify(profile, null, 4)}</pre> */}

                {profile && (
                    <div className="container-fluid pt-1">
                        <div className="media pt-2">

                            <div className="media-body pl-2">
                                <div className="row">
                                    <div className="col">
                                        <Link
                                            href={`/developer/profile/view/${profile.slug}`}
                                            className="pointer"
                                        >
                                            <a className="mt-2 text-primary">
                                                <h5 className="pt-2">{profile.title}</h5>
                                            </a>
                                        </Link>
                                        {/* Profile */}
                                        <Descriptions title="Profile" extra={<Tooltip title="Edit"><EditOutlined
                                            onClick={() =>
                                                router.push(`/developer/profile/edit/${slug}`)
                                            }
                                            className="h5 pointer text-warning mr-4" /></Tooltip>}
                                        >
                                            <Descriptions.Item label="Name">{profile.title}</Descriptions.Item>
                                            <br />
                                            <Descriptions.Item label="Male">{profile.gender}</Descriptions.Item>
                                            <Descriptions.Item label="Role">{profile.role}</Descriptions.Item>
                                            <br />
                                            <Descriptions.Item label="Rate">${profile.rate}</Descriptions.Item>
                                            <Descriptions.Item label="Hour">{profile.hour}hr</Descriptions.Item>
                                            <br />
                                            <Descriptions.Item label="Link">{profile.link}</Descriptions.Item>
                                            <br />
                                        </Descriptions>
                                    </div>

                                    <hr />
                                    {/* Experience */}
                                    <h5>Experience</h5>
                                    {profile.experience?.map((exp) =>
                                        <Descriptions extra={<Tooltip title="Edit"><EditOutlined
                                            onClick={() =>
                                                router.push(`/developer/profile/edit/${slug}`)
                                            }
                                            className="h5 pointer text-warning mr-4" /></Tooltip>}>
                                            <Descriptions.Item label="Job Title">{exp.jobTitle}</Descriptions.Item>
                                            <Descriptions.Item label="Durations">{exp.durations}</Descriptions.Item>
                                            <br />
                                            <Descriptions.Item label="Responsibility">{exp.responsibility}</Descriptions.Item>
                                            <br />
                                        </Descriptions>
                                    )}
                                    <hr />

                                    {/* Education */}
                                    <h5>Education</h5>
                                    {profile.education?.map((edu) =>
                                        <Descriptions extra={<Tooltip title="Edit"><EditOutlined
                                            onClick={() =>
                                                router.push(`/developer/profile/edit/${slug}`)
                                            }
                                            className="h5 pointer text-warning mr-4" /></Tooltip>}>
                                            <Descriptions.Item label="Job Title">{edu.educationName}</Descriptions.Item>
                                            <Descriptions.Item label="Durations">{edu.fieldOfStudy}</Descriptions.Item>
                                            <br />
                                            <Descriptions.Item label="Responsibility">{edu.degree}</Descriptions.Item>
                                            <br />
                                        </Descriptions>
                                    )}
                                    <hr />
                                    {/* Projects */}
                                    <h5>Projects</h5>
                                    {profile.projects?.map((pro) =>
                                        <Descriptions extra={<Tooltip title="Edit"><EditOutlined
                                            onClick={() =>
                                                router.push(`/developer/profile/edit/${slug}`)
                                            }
                                            className="h5 pointer text-warning mr-4" /></Tooltip>
                                        }
                                        >
                                            <Descriptions.Item label="Project Name">{pro.projectName}</Descriptions.Item>
                                            <br />
                                            <Descriptions.Item label="Start Date">{pro.startDate}</Descriptions.Item>
                                            <Descriptions.Item label="Completion Date">{pro.completionDate}</Descriptions.Item>
                                            <br />
                                            <Descriptions.Item label="Durations">{pro.durations}</Descriptions.Item>
                                            <Descriptions.Item label="Content">{pro.content}</Descriptions.Item>
                                            <br />
                                            <Descriptions.Item label="Link">{pro.projectName}</Descriptions.Item>
                                            <br />
                                        </Descriptions>
                                    )}
                                    <hr />
                                    {/* Skills */}
                                    {/* <h5>Skills</h5>
                                    {profile.skills?.map((s) =>
                                        <Descriptions extra={<EditOutlined
                                            onClick={() =>
                                                router.push(`/developer/profile/edit/${slug}`)
                                            }
                                            className="h5 pointer text-warning mr-4" />}>
                                            <Descriptions.Item key={s._id} value={s._id} >{s.name}</Descriptions.Item>

                                        </Descriptions>
                                    )}
                                    <hr /> */}

                                    {/* <div className="d-flex pt-4">
                                        <Tooltip title="Edit">
                                            <EditOutlined
                                                onClick={() =>
                                                    router.push(`/developer/profile/edit/${slug}`)
                                                }
                                                className="h5 pointer text-warning mr-4" />
                                        </Tooltip>
                                        <Tooltip title="Publish">
                                            <CheckOutlined className="h5 pointer text-danger" />
                                        </Tooltip>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="row m-3">
                            <Button
                                onClick={() => setVisible(true)}
                                className="col-md-3 pr-3 text-center"
                                type="primary"
                                shape="round"
                                icon={<UploadOutlined />}
                                size="large"
                            >
                                Add Portfolio
                            </Button>
                            <Button
                                onClick={() => setVisible(true)}
                                className="col-md-3 pr-3 text-center"
                                type="primary"
                                shape="round"
                                icon={<UploadOutlined />}
                                size="large"
                            >
                                Add Experience
                            </Button>

                            <Button
                                onClick={() => setVisible(true)}
                                className="col-md-3 pr-3 text-center"
                                type="primary"
                                shape="round"
                                icon={<UploadOutlined />}
                                size="large"
                            >
                                Add Education
                            </Button>

                        </div>

                        <br />

                        <div>

                        </div>

                        <Modal
                            title="+ Add Project"
                            centered
                            visible={visible}
                            onCancel={() => setVisible(false)}
                            footer={null}
                        >
                            <AddProjectForm
                                values={values}
                                setValues={setValues}
                                handleAddProject={handleAddProject}
                                uploading={uploading}
                                uploadButtonText={uploadButtonText}
                                uploadVideoButtonText={uploadVideoButtonText}
                                preview={preview}
                                handleImage={handleImage}
                                handleImageRemove={handleImageRemove}
                                progress={progress}
                                loading={loading}
                                setLoading={setLoading}
                                technologiessOptions={technologiessOptions}
                            />
                        </Modal>

                        <Modal
                            title="+ Add Experience"
                            centered
                            visible={visible}
                            onCancel={() => setVisible(false)}
                            footer={null}
                        >
                            <AddExperienceForm
                                experience={experience}
                                setExperience={setExperience}
                                handleAddExperience={handleAddExperience}
                                loading={loading}
                                setLoading={setLoading}
                                technologiessOptions={technologiessOptions}
                            />
                        </Modal>
                        <Modal
                            title="+ Add Education"
                            centered
                            visible={visible}
                            onCancel={() => setVisible(false)}
                            footer={null}
                        >
                            <AddEducationForm
                                education={education}
                                setEducation={setEducation}
                                handleAddEducation={handleAddEducation}
                                loading={loading}
                                setLoading={setLoading}
                                technologiessOptions={technologiessOptions}
                            />
                        </Modal>


                        {/* <div className="row pb-5">
                            <div className="col lesson-list">
                                <h4>
                                    {profile && profile.projects && profile.projects.length} Projects
                                </h4>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={profile && profile.projects}
                                    renderItem={(item, index) => (
                                        <Item>
                                            <Item.Meta
                                                avatar={<Avatar>{index + 1}</Avatar>}
                                                title={item.projectName}
                                            ></Item.Meta>
                                        </Item>
                                    )}
                                ></List>
                            </div>
                        </div> */}
                        <hr />
                    </div>
                )}
            </div>
        </DeveloperRoute>
    );
};

export default ProfileView;
