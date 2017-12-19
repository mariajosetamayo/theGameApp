import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    if(this.props.authenticated){
      return <li className='nav-item'>
        <Link className='nav-link' to='/signout'>Sign Out</Link>
      </li>
    } else {
      return [
        <li className='nav-item pull-right' key={1}>
          <Link className='nav-link' to='/signin'>Sign in</Link>
        </li>,
        <li className='nav-item pull-right' key={2}>
          <Link className='nav-link' to='/signup'>Sign up</Link>
        </li>
      ]
    }
  }

  render(){
    return (
      <nav className = "navbar navbar-fixed-top navbar-toggleable-md navBar">
        <div className = "container-fluid">
          <div className="navbar-header">
            <Link to= "/home" className="navbar-brand logo">Game</Link>
          </div>
         <div>
            <ul className="nav navbar-nav pull-right accountLinks">
              {this.renderLinks()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header);
