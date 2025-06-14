import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import "./NavBar.css";
import { useUser } from "../../context/User";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export default function NavBar() {
  const { logout, user } = useUser();
  const nav = useNavigate();
  const mobile = !useMediaQuery({ query: '(min-width: 700px)' });
  const [menu, setMenu] = useState(false);
  const [showChildren, setShowChildren] = useState('');
  const [message, setMessage] = useState(null);
  if (message) console.log(message);

  const navItems = [
    {
      title: 'HOME',
      link: '/'
    },
    {
      title: 'LEAGUE',
      link: '/league',
      children: [
        {
          title: 'RULES',
          link: '/league/rules'
        },
        {
          title: 'HISTORY',
          link: '/league/history'
        },
      ]
    },
    {
      title: 'SCHEDULE',
      link: '/schedule'
    },
    {
      title: 'PHOTOS',
      link: '/photos'
    },
  ]

  async function handleLogout() {
    logout({setMessage}).then((res) => {if (res) nav(0)});
  }

  function toggleMenu() {
    if (menu) setMenu(false);
    else setMenu(true);
  }

  function changeChildren(parent) {
    if (parent) setShowChildren(parent);
    else setShowChildren('')
  }

  return (
    <div id='mainConN'>
    {!mobile ?
      <div className="navConN">
        {navItems.map((navItem, iNavItem) => (
          <div 
            key={`navLinkN${iNavItem}`} 
            onMouseEnter={()=>changeChildren(navItem.title)} 
            onMouseLeave={()=>changeChildren()}
          >
            <a className="navLinkN"  href={navItem.link}>
              <h3 className="navItem">{navItem.title}</h3>
            </a>
            {navItem.children && (
              <div className="navConN childCon" hidden={showChildren !== navItem.title}>
                {navItem.children.map((navChild, iNavChild) => (
                  <a 
                  className="navLinkN childLink" 
                  key={`navChildN${iNavChild}`}
                  href={navChild.link}
                >
                  <h3 className="navItem childItem ">{navChild.title}</h3>
                </a>
                ))}
              </div>
            )}
          </div>
          
          
        ))}
        {user && <button className="logOutButton" onClick={handleLogout}>Logout</button>}
      </div>
    :
      <>
        <div id="navMobileDashN">
          <div id="navLogoConN">
            <img id="navLogoN" src="" alt="" />
          </div>
          <div id="mobileButtonN" onClick={toggleMenu}>
            {!menu ? <IoMenu className="mobileButtonIconN"/> :  <IoMdClose className="mobileButtonIconN"/>}
          </div>
        </div>
        <div hidden={menu} className="navConN mobileConN">
        {navItems.map((navItem, iNavItem) => (
            <div key={`navLinkN${iNavItem}`} onMouseEnter={()=>changeChildren(navItem.title)} onMouseLeave={()=>changeChildren()}>
              <a className="navLinkN mobileLinkN"  href={navItem.link} >
                <h3 className="navItem mobileItemN">{navItem.title}</h3>
              </a>
              {navItem.children && (
                <div  className="navConN childCon mobileConN" hidden={showChildren !== navItem.title}>
                  {navItem.children.map((navChild, iNavChild) => (
                    <a 
                    className="navLinkN childLink mobileLinkN" 
                    key={`navChildN${iNavChild}`}
                    href={navChild.link}
                  >
                    <h3 className="navItem childItem mobileItemN">{navChild.title}</h3>
                  </a>
                  ))}
                </div>
              )}
            </div>
            
            
          ))}
          {user && <button className="logOutButton mobileLogoutBnN" onClick={handleLogout}>Logout</button>}
        </div>
      </>
    }
      
      
    
    </div>
  );
}