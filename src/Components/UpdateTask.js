/* eslint-disable react/prop-types */
import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {MDBBtn, MDBCol, MDBCardBody, MDBCardTitle, MDBRow} from "mdb-react-ui-kit";
import styled from "styled-components";

const Input = styled.input`
width: 100%;
padding: 8px 12px;
margin: 8px 0;
display: inline-block;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
`;

export default function UpdateTask({isModalOpen, onClose, onSubmit, task}) {
    const [editedTask, setEditedTask] = useState(task);
    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const handleClose=()=>{
        reset();
        onClose();
    };

    const handleChange =(e)=>{
        switch (e.target.name) {
        case "description":
            setEditedTask({...editedTask, description: e.target.value});
            break;
        case "deadline":
            setEditedTask({...editedTask, deadline: e.target.value});
            break;
        case "importance":
            setEditedTask({...editedTask, importance: e.target.value});
            break;
        case "isCompleted":
            setEditedTask({...editedTask, isCompleted: e.target.value});
            break;
        }
    };

    const onUpdateSubmit = async () => {
        handleSubmit(onSubmit(editedTask));
        handleClose();
    };

    return (
        <MDBCardBody>
            <MDBCardTitle>Update task: {editedTask.name}</MDBCardTitle>
            <form onChange={handleChange} onSubmit={onUpdateSubmit}>
                <label>Change importance: </label>
                <select type={"text"} value={editedTask.importance} {...register("importance")}>
                    <option value="A">A </option>
                    <option value="B">B </option>
                    <option value="C">C </option>
                    <option value="D">D </option>
                </select> <br></br>
                <label>Description: </label>
                <Input placeholder={"Description"} value={editedTask.description} {...register("description", {required: true})}/>
                {errors.description?.type==="required" &&<MDBCol className={"validation-message"}>Description is required</MDBCol>} <br></br>
                <label>Deadline: </label>
                <Input type={"date"} value={editedTask.deadline} {...register("deadline", {required: true})} />
                {errors.deadline?.type==="required" &&<MDBCol className={"validation-message"}>You have to choose the deadline</MDBCol>} <br></br>
                <label>Complete task: </label>
                <select type={"text"} value={editedTask.isCompleted === "true"} {...register("isCompleted", {required: true})}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select> <br></br>
                <MDBRow center>
                    <MDBCol>
                        <MDBBtn type={"submit"}>Submit</MDBBtn>
                    </MDBCol>
                    <MDBCol>
                        <MDBBtn onClick={handleClose}>close</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </form>
        </MDBCardBody>

    );
}
