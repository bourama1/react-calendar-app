import React from "react";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {MDBBtn, MDBCol, MDBCardBody, MDBCardTitle} from "mdb-react-ui-kit";

const Input = styled.input`
width: 100%;
padding: 8px 12px;
margin: 8px 0;
display: inline-block;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
`;

export default function Registration() {
    const formSchema = Yup.object().shape({
        name: Yup.string()
            .required("Username can not be empty")
            .min(5, "Username must have at least 5 characters"),
        password: Yup.string()
            .required("Password can not be empty")
            .min(8, "Password must have at least 8 characters"),
        confirmPassword: Yup.string()
            .required("You must repeat your password")
            .oneOf([Yup.ref("password")], "Passwords do not match"),
    });
    const formOptions = {resolver: yupResolver(formSchema)};
    const {register, formState: {errors}, handleSubmit, reset} = useForm(formOptions);


    const onSubmit = async (data) => {
        data.project="";
        const response = await fetch("/api/user/create", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        alert((await response.json()).message);
        reset();
    };

    return (
        <>
            <MDBCardBody className={"registration"}>
                <MDBCardTitle color="mdb-color darken-2">Registration</MDBCardTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Username: </label>
                    <Input placeholder={"Username"} {...register("name")}/>
                    {errors.name?.message&&<MDBCol className={"validation-message"}>{errors.name?.message}</MDBCol>}
                    <label>Password: </label>
                    <Input placeholder={"Password"} type={"password"} {...register("password")}/>
                    {errors.password?.message&&<MDBCol className={"validation-message"}>{errors.password?.message}</MDBCol>}
                    <label>Repeat Password: </label>
                    <Input placeholder={"Repeat Password"} type={"password"} {...register("confirmPassword")}/>
                    {errors.password?.message&&<MDBCol className={"validation-message"}>{errors.confirmPassword?.message}</MDBCol>}
                    <MDBBtn type={"submit"} className={"submitButton"}>Registration</MDBBtn>
                </form>
            </MDBCardBody>
        </>
    );
}


