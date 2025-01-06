import { Outlet } from "react-router-dom"
import AdminLayout from "../../hoc/adminlayout"

const Dashboard = () => {
    return(
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    )
}

export default Dashboard