import React, {useState, useEffect} from "react";
import "./App.css";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import DatePicker from "react-datepicker";
import useFetch from "use-http";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function App() {
    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""});
    const [allEvents, setAllEvents] = useState([]);
    const {get, post, response, loading, error} = useFetch("http://localhost:3000");

    useEffect(() => {
        loadInitialEvents();
    }, []); // componentDidMount

    async function loadInitialEvents() {
        const initialEvents = await get("/events");
        if (response.ok) setAllEvents(initialEvents);
    }

    async function addEvent() {
        const newEventPost = await post("/events", newEvent);
        if (response.ok) setAllEvents([...allEvents, newEventPost]);
    }

    return (
        <div className="App">
            <h1>Calendar</h1>
            <h2>Add event</h2>
            <div>
                <input type="text" placeholder="Title" style={{width: "20%", marginRight: "10px"}}
                    value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
                <DatePicker placeholderText="Start date" style={{marginRight: "10px"}}
                    selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}
                />
                <DatePicker placeholderText="End date"
                    selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}
                />
                <button style={{marginTop: "10px"}} onClick={addEvent}>
          Add event
                </button>
                {error && "Error!"}
                {loading && "Loading..."}
            </div>
            <Calendar localizer={localizer} events={allEvents}
                startAccessor='start' endAccessor='end' style={{height: 500, margin: "50px"}} />
        </div>
    );
}

export default App;
