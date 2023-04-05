import "./sidebar.css"

export default function Sidebar(){
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
                    <li className="sidebarListItem">life</li>
                    <li className="sidebarListItem">music</li>
                    <li className="sidebarListItem">style</li>
                    <li className="sidebarListItem">sports</li>
                    <li className="sidebarListItem">cinema</li>
                    <li className="sidebarListItem">tech</li>
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sideBarTtitle">FOLLOW US</span>
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