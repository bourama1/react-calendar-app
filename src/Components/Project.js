/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {MDBCardBody, MDBCardTitle, MDBCardText, MDBInput, MDBBtn, MDBCol, MDBRow} from "mdb-react-ui-kit";

const Project = ()=>{
    const [createProjectName, setCreateProjectName] = useState("");
    const [deleteProject, setDeleteProject] = useState();
    const [projects, setProjects] = useState();
    const {handleSubmit, formState: {errors}, reset, register} = useForm();

    useEffect( ()=>{
        fetch("/api/projects")
            .then((data) => data.json())
            .then((projects) => setProjects(projects));
    }, []);

    const handleCreateProject = async ()=>{
        const response = await fetch("/api/project/create", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: createProjectName}),
        }).then((response) =>response.json());

        alert(response.message);
        setCreateProjectName("");
    };

    const handleProjectDelete = async ()=>{
        await fetch(`/api/project/${deleteProject}/delete`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        });
    };


    return (
        <MDBCardBody className={"page-center"}>
            <MDBCardTitle>Manage projects</MDBCardTitle>
            <h6>Create project</h6>
            <MDBCol>
                <MDBCardText className={"project-add-form"}>Name of the project: </MDBCardText>
                <MDBInput className={"project-add-form"} onChange={(e)=> setCreateProjectName(e.target.value)} value={createProjectName} />
            </MDBCol>
            <br></br>
            <MDBBtn className={"project-add-form designed-buttons"} onClick={handleCreateProject}>Create</MDBBtn>
        </MDBCardBody>
    );
};


export default Project;
