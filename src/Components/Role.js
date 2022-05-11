/* eslint-disable react/jsx-key */
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {MDBBtn, MDBCardBody, MDBCardTitle} from "mdb-react-ui-kit";

const Role = () => {
    const [users, setUsers] = useState();
    const [projects, setProjects] = useState();
    const [availableProjects, setAvailableProjects] = useState();

    const [user, setUser] = useState();
    const [project, setProject] = useState();
    const [action, setAction] = useState();
    const {handleSubmit, reset} = useForm();


    useEffect( ()=>{
        fetch("/api/users")
            .then((data) => data.json())
            .then((users) => setUsers(users));
        fetch("/api/projects")
            .then((data) => data.json())
            .then((projects) => setProjects(projects));
    }, []);

    useEffect(()=>{
        if (user&&action==="Add") {
            setAvailableProjects(projects.filter((project) => !project.users.includes(user)));
        } else if (user&&action==="Remove") {
            setAvailableProjects(projects.filter((project) => project.users.includes(user)));
        }
    }, [user, action]);


    const onSubmit = async ()=> {
        if (!user || !project) {
            return;
        }

        const response = await fetch(`/api/projects/${project}/update`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user, action: action}),
        });
        alert((await response.json()).message);
        reset();
    };


    return (
        <MDBCardBody className={"page-center"}>
            <MDBCardTitle color="mdb-color darken-2">Manage users on project</MDBCardTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>User name: </label>
                <select onChange={(e) => {
                    setUser(e.target.value);
                }}>
                    <option value={""}></option>
                    {users&&users.map((user)=><option value={user._id}>{user.name}</option>)}
                </select> <br></br>
                <label>Project: </label>
                <select onChange={(e)=> setProject(e.target.value)}>
                    <option value={""}></option>
                    {availableProjects&&availableProjects.map((project)=><option value={project._id}>{project.name}</option>)}
                </select> <br></br>
                <label>Action: </label>
                <select onChange={(e)=> setAction(e.target.value)}>
                    <option value={""}></option>
                    <option value={"Add"}>Add</option>
                    <option value={"Remove"}>Del</option>
                </select> <br></br>
                <MDBBtn onClick={handleSubmit}>Submit</MDBBtn>
            </form>
        </MDBCardBody>
    );
};


export default Role;
