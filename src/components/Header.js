import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useHistory, NavLink } from 'react-router-dom';
import firebase from '../config/firebase';
import AppContext from '../store/AppContext';

export default function Header() {
    const [isLoggedIn] = useContext(AppContext);
    const history = useHistory();

    function logout(){
        firebase.auth().signOut().then(() => {
            history.replace('/login')
          }).catch((error) => {
              //console.log(error)
          });
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky='top' className='p-3 max-width'>
        <Navbar.Brand className='brand' href="/">Citi Gallery</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <NavLink  className="nav" activeClassName='active-nav' exact to="/">Home</NavLink>
            <NavLink className="nav" activeClassName='active-nav' to="/gallery">Gallery</NavLink>
            <NavLink className="nav" activeClassName='active-nav' to="/tensorflow">Tensorflow</NavLink>
            </Nav>
            <Nav>
            {
                isLoggedIn ? <NavLink className="nav" onClick={logout} to="">Logout</NavLink> :
                <Nav>
                    <NavLink className="nav" activeClassName='active-nav' to="/login">Login</NavLink>
                    <NavLink className="nav" activeClassName='active-nav' to="/signup">SignUp</NavLink> 
                </Nav>
            }
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}
