import { Link, useNavigate } from "react-router"

const Navbar=()=> {
  const nav=useNavigate();
  return (
    <div className="navbar">
        <Link to="/" >
        <p className="text-2xl font-bold text-gradient">RI Build It</p>
        </Link>
        
        <button className="primary-button" onClick={()=>{nav('/upload')}}>Upload Resume</button>
    </div>
  )
}

export default Navbar