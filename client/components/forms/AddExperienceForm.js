import { Button, Avatar, Badge, Progress, Tooltip } from "antd";
import { CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";


const AddExperienceForm = ({
    experience,
    setExperience,
    handleAddExperience,
    uploading,
}) => {
    return (
        <div className="container pt-3">
            <form onSubmit={handleAddExperience}>
                <label>Job Title</label>
                <input
                    type="text"
                    className="form-control square mb-3"
                    onChange={(e) => setExperience({ ...experience, jobTitle: e.target.value })}
                    values={experience.jobTitle}
                    autoFocus
                    required
                />

                <label>Durations</label>
                <input
                    type="text"
                    className="form-control square mb-3"
                    onChange={(e) => setExperience({ ...experience, durations: e.target.value })}
                    values={experience.durations}
                    autoFocus
                    required
                />

                <label>Responsibility</label>
                <input
                    type="text"
                    className="form-control square mb-3"
                    onChange={(e) => setExperience({ ...experience, responsibility: e.target.value })}
                    values={experience.responsibility}
                    autoFocus
                    required
                />

                <Button
                    onClick={handleAddExperience}
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

export default AddExperienceForm;
