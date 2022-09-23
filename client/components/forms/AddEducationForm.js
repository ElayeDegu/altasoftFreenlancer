import { Button, Avatar, Badge, Progress, Tooltip } from "antd";
import { CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";


const AddEducationForm = ({
    education,
    setEducation,
    handleAddEducation,
    uploading,
}) => {
    return (
        <div className="container pt-3">
            <form onSubmit={handleAddEducation}>
                <label>Education</label>
                <input
                    type="text"
                    className="form-control square mb-3"
                    onChange={(e) => setEducation({ ...education, educationName: e.target.value })}
                    values={education.educationName}
                    autoFocus
                    required
                />

                <label>Field of Study</label>
                <input
                    type="text"
                    className="form-control square mb-3"
                    onChange={(e) => setEducation({ ...education, fieldOfStudy: e.target.value })}
                    values={education.fieldOfStudy}
                    autoFocus
                    required
                />

                <label>Degree</label>
                <input
                    type="text"
                    className="form-control square mb-3"
                    onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                    values={education.degree}
                    autoFocus
                    required
                />


                <Button
                    onClick={handleAddEducation}
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

export default AddEducationForm;
