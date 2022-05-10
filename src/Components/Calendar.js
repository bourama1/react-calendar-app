/* eslint-disable react/prop-types */
import React, {useState, useEffect} from "react";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import {MDBCardBody, MDBCardTitle} from "mdb-react-ui-kit";
import UpdateTask from "./UpdateTask";

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

const MyCalendar = ({userId}) => {
    const [tasks, setTasks] = useState([]);
    const [taskUpdate, setTaskUpdate] = useState(null);

    const fetchData = async () => {
        const fetchedUser = await fetch(`/api/users/${userId}`).then((data) => data.json());
        const fetchedTasks = await fetch("/api/tasks").then((data) => data.json());
        const filteredTasks = fetchedTasks.filter((task) => fetchedUser.projects.includes(task.project));
        filteredTasks.forEach((task) => {
            task.start = new Date();
            task.end = new Date(task.deadline);
        });
        console.log(filteredTasks);
        setTasks(filteredTasks);
    };

    useEffect(() => {
        fetchData().catch((error) => console.log(error));
    }, []);

    const handleEditedTaskSubmit = async (task)=>{
        await fetch(`/api/tasks/${task._id}/update`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(task),
        });
    };

    const handleModalClose =()=>{
        setTaskUpdate(null);
    };

    return (
        <MDBCardBody>
            {Boolean(taskUpdate)&&<UpdateTask onSubmit={handleEditedTaskSubmit} onClose={handleModalClose} isModalOpen={Boolean(taskUpdate)} task={taskUpdate} />}
            <MDBCardTitle>Calendar</MDBCardTitle>
            <Calendar localizer={localizer}
                events={tasks}
                onSelectEvent={(event) => setTaskUpdate(event)}
                startAccessor='start'
                endAccessor='end'
                style={{height: 500, margin: "50px"}} />
        </MDBCardBody>
    );
};

export default MyCalendar;
