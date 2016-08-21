import React from 'react';
import Menu from 'material-ui/lib/menus/menu';
import {Router, Route, IndexRoute, Link} from 'react-router';
import MenuItem from 'material-ui/lib/menus/menu-item';

const style = {
  width: 300,
 
  zIndex: 0,
};

const InnerStyle = {
  padding : 10,
};

var AdminMenu = React.createClass({
 
  
  render: function() {
    return (
      <div className = "menu child" >
        <Menu style={style}>
        <br/><br/>
          <Link to="issue"><MenuItem primaryText="Issue Book" /></Link>
          <br/>
          <Link to="returnbook"><MenuItem primaryText="Return Book " /></Link>
          <br/>
          <Link to="add"><MenuItem primaryText="Add Book" /></Link>
          <br/>
          {/*<Link to="register"><MenuItem primaryText="Register User" /></Link>*/}
          {/*<br/>*/}
          <br/>
        </Menu>
      </div>
    );
  }

});

module.exports = AdminMenu;
