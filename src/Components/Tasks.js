/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import TaskModal from "./TaskModal";
import {MDBBtn, MDBCardBody, MDBCol, MDBCardTitle} from "mdb-react-ui-kit";


const Input = styled.input`
width: 90px;
height: 30px;
margin-right: 10px;
`;

const Table = styled.table`
width: 1000px;

`;


const Tasks = ({userId}) => {
    const [tasks, setTasks] = useState(null);
    const [modalTask, setModalTask] = useState(null);
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
        setModalTask(null);
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
            {Boolean(modalTask)&&<TaskModal onSubmit={handleEditedTaskSubmit} onClose={handleModalClose} isModalOpen={Boolean(modalTask)} task={modalTask} />}
            <MDBCardTitle color="mdb-color darken-2">Filters</MDBCardTitle>
            <TaskFilter onSearch={(criteria)=> handleSearch(criteria)}/>
            <MDBCardTitle color="mdb-color darken-2">Tasks</MDBCardTitle>
            <TaskTable projects={projects} tasks={filteredTasks} setModalTask={setModalTask} handleDelete={handleTaskDelete} />
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
                <Input type={"text"} name={"taskImportance"} value={importance} onChange={(e)=> setImportance(e.target.value)}/>
                <label>Hide done: </label>
                <input type={"checkbox"} name={"hideDone"} value={hideDone} onChange={(e)=> {
                    setHideDone(!hideDone);
                }}/>
            </MDBCol>
            <br></br>
            <MDBBtn className={"designed-buttons"} onClick={handleSearch}>Search</MDBBtn>
        </MDBCardBody>
    );
};

const TaskTable = ({tasks, setModalTask, handleDelete, projects})=>{
    const Task = ({task}) => {
        return (
            <tr>
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
                    <button className={"designed-buttons"} onClick={() => setModalTask(task)}>View</button>
                </td>
                <td>
                    <button className={"designed-buttons"} onClick={() =>handleDelete(task)}>Delete</button>
                </td>
            </tr>
        );
    };


    return (
        <Table>
            <thead>
                <tr>
                    <td>Task</td>
                    <td>Importance</td>
                    <td>Deadline</td>
                    <td>Project</td>
                    <td>State</td>
                </tr>
            </thead>
            <tbody>
                {tasks&&projects&&tasks.map((task)=><Task task={task}/>)}
            </tbody>
        </Table>
    );
};


export default Tasks;
