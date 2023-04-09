import { useEffect, useState } from "react"
import "./sidebar.css"
import axios from "axios"
import { Link } from "react-router-dom"

export default function Sidebar(){
    const[cats,setCats] = useState([])

    useEffect(() => {
        const getCats = async ()=>{
            const res = await axios.get("/categories")
            setCats(res.data)
        }
        getCats()
    }, [])
    return(
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sideBarTtitle">ABOUT ME</span>
                <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80" alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, maxime? Dolores alias error neque id debitis omnis, odio sunt consectetur libero placeat ipsam dicta quas ea dolorem laborum laudantium voluptates.</p>
            </div>
            <div className="sidebarItem">
                <span className="sideBarTtitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((c)=>(
                        <Link to={`/?cat=${c.name}`} className="link"><li className="sidebarListItem">{c.name}</li></Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sideBarTtitle">FOLLOW US</ span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-square-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
                    <i className="sidebarIcon fa-brands fa-square-instagram"></i>
                </div>
            </div>
        </div>
    )
}