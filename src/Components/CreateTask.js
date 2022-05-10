/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import {useForm} from "react-hook-form";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {MDBBtn, MDBCardBody, MDBCardTitle, MDBCol} from "mdb-react-ui-kit";

const Input = styled.input`
width: 100%;
padding: 8px 12px;
margin: 8px 0;
display: inline-block;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
`;

const CreateTask = ({userId}) =>{
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [projects, setProjects] = useState();


    useEffect( ()=>{
        const fetchData = async () => {
            const fetchedUser = await fetch(`/api/users/${userId}`).then((data) => data.json());
            fetch("/api/projects")
                .then((data) => data.json())
                .then((projects) => setProjects(projects.filter((project)=> fetchedUser.projects.includes(project._id))));
        };

        fetchData().catch((error) => console.log(error));
    }, []);

    const handleCreateTask= async (task)=>{
        task.isCompleted=false;
        const response = await fetch("/api/task/create", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(task),
        }).then((response) => response.json());
        alert(response.message);
    };

    const onSubmit = (data) =>{
        handleCreateTask(data);
        console.log(JSON.stringify(data));
    };


    return (
        <>
            <MDBCardBody className={"registration"}>
                <MDBCardTitle>Create task</MDBCardTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Task name: </label>
                    <Input placeholder={"Name"} {...register("name", {required: true})} />
                    {errors.name?.type==="required"&&<MDBCol className={"validation-message"}>Name is required</MDBCol>}
                    <label>For project: </label>
                    <select type={"text"} {...register("project", {required: true})}>
                        <option value={""}> </option>
                        {projects&&projects.map((project)=> <option value={project._id}>{project.name}</option>)}
                    </select>
                    {errors.project?.type==="required" &&<MDBCol className={"validation-message"} >You have to choose the project</MDBCol>} <br></br>
                    <label>Importance: </label>
                    <select type={"text"} {...register("importance")}>
                        <option value="A">A </option>
                        <option value="B">B </option>
                        <option value="C">C </option>
                        <option value="D">D </option>
                    </select> <br></br>
                    <label>Description: </label>
                    <Input placeholder={"Description"} {...register("description", {required: true})}/>
                    {errors.description?.type==="required" &&<MDBCol className={"validation-message"}>Description is required</MDBCol>} <br></br>
                    <label>Deadline: </label>
                    <Input type={"date"} min={new Date().toISOString().slice(0, 10)} {...register("deadline", {required: true})} />
                    {errors.deadline?.type==="required" &&<MDBCol className={"validation-message"}>You have to choose the deadline</MDBCol>}
                    <MDBBtn type={"submit"}>Submit</MDBBtn>
                </form>
            </MDBCardBody>
        </>
    );
};


export default CreateTask;
