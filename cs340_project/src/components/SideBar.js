// sidebar.js

import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import beaver from './WinkyBeaverJPG.jpg';

export default props => {
  return (
    <Menu>
      <div>
          <h1 id = "menu-item">Beaver Development Database Tables</h1>
          <img src = {beaver} width ="100" height = "100" alt ="Beaver Pic--TBD"></img>
      </div>
      <a className="menu-item">Beaver Development User Database Tables</a>
      <a className="menu-item">Project Step 6 Draft</a>
      <a className="menu-item">CS 340: Intro to Databases</a>
      <a className="menu-item">Group 93</a>
      <a className="menu-item">Russell Feathers</a>
      <a className="menu-item">Jonathon Shea</a>
      <a className="menu-item">Due Date: 03/10/22</a>
    </Menu>
  );
};