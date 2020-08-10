import React from 'react';
import './socioNuevo.css';
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
import * as request from 'superagent';
import { Redirect, NavLink } from 'react-router-dom';

class SocioNuevo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            object: {
                name: '',
                lastname: '',
                birthdate: '',
                ci: '',
                nationality: '',
                enrollmentDate: new Date(),
                address: '',
                occupation: '',
                phone: '',
                email: '',
                maritalStatusId: 0,
                categoryId: 0,
                bloodtypeId: 0,
                activities: [],
            },
            objeto: new FormData(),
            estados: [],
            cat: [],
            blood: [],
            act: [],
            texto: '',
            redirect: false
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to="/"/>
        }
        return(
            <div id="socioCuerpo">
                <div id="headSocio">
                    <h5>Agregar Nuevo Socio</h5>
                </div>
                <div id="cuerpoSocio">
                    <div>
                        <form class="form-row" onSubmit={this.crear.bind(this)}>
                            <div class="form-group col-md-6">
                                <label for="file">Foto</label>
                                <input type="file" class="form-control-file" id="file" onChange={this.img.bind(this)}/>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="name">Nombres</label>
                                <input type="text" class="form-control" id="name" onChange={this.nombre.bind(this)} required/>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="lastName">Apellidos</label>
                                <input type="type" class="form-control" id="lastname" onChange={this.last.bind(this)} required/>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="cumpleanos">Año de nacimiento</label>
                                <input type="date" class="form-control" id="cumpleanos" onChange={this.cumpleanos.bind(this)} required/>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="ci">Cédula</label>
                                <input type="text" class="form-control" id="ci" onChange={this.ci.bind(this)} maxLength="10d" required/>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="pais">Nacionalidad</label>
                                <input type="text" class="form-control" id="pais" onChange={this.nacionalidad.bind(this)} required/>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="direc">Dirección</label>
                                <input type="text" class="form-control" id="direc" onChange={this.dir.bind(this)} required/>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="direc">Ocupación</label>
                                <input type="work" class="form-control" id="work" onChange={this.ocupa.bind(this)} required/>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="tel">Teléfono</label>
                                <input type="text" class="form-control" id="tel" onChange={this.tel.bind(this)} required/>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="mail">Correo</label>
                                <input type="work" class="form-control" id="mail" onChange={this.correo.bind(this)} required/>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="direc">Estado civil</label>
                                <select class="form-control" id="direc" onChange={this.estado.bind(this)} required>
                                    <option id="optionDir">...</option>
                                    {this.state.estados.map((item, key) =>
                                        <option key={key} value={item.id}>{item.name}</option>
                                    )}
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="cat">Categoria</label>
                                <select class="form-control" id="cat" onChange={this.cat.bind(this)} required>
                                    <option id="optionCat">...</option>
                                    {this.state.cat.map((item, key) =>
                                        <option key={key} value={item.id}>{item.name}</option>
                                    )}
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="blood">Tipo de sangre</label>
                                <select class="form-control" id="blood" onChange={this.blood.bind(this)} required>
                                    <option id="optionBlood">...</option>
                                    {this.state.blood.map((item, key) =>
                                        <option key={key} value={item.id}>{item.name}</option>
                                    )}
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label htmlFor="act">Actividades</label>
                                <div class="input-group" style={{marginBottom: '40px'}}>
                                    <input type="search" class="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" id="act" data-toggle="dropdown" required/>
                                    <div class="dropdown-menu" aria-labelledby="act">
                                        {this.state.act.map((item, key) =>
                                            <a class="dropdown-item" onClick={this.act.bind(this)} name={item.name} key={key} lang={item.id}>{item.name}</a>
                                        )}
                                    </div>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.eliminar.bind(this)}><i class="fa fa-close"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-md-12">
                                <button type="submit" class="btn btn-primary" style={{backgroundColor: 'rgb(40, 167, 69)', borderColor: 'rgb(40, 167, 69)', marginRight: '30px'}}>Continuar</button>
                                <NavLink to="/"><button type="button" class="btn btn-secondary">Cancelar</button></NavLink>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal fade" id="confirAgregar" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body" style={{textAlign: 'center'}}>
                            ¿Desea agregar a este socio?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-primary" onClick={this.send.bind(this)} data-dismiss="modal" style={{backgroundColor: 'rgb(40, 167, 69)', borderColor: 'rgb(40, 167, 69)'}}>Confirmar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    img (file) {
        console.log(file.target.files[0]);
        const img = file.target.files[0];
        this.state.objeto.append('img', img);
    }

    nombre (event) {
        this.state.object.name = event.target.value;
    }

    last (event) {
        this.state.object.lastname = event.target.value;
    }

    cumpleanos (event) {
        this.state.object.birthdate = new Date(event.target.value).toISOString();
    }

    ci (event) {
        this.state.object.ci = event.target.value;
    }

    nacionalidad (event) {
        this.state.object.nationality = event.target.value;
    }

    dir (event) {
        this.state.object.address = event.target.value;
    }

    ocupa (event) {
        this.state.object.occupation = event.target.value;
    }

    tel (event) {
        this.state.object.phone = event.target.value;
    }

    correo (event) {
        this.state.object.email = event.target.value;
    }

    estado (event) {
        this.state.object.maritalStatusId = parseInt(event.target.value);
    }

    cat (event) {
        this.state.object.categoryId = parseInt(event.target.value);
    }

    blood (event) {
        this.state.object.bloodtypeId = parseInt(event.target.value);
    }

    act (event) {
        this.state.texto = this.state.texto + event.target.name + ' - ';
        document.getElementById('act').value = this.state.texto;
        this.state.object.activities.push(event.target.lang);
        this.state.objeto.append('activities', event.target.lang);
        console.log(this.state.objeto.getAll('activities'));
    }

    eliminar (event) {
        document.getElementById('act').value = '';
        this.state.object.activities = [];
        console.log(this.state.object.activities);
        this.state.objeto.delete('activities');
        this.state.texto = '';
    }

    crear (event) {
        $("#confirAgregar").modal()
        event.preventDefault()
    }

    send () {
        console.log(this.state.object);
        
        this.state.objeto.append('name', this.state.object.name);
        this.state.objeto.append('lastname', this.state.object.lastname);
        this.state.objeto.append('ci', this.state.object.ci);
        this.state.objeto.append('nationality', this.state.object.nationality);
        this.state.objeto.append('address', this.state.object.address);
        this.state.objeto.append('occupation', this.state.object.occupation);
        this.state.objeto.append('phone', this.state.object.phone);
        this.state.objeto.append('email', this.state.object.email);
        this.state.objeto.append('birthdate', this.state.object.birthdate);
        this.state.objeto.append('maritalStatusId', this.state.object.maritalStatusId);
        this.state.objeto.append('categoryId', this.state.object.categoryId);
        this.state.objeto.append('bloodtypeId', this.state.object.bloodtypeId);

        console.log(this.state.objeto.getAll('name'));
        if (window.localStorage.getItem('via')) {
            request
                .put('http://clubcptloja.com/api/members/' + window.localStorage.getItem('idMiembro'))
                .set({'Authorization': window.sessionStorage.getItem('token')})
                .send(this.state.objeto)
                .then(res => {
                    console.log(res.body);
                    alert('Socio actualizado corréctamente');
                    this.setState({redirect: true});
                })
                .catch(err => alert('Error al actualizar, revise los datos'));
        } else {
            request
                .post('http://clubcptloja.com/api/members')
                .set({'Authorization': window.sessionStorage.getItem('token')})
                .send(this.state.objeto)
                .then(res => {
                    console.log(res.body);
                    alert('Socio agregado corréctamente');
                    this.setState({redirect: true});
                })
                .catch(err => alert('Error al crear, revise los datos'));
        }
    }

    componentDidMount () {
        if (window.localStorage.getItem('via')) {
            console.log(window.sessionStorage.getItem('idMiembro'));
            request
                .get('http://clubcptloja.com/api/members/' + window.localStorage.getItem('idMiembro'))
                .set({'Content-Type':'aplication/json'})
                .set({'Authorization': window.sessionStorage.getItem('token')})
                .then(res => {
                    console.log(res.body);
                    this.state.object.name = res.body.data.name;
                    this.state.object.lastname = res.body.data.lastname;
                    this.state.object.ci = res.body.data.ci;
                    this.state.object.nationality = res.body.data.nationality;
                    this.state.object.address = res.body.data.address;
                    this.state.object.occupation = res.body.data.occupation;
                    this.state.object.phone = res.body.data.phone;
                    this.state.object.email = res.body.data.email;
                    this.state.object.birthdate = res.body.data.birthdate;
                    this.state.object.maritalStatusId = res.body.data.maritalStatus.id;
                    this.state.object.categoryId = res.body.data.category.id;
                    this.state.object.bloodtypeId = res.body.data.bloodtype.id;
                    res.body.data.activities.map((act) => {
                        this.state.objeto.append('activities', act.id);
                        this.state.texto = this.state.texto + act.name + ' - ';
                    });

                    document.getElementById('name').value = res.body.data.name;
                    document.getElementById('lastname').value = res.body.data.lastname;
                    document.getElementById('cumpleanos').value = res.body.data.birthdate;
                    document.getElementById('ci').value = res.body.data.ci;
                    document.getElementById('pais').value = res.body.data.nationality;
                    document.getElementById('direc').value = res.body.data.address;
                    document.getElementById('work').value = res.body.data.occupation;
                    document.getElementById('tel').value = res.body.data.phone;
                    document.getElementById('mail').value = res.body.data.email;
                    document.getElementById('name').value = res.body.data.name;
                    document.getElementById('optionDir').innerHTML = res.body.data.maritalStatus.name;
                    document.getElementById('optionCat').innerHTML = res.body.data.category.name;
                    document.getElementById('optionBlood').innerHTML = res.body.data.bloodtype.name;
                    document.getElementById('act').value = this.state.texto;
                });
        }
        request
         .get('http://clubcptloja.com/api/catalogs/maritalstatuses')
         .set({'Content-Type':'aplication/json'})
         .then(res => {
             this.setState({estados: res.body.data})
         });
         request
         .get('http://clubcptloja.com/api/catalogs/categories')
         .set({'Content-Type':'aplication/json'})
         .then(res => {
             this.setState({cat: res.body.data})
         });
         request
         .get('http://clubcptloja.com/api/catalogs/bloodtypes')
         .set({'Content-Type':'aplication/json'})
         .then(res => {
             this.setState({blood: res.body.data})
         });
         request
         .get('http://clubcptloja.com/api/catalogs/activities')
         .set({'Content-Type':'aplication/json'})
         .then(res => {
             this.setState({act: res.body.data})
         });
    }
}

export default SocioNuevo;