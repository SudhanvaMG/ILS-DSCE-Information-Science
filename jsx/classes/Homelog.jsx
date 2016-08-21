import React from 'react';
import {Router, Route, IndexRoute, Link} from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';

const style = {
    margin: 12,
};

var Homelog = React.createClass({

  render: function() {
    return (
      <div >
       <h3 id="homePageHeader">Continue As : </h3>
       <br/>
        {/*<Link to="StudentLogin"><RaisedButton  label = "Student" style={style} ></RaisedButton></Link>*/}
        <Link to="AdminLogin"><RaisedButton  label = "Admin"  ></RaisedButton></Link>
      </div>
    );
  }

});

module.exports = Homelog;
