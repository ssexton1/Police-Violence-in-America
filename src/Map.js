import React, { useState, useEffect } from "react";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js";
import { Label, Input } from "reactstrap";
import { fetchData } from "./Data";
const PlotlyComponent = createPlotlyComponent(Plotly);

// Returns the Body of our Map page
export function Map() {
  return (
    <div>
      <MapSubmitPlusMap />
    </div>
  );
}

// Collects the data and returns a Plotly map component
// that updates when the state changes
function MapGraph(props) {
  const [raceSpecificDataset, setRaceSpecificDataset] = useState([]);

  useEffect(() => {
    fetchData(props.race).then(function (result) {
      setRaceSpecificDataset(result);
    });
  }, [props.race]);

  let data = [
    {
      type: "scattergeo",
      locationmode: "USA-states",
      lon: raceSpecificDataset.longitude,
      lat: raceSpecificDataset.latitude,
      hoverinfor: raceSpecificDataset.name,
      text: raceSpecificDataset.name,
      mode: "markers",
      marker: {
        size: 8,
        opacity: 0.8,
        reversescale: true,
        autocolorscale: false,
        symbol: "circle",
        line: {
          width: 1,
          color: "rgb(217,217,217)",
        },
        cmin: 0,
        color: "rgb(139,0,0)",
      },
    },
  ];

  let layout = {
    title: "USA Police Violence",
    geo: {
      scope: "usa",
      projection: {
        type: "albers usa",
      },
      showland: true,
      landcolor: "rgb(49,51,53)",
      subunitcolor: "rgb(217,217,217)",
      countrycolor: "rgb(217,217,217)",
      countrywidth: 0.5,
      subunitwidth: 0.5,
    },
  };

  let config = {
    showLink: false,
    responsive: true,
  };

  return (
    <PlotlyComponent className="map" data={data} layout={layout} config={config} />
  );
}

// Returns Map form that changes the prop given to map whenever the dropdown
// input is changed. It listens for changes in the drop down with handleChange and reloads the data
// with state.
function MapSubmitPlusMap() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  return (
    <div>
      <div className="col-8 filter">
        <form className="form-inline" aria-label="Filters for interactive map on police brutality" id="raceForm">
            <Label>
              Select a Race:
              <Input type="select" name="raceFilter" id="raceFilter" onChange={handleChange}>
                <option value="B">Black</option>
                <option value="W">White</option>
                <option value="A">Asian</option>
                <option value="H">Hispanic</option>
                <option value="O">Other</option>
              </Input>
            </Label>
        </form>
      </div>
      <MapGraph race={inputValue} />
    </div>
  );
}

export default Map;
