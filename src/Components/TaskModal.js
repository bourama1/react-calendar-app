/* eslint-disable react/prop-types */
import Modal from "react-modal";
import {useForm} from "react-hook-form";
import React, {useState} from "react";

const TaskModal = ({isModalOpen, onClose, onSubmit, task})=>{
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

    const onModalSubmit = ()=>{
        handleSubmit(onSubmit(editedTask));
        handleClose();
    };

    return (
        <Modal isOpen={isModalOpen}>
            <h2>Update task: {editedTask.name}</h2>
            <form className={"create-modal"} onChange={handleChange} onSubmit={onModalSubmit}>
                <label>Change importance: </label>
                <select type={"text"} value={editedTask.importance} {...register("importance")}>
                    <option value="A">A </option>
                    <option value="B">B </option>
                    <option value="C">C </option>
                    <option value="D">D </option>
                </select>
                <label>Description: </label>
                <textarea placeholder={"Description"} value={editedTask.description} {...register("description", {required: true})}/>
                {errors.description?.type==="required" &&<p className={"validation-message"}>Description is required</p>}
                <label>Deadline: </label>
                <input type={"date"} value={editedTask.deadline} {...register("deadline", {required: true})} />
                {errors.deadline?.type==="required" &&<p className={"validation-message"}>You have to choose the deadline</p>}
                <label>Complete task</label>
                <select type={"text"} value={editedTask.isCompleted === "true"} {...register("isCompleted", {required: true})}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>

                <button type={"submit"}>submit</button>
                <button onClick={handleClose}>close</button>
            </form>
        </Modal>

    );
};

export default TaskModal;
