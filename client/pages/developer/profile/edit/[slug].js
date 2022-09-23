import { useState, useEffect } from "react";
import axios from "axios";
import DeveloperRoute from "../../../../components/routes/DeveloperRoutes";
import ProfileCreateForm from "../../../../components/forms/ProfileCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


const ProfileEdit = () => {
    // state
    const [values, setValues] = useState({
        name: "",
        gender: true,
        hour: "40",
        rate: "50.00",
        uploading: false,
        currency: true,
        link: "",
        loading: false,
    });
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

    // router
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        loadProfile();
    }, [slug]);

    const loadProfile = async () => {
        const { data } = await axios.get(`/api/profile/${slug}`);
        setValues(data);
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(values);
            const { data } = await axios.post("/api/profile", {
                ...values,
                image,
            });
            toast("Great! Now you can start adding profile");
            router.push("/developer");
        } catch (err) {
            toast(err.response.data);
        }
    };


    return (
        <DeveloperRoute>
            <h1 className="jumbotron text-center square">Update Profile</h1>
            {/* {JSON.stringify(values, null, 4)} */}
            <div className="pt-3 pb-3">
                <ProfileCreateForm
                    handleSubmit={handleSubmit}
                    handleImage={handleImage}
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                    preview={preview}
                    uploadButtonText={uploadButtonText}
                    handleImageRemove={handleImageRemove}
                />
            </div>
            {/* <pre>{JSON.stringify(values, null, 4)}</pre>
            <hr />
            <pre>{JSON.stringify(image, null, 4)}</pre> */}
        </DeveloperRoute>
    );
};

export default ProfileEdit;
