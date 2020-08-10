import React from 'react';
import './tabla.css';
import { Container, Row, Col, Button } from 'reactstrap';
import * as request from 'superagent';
import {Link, BrowserRouter as Router, NavLink} from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Tabla extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            carrito: 1, 
            meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            anos: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
            function: <td colSpan='5'>
                        <div class="spinner-border text-success" role="status" style={{display: 'block', margin: '0 auto', marginTop: '40px'}}>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </td>,
            redirect: false
        }
    }

    render(){
        if (this.state.redirect) {
            return <Redirect push to="/socioNuevo"/>
        }
        return(
            <div id="cuerposos">
                <div id="head">
                    <div class="input-group mb-3" id="barraBuscar">
                        <div class="input-group-prepend">
                            <button class="btn btn-outline-secondary" type="button" id="button-addon1" style={{height: "40px"}} ><i class="fas fa-search icon"></i></button>
                        </div>
                            <input type="text" onKeyUp={this.buscar.bind(this)} class="form-control" placeholder="Buscar..." aria-label="Example text with button addon" aria-describedby="button-addon1" style={{height: "40px"}}/>
                    </div>
                </div>
                <div id="bodif">
                    <div id="cuerpo" className="row justify-content-around">
                        <div className="col-8">
                            <button type="button" class="btn btn-primary" id="dropEstado" data-toggle="dropdown" style={{backgroundColor: 'rgb(40, 167, 69)', display: 'block', margin: '0 auto', width: '100%', height: "40px", borderColor: 'rgb(40, 167, 69)'}}>Estado</button>
                            <div class="dropdown-menu dropItems" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" name="Todos" onClick={this.estado.bind(this)}>Todos</a>
                                <a class="dropdown-item" name="Pagado" onClick={this.estado.bind(this)}>Pagado</a> 
                                <a class="dropdown-item" name="Pendiente" onClick={this.estado.bind(this)}>Pendiente</a> 
                            </div>
                        </div>
                    </div>
                    <div id="cuerpoTabla">
                    <table class="table" style={{width: '100%', marginTop: '40px'}}>
                        <thead>
                            <tr className="itemsTabla">
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody id="tablaBody">
                            {this.state.function}
                        </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal fade" id="eliminar" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body" style={{textAlign: 'center'}}>
                            ¿Desea eliminar este socio?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-primary" onClick={this.send.bind(this)} data-dismiss="modal" style={{backgroundColor: 'rgb(40, 167, 69)', borderColor: 'rgb(40, 167, 69)'}}>Confirmar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    buscar(event) {
        let aux = [];
        this.state.buscar.map((datos, key) => {
            if (datos.toUpperCase().includes(event.target.value.toUpperCase())) {
                aux.push(this.state.miembros[key]);
            }
        });
        this.setState({function: this.dibujarTabla(aux)});
    }

    estado (event) {
        document.getElementById('dropEstado').innerHTML = event.target.name;
        this.setState({function: <td colSpan='5'>
                                    <div class="spinner-border text-success" role="status" style={{display: 'block', margin: '0 auto', marginTop: '40px'}}>
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </td>
                    })
        let aux = [];
        if (event.target.name == 'Pagado') {
            this.state.miembros.map((miembros) => {
                if (miembros.upToDate){
                    aux.push(miembros);
                }
            });
        } else if (event.target.name == 'Pendiente') {
            this.state.miembros.map((miembros) => {
                if (miembros.upToDate){
                } else {
                    aux.push(miembros);
                }
            }); 
        } else {
            aux = this.state.miembros;
        }
        this.setState({function: this.dibujarTabla(aux)});
    }

    ifPagado (datos) {
        if (datos) {
            return(
                <button type="button" class="btn btn-success" style={{borderRadius: "20px"}}>Pagado</button>
            )
        } else {
            return(
                <button type="button" class="btn btn-success" style={{borderRadius: "20px", backgroundColor: "rgb(103, 0, 103)", borderColor: 'rgb(103, 0, 103)'}}>Pendiente</button>
            )
        }
    }

    pagos (event) {
        window.localStorage.setItem('idMiembro', event.target.lang);
    }

    obtenerMiembro(event) {
        window.localStorage.setItem('idMiembro', event.target.lang);
        window.localStorage.setItem('via', 'edit');
        this.setState({redirect: true});
    }

    delate(event) {
        window.localStorage.setItem('idMiembro', event.target.lang);
    }
    
    send() {
        request
            .delete('http://clubcptloja.com/api/members/' + window.localStorage.getItem('idMiembro'))
            .set({'Authorization': window.sessionStorage.getItem('token')})
            .then(res => {
                console.log(res.body);
                this.setState({function: <td colSpan='5'>
                                            <div class="spinner-border text-success" role="status" style={{display: 'block', margin: '0 auto', marginTop: '40px'}}>
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </td>,
                            })
                request
                    .get('http://clubcptloja.com/api/members')
                    .set({'Content-Type':'aplication/json'})
                    .set({'Authorization': window.sessionStorage.getItem('token')})
                    .then(res => {
                        this.setState({miembros: res.body.data});
                        this.setState({function: this.dibujarTabla(res.body.data)});
                        let aux = [];
                        res.body.data.map((datos) => {
                            const text = datos.name + datos.lastname + datos.ci;
                            aux.push(text);
                        });
                        this.setState({buscar: aux});
                    });
            })
            .catch(err => alert('Error al eliminar, revise los datos'));
    }

    dibujarTabla (datos) {
        console.log(datos);
        return(
            datos.map((data, key) => 
                <tr className="itemsTabla" key={key}>
                    <td scope="row">{key + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>
                        {this.ifPagado(data.upToDate)}
                    </td>
                    <td>
                        <i class="fas fa-ellipsis-h icon2" data-toggle="dropdown"></i>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <NavLink to="/perfil" class="dropdown-item" lang={data.id} onClick={this.pagos.bind(this)}><i class="fas fa-bookmark icon3"></i>Pagos</NavLink>
                            <a class="dropdown-item" lang={data.id} onClick={this.obtenerMiembro.bind(this)}><i class="fas fa-edit icon3"></i>Editar</a>
                            <a class="dropdown-item" data-toggle="modal" data-target="#eliminar" lang={data.id} onClick={this.delate.bind(this)}><i class="fas fa-times icon3"></i>Eliminar</a>
                        </div>
                    </td>
                </tr>
            )
        )
    }

    componentDidMount () {
        window.localStorage.removeItem('via');
        request
         .get('http://clubcptloja.com/api/members')
         .set({'Content-Type':'aplication/json'})
         .set({'Authorization': window.sessionStorage.getItem('token')})
         .then(res => {
             this.setState({miembros: res.body.data});
             this.setState({function: this.dibujarTabla(res.body.data)});
             let aux = [];
             res.body.data.map((datos) => {
                const text = datos.name + datos.lastname + datos.ci;
                aux.push(text);
             });
             this.setState({buscar: aux});
         });
    }

}
export default Tabla;