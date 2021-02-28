import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import 'firebase/database';
import { fetchData } from './Data';

// Returns the body of the Table page
function TableForm() {

  const [inputValue, setInputValue] = useState('');

  let DateObj = {
    date: null,
    submitted: false
  }

  const genRandDate = (start, end) => new Date(+start + Math.random() * (end - start));

  const dateToString = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    return (year + "-" + month + "-" + day);
  }

  const handleDateChange = (event) => {
    DateObj.date = event.target.value;
  }

  const handleDateSubmit = (event) => {
    if (DateObj.date !== null) {
      setInputValue(DateObj.date);
    }
    event.preventDefault();
  }

  const handleRandDateSubmit = (event) => {
    let start = new Date(2018, 1, 1);
    let end = new Date(2019, 1, 1);
    setInputValue(dateToString(genRandDate(start, end)));
    event.preventDefault();
  }

  return (
    <div>
      <div className="">
        <form aria-label="Filters for table on police brutality" id="date-form">
          <div className="row filter pl-3 m-0">
            <div className="form-group mr-2">
              <label>
                Date:
                <input type="date" id="date" name="date" onChange={handleDateChange} />
              </label>
            </div>
            <div className="col">
              <input className="mr-3" type="submit" value="Submit" form="date-form" id="date-submit" onClick={handleDateSubmit} />
              <input type="submit" value="Click for a Random Date" form="date-form" id="rand-date-submit" onClick={handleRandDateSubmit} />
            </div>
          </div>

        </form>
      </div>

      <div className="col-4 mx-auto">
        <Table date={inputValue} />
      </div>
    </div>
  )
}

function Table(props) {
  const [dateSpecificDataset, setDateSpecificDataset] = useState([]);

  useEffect(() => {
    fetchData(props.date).then(function (result) {
      setDateSpecificDataset(result);
    });
  }, [props.date]);

  let startingMessage = <p>Please choose a date</p>;
  let date = "by Date";
  if (props.date !== "") {
    date = "on";
    startingMessage = null;
  }

  let dateNames = [];
  if (Array.isArray(dateSpecificDataset)) {
    dateNames = dateSpecificDataset.map((personObj, key) => {
      return <PersonCard key={key} name={personObj.name} />
    })
    if (dateNames.length < 1) {
      dateNames.push(<p key="0">"There are not yet any recorded victims for this date"</p>);
    }
  }


  return (
    <table className="center">
      <thead>
        <tr>
          <th id="table-title">Police Brutality Victims {date} {props.date}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-center" id="date-names">
            {startingMessage}
            {dateNames}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

// Returns the individual profiles of police brutality victims for a given date
// with information on their gender, age, and location.
function PersonCard(props) {
  const [redirectTo, setRedirectTo] = useState(undefined);
  const handleClick = () => {
    setRedirectTo(props.name);
  }
  if (redirectTo) {
    return <Redirect push to={'/table/' + redirectTo} />
  }
  return (
    <p className="tableNames" onClick={handleClick}>{props.name}</p>
  )
}
export default TableForm;