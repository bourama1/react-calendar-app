import {Route, Routes} from "react-router";
import React, {useEffect, useState} from "react";
import About from "./Components/About";
import Nav from "./Components/Nav";
import Tasks from "./Components/Tasks";
import Footer from "./Components/Footer";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Role from "./Components/Role";
import Project from "./Components/Project";
import CreateTask from "./Components/CreateTask";
import {MDBContainer, MDBRow} from "mdb-react-ui-kit";
import MyCalendar from "./Components/Calendar";

function App() {
    const [token, setToken] = useState();
    const [user, setUser] = useState();

    useEffect(()=>{
        const getToken = async ()=> {
            const tokenRequest = await fetch("/api/me/token").then((data)=> data.json()).catch("User is not logged");
            tokenRequest&& await fetch("/api/me").then((data)=> data.json()).then((user) => setUser(user));
            setToken(tokenRequest.token);
        };

        getToken().catch((err)=> console.log(err));
    }, []);

    const isAdmin = user&&user.name==="Administrator";


    if (!token) {
        return <MDBContainer>
            <MDBRow>
                <Nav role="navigation" setToken={setToken} loginToken={token}/>
                <Routes>
                    <Route path="/" element={<Login setToken={setToken} setUser={setUser}/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/login" element={<Login setToken={setToken} setUser={setUser}/>}/>
                </Routes>
            </MDBRow>

            <Footer/>
        </MDBContainer>;
    }


    return (
        <MDBContainer>
            <MDBRow>
                <Nav loginToken={token} setToken={setToken} userId={token} isAdmin={isAdmin}/>
                <Routes>
                    <Route path="/" element={<About/>}/>
                    <Route path="/tasks" element={<Tasks userId={token}/>}/>
                    {isAdmin&&<Route path="/role" element={<Role user={user} setUser={setUser}/>}/>}
                    {isAdmin&&<Route path="/project" element={<Project/>}/>}
                    <Route path="/createTask" element={<CreateTask userId={token}/>}/>
                    <Route path="/calendar" element={<MyCalendar userId={token}/>}/>
                </Routes>
            </MDBRow>

            <Footer/>
        </MDBContainer>
    );
}


export default App;
