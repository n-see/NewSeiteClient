
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login/Login";
import CreateAccount from "./CreateAccount/CreateAccount";
import Dashboard from "./Dashboard/Dashboard";
import ContactUs from "./ContactUs";
import StudentProfile from "./StudentProfile";
import Layout from "../components/Layout";
import ThankYou from "./ThankYou";

const router = createBrowserRouter([
    
    {path:'/', element: <Layout/>,
        children: [
            {index:true, element: <HomePage/>},
            {path:'CreateAccount' ,element: <CreateAccount/>},
            {path:'Login' ,element: <Login/>},
            {path:'Dashboard', element: <Dashboard/>},
            {path:'Student/:slug', element: <StudentProfile/>},
            {path:'Contact', element: <ContactUs/>},
            {path:'ThankYou', element: <ThankYou/>}

        ]
    }
    // {path:'/Login', element: <Login/>},
    // {path:'/CreateAccount', element: <CreateAccount/>},
    // {path:'/Dashboard', element: <Dashboard/>},
    // {path:'/Student', element: <StudentProfile/>},
    // {path:'/Contact', element: <ContactUs/>},
])

export default router