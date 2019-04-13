import React, { Component } from 'react';
import { Link } from "react-router-dom";


class User extends Component {

  constructor(props){
    super(props)
    this.state = {
      items: [{id:1,name:"name1"},{id:2,name:"name2"},{id:3,name:"name3"}]
    };
  }


  render() {
    return (
      <div className="user-list">
        {this.state.items.map( (item,index) => (
        	<Link key = {index}  to={`${this.props.match.url}/details/${item.id}`}><p> { item.name } </p></Link>
        ))}
      </div>
    );
  }
}

export default User;
