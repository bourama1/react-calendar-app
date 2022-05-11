/* eslint-disable react/prop-types */
import React, {useEffect, useState} from "react";
import {MDBCardBody, MDBCardTitle, MDBCardText, MDBInput, MDBBtn, MDBCol, MDBTable, MDBTableHead, MDBTableBody} from "mdb-react-ui-kit";

const Projects = ()=>{
    const [createProjectName, setCreateProjectName] = useState("");
    const [projects, setProjects] = useState();

    const fetchData = async () => {
        fetch("/api/projects")
            .then((data) => data.json())
            .then((projects) => setProjects(projects));
    };

    useEffect( ()=>{
        fetchData().catch((error) => console.log(error));
    }, []);

    const handleCreateProject = async ()=>{
        const response = await fetch("/api/project/create", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: createProjectName}),
        }).then((response) =>response.json());

        alert(response.message);
        setCreateProjectName("");
        await fetchData();
    };

    const handleProjectDelete = async (project)=>{
        await fetch(`/api/projects/${project._id}/delete`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        });
        await fetchData();
    };
    
    const Project = ({project}) => {
        return (
            <tr key={project._id}>
                <td>
                    {project.name}
                </td>
                <td>
                    <MDBBtn onClick={() => handleProjectDelete(project)}>Delete</MDBBtn>
                </td>
            </tr>
        );
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
            <h6>Projects</h6>
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <td>Project</td>
                        <td>Delete</td>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {projects&&projects.map((project)=><Project key={project._id} project={project}/>)}
                </MDBTableBody>
            </MDBTable>
        </MDBCardBody>
    );
};


export default Projects;
