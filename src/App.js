import React, { useState } from 'react';
// import DatePicker from './DatePicker';
import DatePicker from "react-datepicker";
import './App.css';
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [startDate, setStartDate] = useState(new Date());

  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  
  // };


  return (
    <div className="App">
       <h1>Select a Date</h1>
      {/* <DatePicker
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        dateFormat="MM/DD/YYYY"
        minDate={new Date()}
        maxDate={new Date(new Date().getFullYear() + 1, 11, 31)}
      /> */}
       {/* selectedDate,
  onDateChange,
  dateFormat = 'MM/DD/YYYY',
  minDate,
  maxDate,
  className, */}
 <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    </div>
  );
}

export default App;
