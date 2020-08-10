import React from 'react';
import './login.css';
import * as request from 'superagent';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          objecto: {
            email: '',
            password: ''
          }
        }
    }
    render(){
        return(
            <Form id="login">
              <div>
                <h2>Iniciar Sesión</h2>
              </div>
              <FormGroup>
                <Label for="exampleEmail" id="email">Email</Label>
                <Input type="email" name="email" id="exampleEmail" onChange={this.textEmail.bind(this)} placeholder="Ingresar usuario" />
                <small id="emailHelp" nameclass="form-text text-muted" hidden>Email incorrecto.</small>
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword" id="key">Password</Label>
                <Input type="password" name="password" id="examplePassword" onChange={this.textKey.bind(this)} placeholder="Ingresar Contraseña" />
                <small id="pass" nameclass="form-text text-muted" hidden>Contraseña incorrecta.</small>
              </FormGroup>
              <button type="button" className="btn btn-success" onClick={this.send.bind(this)} id="ingresar">Ingresar</button>
              <small id="passAndC" nameclass="form-text text-muted" hidden>Contraseña o  email incorrecto.</small>
            </Form>
        );
    }
    componentDidMount(){
      window.localStorage.setItem('usuario', 'admin@admin.com');
      window.localStorage.setItem('key', 'admin');
    }
    textEmail(event){
      this.state.objecto.email = event.target.value;
    }

    textKey(event){
      this.state.objecto.password = event.target.value;
    }

    send(){
      if (this.state.objecto.email) {
        document.getElementById("emailHelp").setAttribute('hidden', '');
        if (this.state.objecto.password) {
          request
            .post('http://clubcptloja.com/api/auth/login')
            .send(this.state.objecto)
            .then(res => {
              console.log(res);
              window.sessionStorage.setItem("token", res.body.data.accessToken);
              document.getElementById("pass").setAttribute('hidden', '');
              window.location.reload();
            })
            .catch(err => {
              document.getElementById("pass").removeAttribute('hidden');
            });
        }else{
          document.getElementById("pass").removeAttribute('hidden');
        }
      }else{
        document.getElementById("emailHelp").removeAttribute('hidden');
      }
    }
}
export default Login;