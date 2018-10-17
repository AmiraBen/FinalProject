import React, { Component, Fragment } from "react";
import "./App.css";
import GoogleMap from "./components/GoogleMap.component.js";
import ListView from "./components/ListView.component.js";
import LocationFilter from "./components/LocationFilter.component.js";
import Marker from "./components/Marker.component.js";

class App extends Component {
  state = {
    center: {
      lat: 36.6968513,
      lng: 2.9238258
    },
    zoom: 15,
    filter: "",
    fakeData: [
      {
        name: "place 1",
        id: 1,
        lat: 36.6968513,
        lng: 2.9238258
      },
      {
        name: "place 2",
        id: 2,
        lat: 36.6968513,
        lng: 2.8238258
      },
      {
        name: "place 3",
        id: 3,
        lat: 36.705087,
        lng: 2.8391443
      },
      {
        name: "place 4",
        id: 4,
        lat: 36.7174111,
        lng: 2.8395032
      },
      {
        name: "place 5",
        id: 5,
        lat: 36.7768513,
        lng: 2.9395032
      },
      {
        name: "place 6",
        id: 6,
        lat: 36.7178513,
        lng: 2.9238258
      },
      {
        name: "place 7",
        id: 7,
        lat: 36.6968513,
        lng: 2.9238258
      }
    ],
    filteredList: [],
    selected: null
  };

  handleChange = e => {
    const filter = e.target.value;
    this.setState(
      prevState => {
        return { ...prevState, filter };
      },
      () => {
        this.setState(prevState => {
          return {
            filteredList: prevState.fakeData.filter(
              item => item.name === filter
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
        : [...this.state.fakeData].splice(3);
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
          {this.state.fakeData.map((location, i) => (
            <Marker
              selected={this.state.selected}
              key={i}
              lat={location.lat}
              lng={location.lng}
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
