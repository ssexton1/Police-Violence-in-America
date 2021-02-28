import * as d3 from "d3";
import firebase from "firebase/app";
import "firebase/database";
import _ from "lodash";

const SHOOTINGS_DATA = "https://raw.githubusercontent.com/washingtonpost/data-police-shootings/master/fatal-police-shootings-data.csv";

// Fetches the external data with d3, then combines it with our firebase
// user added data and calls one of our 3 filter functions to return the proper
// filtered data
export function fetchData(searchTerm) {
  let promise = d3
    .csv(SHOOTINGS_DATA, function (d) {
      return {
        name: d.name,
        gender: d.gender,
        age: d.age,
        date: d.date,
        race: d.race,
        city: d.city,
        state: d.state,
        longitude: d.longitude,
        latitude: d.latitude,
      };
    })
    .then(function (data) {
      data.push(...grabFirebaseData());
      if (searchTerm != null && searchTerm.includes("-")) {
        return filterTableData(data, searchTerm);
      } else if (searchTerm.length > 1) {
        let person = _.find(data, { name: searchTerm });
        return person;
      } else {
        return filterMapData(data, searchTerm);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
  return promise;
}

// Filters the inputted data to return an object with an array of
// names, longitudes and latitudes. It also filters based on what race 
// letter (ex. "W" for white, "B" for black) the given searchTerm is.
function filterMapData(data, searchTerm) {
  let filteredData = { name: [], longitude: [], latitude: [] };
  if (searchTerm !== undefined) {
    for (let i = 0; i <= data.length; i++) {
      if (data[i] !== undefined) {
        if (data[i].race === searchTerm) {
          filteredData.longitude.push(data[i].longitude);
          filteredData.latitude.push(data[i].latitude);
          filteredData.name.push(data[i].name);
        }
      }
    }
  }
  return filteredData;
}

// Filters the data for use in the table. Finds people who died
// on a specific day and returns their objects with all their information
function filterTableData(data, searchTerm) {
  let filteredData = [];
  for (let i = 0; i <= data.length; i++) {
    if (data[i] !== undefined) {
      if (data[i].date === searchTerm) {
        filteredData.push(data[i]);
      }
    }
  }
  return filteredData;
}

// Grabs the user reported data from firebase and returns it so it can be 
// added to our current dataset in our fetch function.
function grabFirebaseData() {
  let userArray = [];
  const reportFormVictimsRef = firebase.database().ref("reportFormVictims");

  reportFormVictimsRef.on("value", (snapshot) => {
    const theVictims = snapshot.val();
    let ObjectKeyArray = Object.keys(theVictims);
    let formVictimArray = ObjectKeyArray.map((key) => {
      let individualVictimObj = theVictims[key];
      return individualVictimObj;
    });
    userArray = formVictimArray;
  });

  return userArray;
}

export default fetchData;
