import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

var GoogleMap = require('google-distance-matrix');


    

const { compose, withProps, lifecycle } = require("recompose");


class HomePage extends React.Component {

     constructor(props) {
        super(props);

        this.state = {
            user: {
                descripcion: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        
    }

    handleSubmit(event) {

    const component = this
    // const { address, dest } = this.state
    var address = ['San Francisco CA', '40.7421,-73.9914'];
    let dest = ['San Francisco CA', '40.7423,-73.9916'];

    event.preventDefault()
    // console.log(event)
    GoogleMap.matrix(address, dest, function (err, distances) {
        distance.key('AIzaSyC9wOCPnkqLkz9eyApmISGb6fLBMicxf70');
        distance.units('imperial');
        console.log("address");
        console.log(dest);
        console.log(err);
        console.log(distances);
        if (err) {
            return console.log(err);
        }
        if(!distances) {
            return console.log('no distances');
        }

        if (distances.status == 'OK') {
            if(distances.rows[0].elements[0])  {
                var distance = distances.rows[0].elements[0].duration['text'];
                console.log(distance);
                component.setState({
                    foundDistance: true,
                    distanceText: distance
                });
            }
        }
    }).bind(this);
              
    }



    


    render() {

        const { user, users } = this.props;
        const { registering  } = this.props;
        const { submitted } = this.state;


        


        return (
            <div className="col-md-12">
                <div className="col-md-10">
                <h3>Bienvenido {user.firstName}!</h3>
               </div>
               <div className="col-md-2">
                <p>
                    <Link to="/login">Salir</Link>
                </p>
               </div>
               <div className="col-md-12">
                <h2>Crear Servicio</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.descripcion ? ' has-error' : '')}>
                        <label htmlFor="Descripcion">Descripcion</label>
                        <textarea type="text" className="form-control" name="descripcion" value={user.descripcion} onChange={this.handleChange} />
                        {submitted && !user.descripcion &&
                            <div className="help-block">La descripcion es requerida</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.direccionOrigen ? ' has-error' : '')}>
                        <label htmlFor="direccionOrigen">Direccion Origen</label>
                        <input type="text" className="form-control" name="direccionOrigen" value={user.direccionOrigen} onChange={this.handleChange} />
                        {submitted && !user.direccionOrigen &&
                            <div className="help-block">La direccion de origen es requerida</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.direccionDestino ? ' has-error' : '')}>
                        <label htmlFor="direccionDestino">Direccion Destino</label>
                        <input type="text" className="form-control" name="direccionDestino" value={user.direccionDestino} onChange={this.handleChange} />
                        {submitted && !user.direccionDestino &&
                            <div className="help-block">La direccion de destino es requerida</div>
                        }
                    </div>

                    <div>
                        
                    </div>

                    <div className="form-group">
                      {"\n"}
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">Guardar</button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        
                    </div>
                </form>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };