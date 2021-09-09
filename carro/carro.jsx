import React from 'react';
import './carro.css';
import { Container, Row, Col, Button } from 'reactstrap';
import * as request from 'superagent';

class Carro extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            anos: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
            meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            num: 0,
            funcion: <div class="spinner-border text-success" role="status" style={{display: 'block', margin: '0 auto', marginTop: '40px'}}>
                        <span class="sr-only">Loading...</span>
                    </div>,
            funcion2: <div class="spinner-border text-success" role="status" style={{display: 'block', margin: '0 auto', marginTop: '40px'}}>
                        <span class="sr-only">Loading...</span>
                    </div>,
            array: []
        }
    }

    render(){
        return(
            <div id="cuerpoCarri">
                <h5 id="reportePer">Reporte de Persona 1</h5>
                <div className="row" style={{marginTop: '30px'}}>
                    <div className="col-6">
                        <div id="primeraParte">
                            <button type="button" id="botonAno" class="btn btn-success" style={{height: '50px', width: '60%'}} data-toggle="dropdown">Año</button>
                            <div class="dropdown-menu dropItems2" aria-labelledby="dropdownMenuButton">
                                {this.state.anos.map((ano, key) =>
                                   <a class="dropdown-item" name={ano} key={key} onClick={this.ano.bind(this)}>{ano}</a> 
                                )}
                            </div>
                            <div style={{height: '600px', overflowY: 'auto', marginTop: '30px'}}>
                                <table class="table table-borderless">
                                    <tbody id='tableas'>
                                        {this.state.funcion2}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        {this.state.funcion}
                    </div>
                </div>
            </div>
        )
    }

    ano (event) {
        document.getElementById('botonAno').innerHTML = event.target.name;
        document.getElementById('tableas').innerHTML = '';
        this.setState({funcion2: this.pagos()})
    }

    datosPersona (datos) {
        return(
            <div id="segundaParte">
                <div className="row">
                    <div className="col-6">
                        <div style={{width: '90%'}}>
                            <img src="https://res.cloudinary.com/indev/image/upload/v1592788870/Assets/user_xgwob4.png"  width="85%" style={{margin: '0 auto', display: 'block'}}/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div style={{width: '90%', paddingTop: '20px'}}>
                            <p id="nombrePer" className="datosPer">Nombre: {datos.name}</p>
                            <p id="apellidoPer" className="datosPer">Apellidos: {datos.lastname} </p>
                            <p id="edadPer" className="datosPer">Fecha de nacimiento: {datos.birthdate} </p>
                        </div>
                    </div>
                </div>
                <div style={{width: '85%', margin: '0 auto', marginTop: '10px'}}>
                    <p className="datosPer"><strong>{datos.category.name}</strong></p>
                    <p id="correoPer" className="datosPer">Correo: {datos.email} </p>
                    <p id="numeroPer" className="datosPer">Teléfono: {datos.phone} </p>
                    <p id="direccionPer" className="datosPer">Dirección: {datos.address} </p>
                    <p id="aportePer" className="datosPer">Total de aporte: ${this.state.aporte.toFixed(2)} </p>
                    <p id="deudaPer" className="datosPer">Deuda: ${this.state.deuda.toFixed(2)} </p>
                    <p className="datosPer">Fecha de entrada: {datos.enrollmentDate}</p>
                    <p id="tiempoPer" className="datosPer">Tiempo como socio: {this.state.tiempo} meses</p>
                </div>
                <div class="modal fade" id="confirModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body" style={{textAlign: 'center'}}>
                            ¿Desea confirmar el pago?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" onClick={this.pagar2.bind(this)} class="btn btn-primary" data-dismiss="modal" style={{backgroundColor: 'rgb(40, 167, 69)', borderColor: 'rgb(40, 167, 69)'}}>Confirmar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    pagos () {
        let boton = <button type="button" class="btn btn-success" style={{borderRadius: "20px", backgroundColor: 'rgb(40, 167, 69)', borderColor: 'rgb(40, 167, 69)'}}>Pagado</button>;
        let pagar = '';
        this.state.meses.map((mes, key) => {
            if (parseFloat(document.getElementById('botonAno').innerText) < parseFloat(this.state.pagosDone[0].year)) {
                boton = '';
            } else if (parseFloat(document.getElementById('botonAno').innerText) > parseFloat(this.state.pagosDone[0].year)) {
                if (parseFloat(document.getElementById('botonAno').innerText) < parseFloat(this.state.pagosDone[this.state.anoLast].year)) {
                    boton = <button type="button" class="btn btn-success" style={{borderRadius: "20px", backgroundColor: 'rgb(40, 167, 69)', borderColor: 'rgb(40, 167, 69)'}}>Pagado</button>;
                } else if (parseFloat(document.getElementById('botonAno').innerText) > parseFloat(this.state.pagosDone[this.state.anoLast].year)) {
                    boton = <button type="button" class="btn btn-success" style={{borderRadius: "20px", backgroundColor: 'rgb(103, 0, 103)', borderColor: 'rgb(103, 0, 103)'}}>Pendiente</button>
                    pagar = <p>Pagar</p>;
                } else if (parseFloat(document.getElementById('botonAno').innerText) === parseFloat(this.state.pagosDone[this.state.anoLast].year)) {
                    if (this.state.pagosDone[this.state.anoLast].month.id < key) {
                        if (this.state.mesHoy > this.state.pagosDone[this.state.anoLast].month.id) {
                            boton = <button type="button" class="btn btn-success" style={{borderRadius: "20px", backgroundColor: 'rgb(103, 0, 103)', borderColor: 'rgb(103, 0, 103)'}}>Pendiente</button>
                            pagar = <p>Pagar</p>;
                        } else {
                            boton = <button type="button" class="btn btn-success" style={{borderRadius: "20px", backgroundColor: '#B20000', borderColor: '#B20000'}}>Pendiente</button>
                            pagar = <p>Pagar</p>;
                        }
                    } else {
                        boton = <button type="button" class="btn btn-success" style={{borderRadius: "20px", backgroundColor: 'rgb(40, 167, 69)', borderColor: 'rgb(40, 167, 69)'}}>Pagado</button>;
                        pagar = '';
                    }
                }
            } else if (parseFloat(document.getElementById('botonAno').innerText) === parseFloat(this.state.pagosDone[0].year)) {
                if (parseFloat(document.getElementById('botonAno').innerText) === parseFloat(this.state.pagosDone[this.state.anoLast].year)) {
                    if (this.state.pagosDone[0].month.id > key) {
                        boton = '';
                        pagar = '';
                    } else if (this.state.pagosDone[this.state.anoLast].month.id >= key) {
                        boton = <button type="button" class="btn btn-success" style={{borderRadius: "20px", backgroundColor: 'rgb(40, 167, 69)', borderColor: 'rgb(40, 167, 69)'}}>Pagado</button>;
                        pagar = '';
                    } else {
                        if (key <= this.state.mesHoy) {
                            boton = <button type="button" class="btn btn-success" style={{borderRadius: "20px", backgroundColor: '#B20000', borderColor: '#B20000'}}>Pendiente</button>
                            pagar = <p>Pagar</p>;
                        } else {
                            boton = <button type="button" class="btn btn-success" style={{borderRadius: "20px", backgroundColor: 'rgb(103, 0, 103)', borderColor: 'rgb(103, 0, 103)'}}>Pendiente</button>
                            pagar = <p>Pagar</p>;
                        }
                    }
                } else {
                    if (this.state.pagosDone[0].month.id === key) {
                        boton = <button type="button" class="btn btn-success" style={{borderRadius: "20px", backgroundColor: 'rgb(40, 167, 69)', borderColor: 'rgb(40, 167, 69)'}}>Pagado</button>;
                        pagar = '';
                    } else {
                        boton = '';
                        pagar = '';
                    }
                }
            }
            const html = 
                <tr key={key.toString() + 'ano' + document.getElementById('botonAno').innerText}>
                    <td>{key+1}</td>
                    <td>{mes}</td>
                    <td>
                        {boton}
                    </td>
                    <td className="pagarff" data-toggle="tooltip" data-placement="bottom" title="Pagar"
                    onClick={this.pagar.bind(this, {monthId: key, memberId: window.localStorage.getItem('idMiembro'), year: parseFloat(document.getElementById('botonAno').innerText)})}
                    >
                        {pagar}
                    </td>
                </tr>
            ;
            this.state.array.push(html);
        });
        return(
            this.state.array.map((html) => 
                html
            )
        )
    }

    pagar(datos, event) {
        if (event.target.innerText){
            $("#confirModal").modal()
            this.setState({pagarDatos: datos});
        }
    }
    pagar2() {
        console.log(this.state.pagarDatos);
        request
            .post(`${process.env.API_URL}/api/payments`)
            .set({'Authorization': window.sessionStorage.getItem('token')})
            .send(this.state.pagarDatos)
            .then(res => {
                console.log(res.body);
                alert('Pago guardado con éxito');
                window.location.reload();
            })
            .catch(err => alert('No se pudo registrar el pago'));
    }

    componentDidMount(){
        request
            .get(`${process.env.API_URL}/api/members/` + window.localStorage.getItem('idMiembro'))
            .set({'Content-Type':'aplication/json'})
            .set({'Authorization': window.sessionStorage.getItem('token')})
            .then(res => {
                const fechaEntrada = new Date(res.body.data.enrollmentDate);
                this.setState({fechaInicio: fechaEntrada});
                document.getElementById('reportePer').innerHTML = 'Reporte de ' + res.body.data.name + ' ' + res.body.data.lastname;
                request
                    .get(`${process.env.API_URL}/api/payments/` + window.localStorage.getItem('idMiembro'))
                    .set({'Content-Type':'aplication/json'})
                    .set({'Authorization': window.sessionStorage.getItem('token')})
                    .then(data => { 
                        console.log(data.body);
                        const fehcaActual = new Date();
                        const ano = fehcaActual.getFullYear() - fechaEntrada.getFullYear();
                        let suma = 0;
                        if (ano > 0) {
                            suma = (ano*12) - ((11 - fehcaActual.getMonth()) + fechaEntrada.getMonth());
                        } else {
                            suma = 12 - ((11 - fehcaActual.getMonth()) + fechaEntrada.getMonth());
                        }
                        this.setState({tiempo: suma});
                        this.setState({aporte: (data.body.data.length) * 5});
                        this.setState({anoLast: (data.body.data.length) - 1});
                        this.setState({mesHoy: fehcaActual.getMonth()});
                        this.setState({anoHoy: fehcaActual.getFullYear()});
                        this.setState({mesHoy: fehcaActual.getMonth()});
                        this.setState({anoHoy: fehcaActual.getFullYear()});
                        request
                            .get(`${process.env.API_URL}/api/payments/pending/` + window.localStorage.getItem('idMiembro'))
                            .set({'Content-Type':'aplication/json'})
                            .set({'Authorization': window.sessionStorage.getItem('token')})
                            .then(add => {
                                this.setState({pagosF: add.body.data});
                                this.setState({deuda: (add.body.data.length) * 5});
                                this.setState({funcion: this.datosPersona(res.body.data)});
                                this.setState({pagosDone: data.body.data});
                                document.getElementById('botonAno').innerHTML = this.state.pagosDone[this.state.anoLast].year;
                                this.setState({funcion2: this.pagos()});
                            })
                            .catch(err => {
                                this.setState({deuda: 0});
                                this.setState({funcion2: this.pagos()});
                                this.setState({funcion: this.datosPersona(res.body.data)});
                            });
                    });
            });
    }
}

export default Carro;