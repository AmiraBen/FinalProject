import React, { Component, Fragment } from "react";
import "./App.css";
import GoogleMap from "./components/GoogleMap.component.js";
import ListView from "./components/ListView.component.js";
import LocationFilter from "./components/LocationFilter.component.js";
import Marker from "./components/Marker.component.js";
import getLocations from "./utils/facebookAPI.js";
class App extends Component {
  state = {
    center: {
      lat: 36.6968513,
      lng: 2.9238258
    },
    zoom: 15,
    filter: "",
    locations: [],
    filteredList: [],
    selected: null
  };

  componentDidMount() {
    getLocations().then(({data}) => {
      console.log(data)
      this.setState(prevState => {
        return { ...prevState, locations:data}
      })
    })
      .catch(err => console.log)
  }
   
  handleChange = e => {
    const filter = e.target.value;
    this.setState(
      prevState => {
        return { ...prevState, filter };
      },
      () => {
        this.setState(prevState => {
          return {
            filteredList: prevState.locations.filter(
              item => item.name.toUpperCase().startsWith(`${filter.toUpperCase()}`)
            )
          };
        });
      }
    );
  };
  handleItemClick = (lat, lng, i) => {
    console.log(lat, lng);
    this.setState(prevState => {
      return {
        ...prevState,
        center: {
          lat: lat,
          lng: lng
        },
        selected: i
      };
    });
  };
  render() {
    const sample =
      this.state.filter && this.state.filteredList.length
        ? this.state.filteredList
        : [...this.state.locations].splice(1,5        );
    return (
      <Fragment>
        <LocationFilter handleChange={this.handleChange} />
        <ListView
          filteredData={sample}
          handleItemClick={this.handleItemClick}
        />
        <GoogleMap
          tabIndex="-1"
          defaultCenter={{
            center: {
              lat: 36.6968513,
              lng: 2.9238258
            }
          }}
          defaultZoom={this.state.zoom}
          center={this.state.center}
          yesIWantToUseGoogleMapApiInternals
        >
          {this.state.locations.map((location, i) => (
            <Marker
              selected={this.state.selected}
              key={i}
              lat={location.location.latitude}
              lng={location.location.longitude}
              id={location.id}
              name={location.name }
            />
          ))}
        </GoogleMap>
      </Fragment>
    );
  }
}

export default App;
