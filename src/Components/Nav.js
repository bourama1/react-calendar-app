/* eslint-disable react/prop-types */
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../css/Main.css";
import CreateTask from "./CreateTask";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
    MDBBtn,
} from "mdb-react-ui-kit";

const Nav = ({setToken, loginToken, userId, isAdmin})=> {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <header>
            <br></br>
            <MDBNavbar fixed='top' expand='lg' dark bg="dark" className="py-4">
                <MDBContainer size="md" fluid>

                    {modalOpen&&<CreateTask userId={userId} isModalOpen={modalOpen} closeModal={()=>setModalOpen(false)} />}

                    <MDBCollapse navbar>
                        <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                            {loginToken && <>
                                <MDBNavbarItem>
                                    <MDBBtn rounded outline className="px-3 me-2" onClick={()=> navigate("/")}>About</MDBBtn>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBBtn rounded outline className="px-3 me-2" onClick={()=> navigate("/Tasks")}>Tasks</MDBBtn>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    {isAdmin&&<MDBBtn rounded outline className="px-3 me-2" onClick={()=> navigate("/Role")}>Role</MDBBtn>}
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    {isAdmin&&<MDBBtn rounded outline className="px-3 me-2" onClick={()=> navigate("/Project")}>Project</MDBBtn>}
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBBtn rounded outline className="px-3 me-2" onClick={() => setModalOpen(true)}><a>Create</a></MDBBtn>
                                </MDBNavbarItem>
                            </>
                            }

                            {!loginToken? <>
                                <MDBNavbarItem>
                                    <MDBBtn rounded outline className="px-3 me-2" onClick={() => navigate("/registration")}>Registration</MDBBtn>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBBtn rounded outline className="px-3 me-2" onClick={() => navigate("/login")}>Login</MDBBtn>
                                </MDBNavbarItem>
                            </>:
                                <MDBNavbarItem>
                                    <MDBBtn rounded outline className="px-3 me-2" onClick={async () => {
                                        setToken(null); await fetch("api/logout", {method: "POST", headers: {"Content-Type": "application/json"}});
                                        navigate("/");
                                    }}>Logout</MDBBtn>
                                </MDBNavbarItem>
                            }
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </header>
    );
};

export default Nav;
