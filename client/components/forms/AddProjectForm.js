import { Button, Avatar, Badge, Progress, Tooltip } from "antd";
import { CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import FileUpload from "./FileUpload";


const AddProjectForm = ({
    values,
    setValues,
    handleAddProject,
    uploading,
    setLoading,
}) => {
    return (
        <div className="container pt-3">
            <form onSubmit={handleAddProject}>
                <label>Project Name</label>
                <input
                    type="text"
                    className="form-control square mb-3"
                    onChange={(e) => setValues({ ...values, projectName: e.target.value })}
                    values={values.projectName}
                    autoFocus
                    required
                />

                <label>Start Date</label>
                <input
                    type="date"
                    className="form-control square mb-3"
                    onChange={(e) => setValues({ ...values, startDate: e.target.value })}
                    values={values.startDate}
                    autoFocus
                    required
                />

                <label>Completion Date</label>
                <input
                    type="date"
                    className="form-control square mb-3"
                    onChange={(e) => setValues({ ...values, completionDate: e.target.value })}
                    values={values.completionDate}
                    autoFocus
                    required
                />

                <label>Project Duration</label>
                <input
                    type="text"
                    className="form-control square mb-3"
                    onChange={(e) => setValues({ ...values, duration: e.target.value })}
                    values={values.duration}
                    autoFocus
                    required
                />

                <label>Description/overview</label>
                <textarea
                    className="form-control mb-3"
                    cols="5"
                    rows="5"
                    onChange={(e) => setValues({ ...values, content: e.target.value })}
                    values={values.content}
                    placeholder="Content"
                >
                </textarea>

                <div className="form-group pb-3">
                    <label>Technologies</label>
                    <select
                        values={values.technologies}
                        className="form-control"
                        onChange={(e) => setValues({ ...values, technologies: e.target.value })}
                    >
                        <option>Please select</option>
                        {values.technologiess.length > 0 &&
                            values.technologiess.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                    </select>
                </div>

                {/* <pre>{JSON.stringify(values.technologiess, null, 4)}</pre> */}
                <div className="p-3">
                    <FileUpload
                        values={values}
                        setValues={setValues}
                        setLoading={setLoading}
                    />
                </div>


                <Button
                    onClick={handleAddProject}
                    className="col mt-3"
                    size="large"
                    type="primary"
                    loading={uploading}
                    shape="round"
                >
                    Save
                </Button>
            </form>
        </div>
    );
};

export default AddProjectForm;
