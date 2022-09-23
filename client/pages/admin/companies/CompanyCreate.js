import { useContext } from "react";
import { Context } from "../../../context";
import AdminRoute from "../../../components/routes/AdminRoutes";


const CompanyCreate = () => {
    const {
        state: { user },
    } = useContext(Context);

    return (
        <AdminRoute>
            <h1 className="jumbotron text-center square">Admin Company Dashboard</h1>
        </AdminRoute>
    );
};

export default CompanyCreate;
