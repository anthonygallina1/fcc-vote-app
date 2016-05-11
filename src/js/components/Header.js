import React, { PropTypes, Component } from 'react'

class Header extends Component {
    constructor() {
        super();
        var userDIV = document.querySelector('[data-user]');
        this.state = {
            loggedIn: !userDIV ? 0: 1
        };
    }
    render() {
        var links = [
            <a href="/auth/github">Login</a>,
            <a href="/logout">Logout</a>
        ][this.state.loggedIn];
        return (
          <header>
            <h3>{ this.props.title }</h3>
            <nav>
                {
                 links   
                }
            </nav>
          </header>
        );
    }
}

// const Header = ({ title }) => (
//   <header>
//     <h3>{ title }</h3>
//     <nav>
//         <a href="/auth/github">Login</a>
//     </nav>
//   </header>
// );

export default Header;