import React from 'react';
import { ReactComponent as logo } from "./logo.svg";

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';


const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          SoccerIQ
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/feature1' activeStyle>
            T-Analysis
          </NavLink>
          <NavLink to='/feature2' activeStyle>
            S-Player
          </NavLink>
          <NavLink to='/feature3' activeStyle>
            Feature 3
          </NavLink>
          <NavLink to='/feature4' activeStyle>
            Scout
          </NavLink>
          <NavLink to='/feature5' activeStyle>
            Build
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        {/*<NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
  </NavBtn>*/}
      </Nav>
    </>
  );
};

export default Navbar;