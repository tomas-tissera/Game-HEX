

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "../views/home";
import Error404 from "../views/error 404";
const router = createBrowserRouter([{
    path:"/",
    element: <Home/>,
    errorElement: <Error404/>
}
]);
const MyRoutes = () =><RouterProvider router={router}/>;

export default MyRoutes;