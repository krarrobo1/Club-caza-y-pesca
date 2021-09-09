import React from 'react';
import Login from './login/login.jsx';
import './main.css';
import { Button } from 'reactstrap';
import Barra from './barra/barra.jsx';
import Tabla from './tabla/tabla.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Carro from './carro/carro.jsx';
import SocioNuevo from './socio/socioNuevo.jsx';


class App extends React.Component{
    constructor(){
      super()
      this.state= {
        carrito: "",
        aux: 0
      }
    }

    render(){
      return(
        <Router>
          <div id="opac">
            <div id="barras" hidden>
              <Barra numero={this.state.carrito} />
            </div>
            <div id="espacio"></div>
            <Login id="login"/>
            <div id="cuerpo" hidden>
            <Switch>
                <Route exact path="/" component={Tabla}/>
                <Route path="/perfil" component={Carro}/>
                <Route path="/socioNuevo" component={SocioNuevo}/>
            </Switch>
            </div>
          </div>
        </Router>
      );
    }

    componentDidMount(){
      if(window.sessionStorage.getItem('token')){
        document.getElementById('opac').style.background="url(https://res.cloudinary.com/indev/image/upload/v1583272380/Assets/fishing-mountains-nature-person-102730_rn5zdr.jpg)";
        document.getElementById('login').setAttribute('hidden', '');
        document.getElementById('barras').removeAttribute("hidden");
        document.getElementById('cuerpo').removeAttribute("hidden");
      }
      document.getElementById('opac').style.height = (window.screen.height - 100).toString()+'px';
    }
}

export default App;
