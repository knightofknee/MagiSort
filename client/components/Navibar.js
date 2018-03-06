import React from 'react';
//import { connect } from 'react-redux';
import { Navbar, NavItem, Row, Chip } from 'react-materialize';
import { NavLink } from 'react-router-dom';


export default function Navibar() {

  return (
    <div>
      <Navbar brand='PenSieve' right>
        <NavItem href='get-started.html'>About</NavItem>
        <NavItem href='components.html'>Contact</NavItem>
      </Navbar>
    </div>
  )
}
