/* eslint-disable react/prop-types */
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {MDBBtn, MDBCardBody, MDBCol, MDBCardTitle, MDBTable, MDBTableHead, MDBTableBody} from "mdb-react-ui-kit";
import UpdateTask from "./UpdateTask";


const Input = styled.input`
width: 90px;
height: 30px;
margin-right: 10px;
`;

const Tasks = ({userId}) => {
    const [tasks, setTasks] = useState(null);
    const [taskUpdate, setTaskUpdate] = useState(null);
    const [filteredTasks, setFilteredTasks] = useState();
    const [projects, setProjects] = useState();

    const fetchData = async () => {
        const fetchedUser = await fetch(`/api/users/${userId}`).then((data) => data.json());
        const fetchedTasks = await fetch("/api/tasks").then((data) => data.json());
        const fetchedProjects = await fetch("/api/projects").then((data) => data.json());


        const filteredTasks = fetchedTasks.filter((task) => fetchedUser.projects.includes(task.project));
        setTasks(filteredTasks);
        setFilteredTasks(filteredTasks);
        setProjects(fetchedProjects);
    };


    useEffect( ()=>{
        fetchData().catch((error) => console.log(error));
    }, []);

    const handleEditedTaskSubmit = async (task)=>{
        await fetch(`/api/tasks/${task._id}/update`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(task),
        });
        await handleSearch();
    };

    const handleModalClose =()=>{
        setTaskUpdate(null);
    };

    const handleTaskDelete = async (task)=>{
        await fetch(`/api/tasks/${task._id}/delete`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        });
        // Update tasks and filtered tasks
        await fetchData();
    };

    const handleSearch = async (criteria)=> {
        await fetchData();
        const criteriaTypes = Object.keys(criteria);

        for (const criteria of criteriaTypes) {
            if (criteria[criteria]==="") {
                criteria[criteria]=undefined;
            }
        }


        let filteredTasks = tasks;

        filteredTasks = criteria.taskName?filteredTasks.filter((task)=> task.name.includes(criteria.taskName)):filteredTasks;
        filteredTasks = criteria.importance?filteredTasks.filter((task)=> task.importance.includes(criteria.importance)):filteredTasks;
        filteredTasks = criteria.hideDone?filteredTasks.filter((task)=> task.isCompleted==="false"):filteredTasks;
        setFilteredTasks(filteredTasks);
    };


    return (
        <MDBCardBody className={"page-center"}>
            {Boolean(taskUpdate)&&<UpdateTask onSubmit={handleEditedTaskSubmit} onClose={handleModalClose} isModalOpen={Boolean(taskUpdate)} task={taskUpdate} />}
            <MDBCardTitle color="mdb-color darken-2">Filters</MDBCardTitle>
            <TaskFilter onSearch={(criteria)=> handleSearch(criteria)}/>
            <MDBCardTitle color="mdb-color darken-2">Tasks</MDBCardTitle>
            <TaskTable projects={projects} tasks={filteredTasks} handleUpdate={setTaskUpdate} handleDelete={handleTaskDelete} />
        </MDBCardBody>);
};

const TaskFilter = ({onSearch}) => {
    const [taskName, setTaskName] = useState("");
    const [importance, setImportance] = useState("");
    const [hideDone, setHideDone] = useState(false);

    const handleSearch =()=>{
        onSearch({taskName, importance, hideDone});
    };


    return (
        <MDBCardBody className={"task-search"}>
            <MDBCol>
                <label>Task name: </label>
                <Input type={"text"} name={"taskName"} value={taskName} onChange={(e)=> setTaskName(e.target.value)}/>
                <label>Importance: </label>
                <select type={"text"} name={"taskImportance"} value={importance} onChange={(e)=> setImportance(e.target.value)}>
                    <option value=""></option>
                    <option value="A">A </option>
                    <option value="B">B </option>
                    <option value="C">C </option>
                    <option value="D">D </option>
                </select>
                <label>Hide done: </label>
                <input type={"checkbox"} name={"hideDone"} value={hideDone} onChange={(e)=> {
                    setHideDone(!hideDone);
                }}/>
            </MDBCol>
            <br></br>
            <MDBBtn onClick={handleSearch}>Search</MDBBtn>
        </MDBCardBody>
    );
};

const TaskTable = ({tasks, handleUpdate, handleDelete, projects})=>{
    const Task = ({task}) => {
        return (
            <tr key={task._id}>
                <td>
                    {task.name}
                </td>
                <td>
                    {task.importance}
                </td>
                <td>
                    {task.deadline}
                </td>
                <td>
                    {(projects.find((project)=> project._id===task.project).name)}
                </td>
                <td>
                    {task.isCompleted==="true"?"Completed":"Uncompleted"}
                </td>
                <td>
                    <MDBBtn onClick={() => handleUpdate(task)}>View</MDBBtn>
                </td>
                <td>
                    <MDBBtn onClick={() => handleDelete(task)}>Delete</MDBBtn>
                </td>
            </tr>
        );
    };


    return (
        <MDBTable>
            <MDBTableHead>
                <tr>
                    <td>Task</td>
                    <td>Importance</td>
                    <td>Deadline</td>
                    <td>Project</td>
                    <td>State</td>
                    <td>Actions</td>
                    <td></td>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {tasks&&projects&&tasks.map((task)=><Task key={task.id} task={task}/>)}
            </MDBTableBody>
        </MDBTable>
    );
};


export default Tasks;
