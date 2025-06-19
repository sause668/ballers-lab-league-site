import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import "./NavBar.css";
import { useUser } from "../../context/User";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { SlArrowUp } from "react-icons/sl";


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
    if (menu) {
      setMenu(false);
      setShowChildren('');
    }
    else setMenu(true);
  }

  function toggleChildren(parent) {
    if (showChildren !== parent) setShowChildren(parent);
    else setShowChildren('');
  }

  function changeChildren(parent) {
    if (parent) setShowChildren(parent);
    else setShowChildren('')
  }

  return (
    <div id='mainConN' className="fadein">
    
    {!mobile ?
    // Nav
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
            {/* Children */}
            {navItem.children && (
              <div className={`navConN childConN ${showChildren !== navItem.title && 'hidden'}`}>
                {navItem.children.map((navChild, iNavChild) => (
                  <a 
                  className="navLinkN childLinkN" 
                  key={`navChildN${iNavChild}`}
                  href={navChild.link}
                >
                  <h3 className="navItem childItemN ">{navChild.title}</h3>
                </a>
                ))}
              </div>
            )}
          </div>
        ))}
        {user && <button className="logOutButtonN" onClick={handleLogout}>Logout</button>}
      </div>
    :
    // Mobile
      <>
        <div id="navMobileDashN">
          <a id="navLogoConN" href={'/'}>
            <img id="navLogoN" src="/imgs/logo-main.png" alt="Logo" />
          </a>
          <div id="mobileButtonN" onClick={toggleMenu}>
            {!menu ? <IoMenu className="mobileButtonIconN"/> :  <IoMdClose className="mobileButtonIconN"/>}
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`mobileConN ${!menu && 'hidden'} fadein`}>
        {navItems.map((navItem, iNavItem) => {
            return !navItem.children ? 
            <div key={`navLinkN${iNavItem}`}>
              <a className="mobileLinkN"  href={navItem.link} >
                <h3 className="mobileItemN">{navItem.title}</h3>
                <div className="borderN"/>
              </a>
            </div>
            :
            <div className="mobileConSubN" key={`navLinkN${iNavItem}`}>
              <div className="mobileLinkConN">
                <div className="mobileToggleBnN" onClick={()=>toggleChildren(navItem.title)}>
                  {showChildren !== navItem.title ?
                    <IoIosArrowDown className="toggleIconN"/>
                  :
                    <SlArrowUp className="toggleIconN"/>
                  }
                </div>
                <a className="mobileLinkN"  href={navItem.link} >
                  <h3 className="mobileItemN">{navItem.title}</h3>
                  
                </a>
              </div>
              {/* Children */}
              {navItem.children && (
                <div  className={`mobileConN mobileChildConN ${showChildren !== navItem.title && 'hidden'}`} >
                  {navItem.children.map((navChild, iNavChild) => (
                    <a 
                    className="mobileLinkN mobileChildLinkN" 
                    key={`navChildN${iNavChild}`}
                    href={navChild.link}
                  >
                    <h3 className="mobileItemN mobileChildItemN">{navChild.title}</h3>
                  </a>
                  ))}
                </div>
              )}
              <div className="borderN"/>
            </div>
          })}
          {user && <button className="logOutButtonN mobileLogoutBnN" onClick={handleLogout}>Logout</button>}
        </div>
      </>
    }
      
      
    
    </div>
  );
}