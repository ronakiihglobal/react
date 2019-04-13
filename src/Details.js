import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Details extends Component {

  render() {
    return (

      <div className="user-details">
      	User Id: {this.props.match.params.id}
      	<Link to="/users"><p> Go Back </p></Link>
      </div>
    );
  }
}

export default Details;
