import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const { compose, withProps, lifecycle } = require("recompose");



    
class HomePage extends React.Component {

     constructor(props) {
        super(props);

        this.state = {
            user: {
                descripcion: '',
                direccionOrigen: '',
                direccionDestino: ''
            },
            directions: {
                distancia: '',
                duracion: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleDireccionInicial = this.handleDireccionInicial.bind(this);
        this.handleDireccionFinal = this.handleDireccionFinal.bind(this);
    }

    handleDireccionInicial (evt) {
    this.setState({ direccionOrigen: evt.target.value });
    }
  
	handleDireccionFinal (evt) {
	    this.setState({ direccionDestino: evt.target.value });
	    this.handleChange();
	    console.log(this.state);
	}


    handleChange(event) {
    	      //variables
		      var directionsDisplay;
		      var map;
		      var geocoder;

		      const DirectionsService = new google.maps.DirectionsService();
		      directionsDisplay = new google.maps.DirectionsRenderer();
		      //direccion origen
		      geocoder = new google.maps.Geocoder();
			    if (geocoder) {
			        geocoder.geocode({
			            'address': this.state.direccionOrigen
			        }, function (results, status) {
			            if (status == google.maps.GeocoderStatus.OK) {
			                var latitudOrigen = results[0].geometry.location.lat() ;
			                var longitudOrigen = results[0].geometry.location.lng() ;
			                // setter latitud origen
                            localStorage.setItem('latitudOrigen', latitudOrigen);
                            // setter longitud origen
                            localStorage.setItem('longitudOrigen', longitudOrigen);
			            }
			        });
			    }

			    
			    //direccion destino
			    geocoder = new google.maps.Geocoder();
			    if (geocoder) {
			        geocoder.geocode({
			            'address': this.state.direccionDestino
			        }, function (results, status) {
			            if (status == google.maps.GeocoderStatus.OK) {
			                var latitudDestino = results[0].geometry.location.lat() ;
			                var longitudDestino = results[0].geometry.location.lng() ;
			                // setter latitud destino
                            localStorage.setItem('latitudDestino', latitudDestino);
                            // setter longitud destino
                            localStorage.setItem('longitudDestino', longitudDestino);
			            }
			        });
			    }

			   console.log(localStorage.getItem('latitudOrigen'));
			   console.log(localStorage.getItem('longitudOrigen'));
			   console.log(localStorage.getItem('latitudDestino'));
			   console.log(localStorage.getItem('longitudDestino'));

		      
		      DirectionsService.route({
		        origin: new google.maps.LatLng(localStorage.getItem('latitudOrigen'), localStorage.getItem('longitudOrigen')),
		        destination: new google.maps.LatLng(localStorage.getItem('latitudDestino'), localStorage.getItem('longitudDestino')),
		        travelMode: google.maps.TravelMode.DRIVING,
		      }, (result, status) => {
		        if (status === google.maps.DirectionsStatus.OK) {

		         directionsDisplay.setDirections(result);
		         var route = result.routes[0];
		         	
		          for(var i = 0; i < route.legs.length; i++) {
		                        var routeSegment = i + 1;
		                         route.legs[i].start_address ;
		                         route.legs[i].end_address ;
		                         route.legs[i].duration.text ;
		                         route.legs[i].distance.text ;
		          }
		          console.log(result);

		          this.setState({
		            directions: result,
		            distancia: result.routes[0].legs[0].distance.text,
		            duracion: result.routes[0].legs[0].duration.text,
		          });

		        } 
		      });
		    
        
    }

    handleSubmit(event) {         
    }


 



    render() {

        const { user, users } = this.props;
        const { registering  } = this.props;
        const { submitted } = this.state;


        const MapWithADirectionsRenderer = compose(
		  withProps({
		    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWbGgZ73JEaSdFXaov4Ro3KXXc3cJl2Vc&v=3.exp&libraries=geometry,drawing,places",
		    loadingElement: <div style={{ height: `100%` }} />,
		    containerElement: <div style={{ height: `400px` }} />,
		    mapElement: <div style={{ height: `100%` }} />,
		  }),
		  withScriptjs,
		  withGoogleMap,
		  lifecycle({
		    componentDidMount() {
		      var directionsDisplay;
		      var map;	
		      const DirectionsService = new google.maps.DirectionsService();
		      directionsDisplay = new google.maps.DirectionsRenderer();
		      
		      DirectionsService.route({
		        origin: new google.maps.LatLng(localStorage.getItem('latitudOrigen'), localStorage.getItem('longitudOrigen')),
		        destination: new google.maps.LatLng(localStorage.getItem('latitudDestino'), localStorage.getItem('longitudDestino')),
		        travelMode: google.maps.TravelMode.DRIVING,
		      }, (result, status) => {
		        if (status === google.maps.DirectionsStatus.OK) {

		         directionsDisplay.setDirections(result);
		         var route = result.routes[0];
		         	
		          for(var i = 0; i < route.legs.length; i++) {
		                        var routeSegment = i + 1;
		                         route.legs[i].start_address ;
		                         route.legs[i].end_address ;
		                         route.legs[i].duration.text ;
		                         route.legs[i].distance.text ;
		          }

		          this.setState({
		            directions: result,
		          });

		        } 
		      });
		    }
		  })
		)(props =>
		  <GoogleMap
		    defaultZoom={7}
		    defaultCenter={new google.maps.LatLng(4.6270649, -87.6512600)}
		  >
		    {props.directions && <DirectionsRenderer directions={props.directions} />}
		  </GoogleMap>
		);

        
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
                        <input type="text" className="form-control" name="direccionOrigen" value={user.direccionOrigen} onChange={this.handleDireccionInicial}   />
                        {submitted && !user.direccionOrigen &&
                            <div className="help-block">La direccion de origen es requerida</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.direccionDestino ? ' has-error' : '')}>
                        <label htmlFor="direccionDestino">Direccion Destino</label>
                        <input type="text" className="form-control" name="direccionDestino" value={user.direccionDestino} onChange={this.handleDireccionFinal} />
                        {submitted && !user.direccionDestino &&
                            <div className="help-block">La direccion de destino es requerida</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.distancia ? ' has-error' : '')}>
                        <label htmlFor="distancia">Distancia</label>
                        <input type="text" className="form-control" name="distancia" value={this.state.distancia} onChange={this.handleChange} readOnly="true" />
                    </div>

                    <div className={'form-group' + (submitted && !user.duracion ? ' has-error' : '')}>
                        <label htmlFor="duracion">Duracion</label>
                        <input type="text" className="form-control" name="duracion" value={this.state.duracion}  onChange={this.handleChange} readOnly="true" />
                    </div>

                    <div>
                        <MapWithADirectionsRenderer />
                    </div>

                    <div className="form-group">
                      {"\n"}
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">Guardar</button>
                        
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