import { Select, Button, Avatar, Badge } from "antd";
import React from "react";

const { Option } = Select;

const ProfileCreateForm = ({
    handleSubmit,
    handleChange,
    values,
    setValues,
    handleRoleChange,
    skillOptions,
    showSkill,
}) => {
    // destructure
    const {
        title,
        link,
        hour,
        rate,
        images,
        genders,
        currencys,
        gender,
        currency,
        // developer,
        roles,
        role,
        skills,
    } = values;
    const children = [];
    for (let i = 50.00; i <= 2000.00; i++) {
        children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group pb-3">
                <label>Name</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Name"
                    value={title}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group pb-3">
                <label>Gender</label>
                <select
                    name="gender"
                    className="form-control"
                    onChange={handleChange}
                >
                    <option>Please select</option>
                    {genders?.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group pb-3">
                <label>Available hour per week</label>
                <input
                    type="number"
                    name="hour"
                    className="form-control"
                    value={hour}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group pb-3">
                <label>Rate</label>
                <input
                    type="number"
                    name="rate"
                    className="form-control"
                    value={rate}
                    onChange={handleChange}
                />
            </div>

            <label>Currency</label>
            <div className="form-row">
                <div className="col">
                    <div className="form-group pb-3">
                        <select
                            name="currency"
                            className="form-control"
                            onChange={handleChange}
                        >
                            <option>Please select</option>
                            {currencys?.map((b) => (
                                <option key={b} value={b}>
                                    {b}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                {currency && (
                    <div className="form-group pb-3">
                        <Select
                            defaultValue="50.00"
                            style={{ width: "20%" }}
                            onChange={(v) => setValues({ ...values, rate: v })}
                            tokenSeparators={[,]}
                            size="large"
                        >
                            {children}
                        </Select>
                    </div>
                )}
            </div>

            <div className="form-group pb-3">
                <label>Link</label>
                <input
                    type="string"
                    name="link"
                    className="form-control"
                    value={link}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group pb-3">
                <label>Role/ Profession</label>
                <select
                    name="role"
                    className="form-control"
                    onChange={handleRoleChange}
                >
                    <option>Please select</option>
                    {roles?.length > 0 &&
                        roles.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            {showSkill && (
                <div className="form-group pb-3">
                    <label>Skills</label>
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Please select"
                        value={skills}
                        onChange={(value) => setValues({ ...values, skills: value })}
                    >
                        {skillOptions.length &&
                            skillOptions?.map((s) => (
                                <Option key={s._id} value={s._id}>
                                    {s.name}
                                </Option>
                            ))}
                    </Select>
                </div>
            )

            }

            {/* {skillOptions ? skillOptions.length : "no skills yet"} */}

            <div className="row">
                <div className="col">
                    <Button
                        onClick={handleSubmit}
                        disabled={values.loading || values.uploading}
                        className="btn btn-primary"
                        loading={values.loading}
                        type="primary"
                        size="large"
                        shape="round"
                    >
                        {values.loading ? "Saving..." : "Save & Continue"}
                    </Button>
                </div>
            </div>
        </form>
    );
};
export default ProfileCreateForm;
