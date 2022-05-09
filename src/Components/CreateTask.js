/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import Modal from "react-modal";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {MDBCardBody, MDBCardTitle} from "mdb-react-ui-kit";

Modal.setAppElement("#root");

const CreateTask = ({isModalOpen, closeModal, userId}) =>{
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
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


    const handleClose = ()=>{
        reset();
        closeModal();
    };

    const handleCreateTask= async (task)=>{
        task.isCompleted=false;
        await fetch("/api/task/create", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(task),
        });
    };

    const onSubmit = (data) =>{
        handleCreateTask(data).then((response)=> console.log(response.express));
        console.log(JSON.stringify(data));
        handleClose();
    };


    return (
        <>
            <MDBCardBody className={"registration"}>
                <MDBCardTitle>Create task</MDBCardTitle>
                <form className={"create-modal"} onSubmit={handleSubmit(onSubmit)}>
                    <label>Task name: </label>
                    <input placeholder={"Name"} {...register("name", {required: true})} />
                    {errors.name?.type==="required"&&<p className={"validation-message"}>Name is required</p>}
                    <label>For project: </label>
                    <select type={"text"} {...register("project", {required: true})}>
                        <option value={""}> </option>
                        {projects&&projects.map((project)=> <option value={project._id}>{project.name}</option>)}
                    </select>
                    {errors.project?.type==="required" &&<p className={"validation-message"} >You have to choose the project</p>}
                    <label>Importance: </label>
                    <select type={"text"} {...register("importance")}>
                        <option value="A">A </option>
                        <option value="B">B </option>
                        <option value="C">C </option>
                        <option value="D">D </option>
                    </select>
                    <label>Description: </label>
                    <textarea placeholder={"Description"} {...register("description", {required: true})}/>
                    {errors.description?.type==="required" &&<p className={"validation-message"}>Description is required</p>}
                    <label>Deadline: </label>
                    <input type={"date"} min={new Date().toISOString().slice(0, 10)} {...register("deadline", {required: true})} />
                    {errors.deadline?.type==="required" &&<p className={"validation-message"}>You have to choose the deadline</p>}
                    <button className={"modal-buttons"} type={"submit"}>submit</button>
                    <button className={"modal-buttons"} onClick={handleClose}>close</button>
                </form>
            </MDBCardBody>
        </>
    );
};


export default CreateTask;
