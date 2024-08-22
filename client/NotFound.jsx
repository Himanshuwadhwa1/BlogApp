import { Link } from "react-router-dom";

export default function NotFound(){
    return (
        <div>
            <h1>Page Not Found</h1>
            <p>Sorry, we couldn't find the page you were looking for.</p>
            <Link to={'/'}>Return to Home</Link>
        </div>
    )
}