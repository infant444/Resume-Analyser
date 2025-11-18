import { Link } from "react-router"

const Navbar=()=> {
  return (
    <div className="navbar">
        <Link to="/" >
        <p className="text-2xl font-bold text-gradient">RI Build It</p>
        </Link>
        
        <button className="primary-button">Upload Resume</button>
    </div>
  )
}

export default Navbar