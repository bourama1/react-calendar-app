/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
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

export default function Login({setToken, setUser}) {
    const {register, formState: {errors}, handleSubmit, reset} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        reset();
        const user = await loginUser(data);

        if (user) {
            navigate("/");
            setToken(user.user._id);
            setUser(user.user);
            reset();
        }
    };

    return (
        <>
            <MDBCardBody className={"registration"}>
                <MDBCardTitle color="mdb-color darken-2">Login</MDBCardTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Username: </label>
                    <Input placeholder={"Username"} {...register("name", {required: true})}/>
                    {errors.name?.type==="required"&&<MDBCol className={"validation-message"}>Wrong username</MDBCol>}
                    <label>Password: </label>
                    <Input placeholder={"Password"} type={"password"} {...register("password", {required: true})}/>
                    {errors.password?.type==="required"&&<MDBCol className={"validation-message"}>Wrong password</MDBCol>}
                    <MDBBtn type={"submit"} className={"submitButton"}>Login</MDBBtn>
                </form>
            </MDBCardBody>
        </>
    );
}

async function loginUser(credentials) {
    return fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    })
        .then((data) => data.json());
}
