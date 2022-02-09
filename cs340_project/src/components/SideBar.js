// sidebar.js

import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item">Beaver Development User Database Tables</a>
      <a className="menu-item">Project Step 3 Draft</a>
      <a className="menu-item">CS 340: Intro to Databases</a>
      <a className="menu-item">Group 93</a>
      <a className="menu-item">Russell Feathers</a>
      <a className="menu-item">Jonathon Shea</a>
      <a className="menu-item">Due Date: 02/10/22</a>
    </Menu>
  );
};