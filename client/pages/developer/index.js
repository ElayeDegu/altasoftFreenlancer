import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import DeveloperRoute from "../../components/routes/DeveloperRoutes";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Descriptions, Card } from 'antd';
import React from 'react';

const { Meta } = Card;

const DeveloperIndex = () => {
    const [profiles, setProfiles] = useState([]);
    // const [experience, setExperience] = useState({});

    const router = useRouter();
    const { slug } = router.query;
    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const { data } = await axios.get("/api/developer-profile");
        setProfiles(data);
    };

    // const loadExperience = async () => {
    //     const { data } = await axios.get("/api/developer-profile");
    //     setExperience(data);
    // };
    const myStyle = { marginTop: "-15px", fontSize: "10px" };

    return (
        <DeveloperRoute>
            <h1 className="jumbotron text-center square">Developer Dashboard</h1>
            {/* <pre>{JSON.stringify(profiles, null, 4)}</pre> */}
            {
                profiles &&
                profiles.map((profile) => (
                    <>
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
                                        <Descriptions title="Profile" extra={<EditOutlined
                                            onClick={() =>
                                                router.push(`/developer/profile/edit/${slug}`)
                                            }
                                            className="h5 pointer text-warning mr-4" />}>
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
                                    {/* Education */}
                                    <Descriptions title="Education" extra={<EditOutlined
                                        onClick={() =>
                                            router.push(`/developer/profile/edit/${slug}`)
                                        }
                                        className="h5 pointer text-warning mr-4" />}>
                                        <Descriptions.Item label="Name">{profile.experience.jobTitle}</Descriptions.Item>
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




                                    {/* <div className="col-md-3 mt-3 text-center">
                                        {profile.published ? (
                                            <div>
                                                <CheckCircleOutlined className="h5 pointer text-success" />
                                            </div>
                                        ) : (
                                            <div>
                                                <CloseCircleOutlined className="h5 pointer text-warning" />
                                            </div>
                                        )}
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </>
                ))
            }
        </DeveloperRoute>
    );
};

export default DeveloperIndex;
