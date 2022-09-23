import { useContext } from "react";
import { Context } from "../../../context";
import AdminRoute from "../../../components/routes/AdminRoutes";


const DeveloperCreate = () => {
    const {
        state: { user },
    } = useContext(Context);

    return (
        <AdminRoute>
            <h1 className="jumbotron text-center square">Admin Developers Dashboard</h1>
        </AdminRoute>
    );
};

export default DeveloperCreate;