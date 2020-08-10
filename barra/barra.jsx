import React from 'react';
import './barra.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import {Link, BrowserRouter as Router, NavLink} from 'react-router-dom';

class Barra extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div id = "barrera">
            <Navbar color="light" light expand="md" id="barraPrincipal">
                <NavbarBrand href="/" id="tituloCaza">Club de Caza y Pezca</NavbarBrand>
                <Nav className="ml-auto" navbar>
                        <li className="nav-item" id="inicio">
                            <NavLink to="/"><img src="https://res.cloudinary.com/indev/image/upload/v1571765658/frutas/menu_zkmset.png" width="45%" /></NavLink>
                        </li>
                        <NavLink to="/socioNuevo" id="carrito"><i class="fas fa-user-plus icon2"></i>{this.props.numero}</NavLink>
                        <NavItem id="logout">
                            <a onClick={this.logout.bind(this)}><img src="https://res.cloudinary.com/indev/image/upload/v1571765658/frutas/logout_vpqcz9.png" width="45%"/></a>
                        </NavItem>
                </Nav>
            </Navbar>
            <div>{this.props.children}</div>
        </div>
        );
    }

    logout(){
        window.localStorage.removeItem("token");
        window.history.pushState(null, '', '/');
        window.location.reload();
    }
}

export default Barra;