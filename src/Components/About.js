import React from "react";
import {MDBCardBody, MDBCardTitle, MDBRow} from "mdb-react-ui-kit";

const About = () => {
    return (
        <MDBCardBody className={"about-page"}>
            <MDBCardTitle color="mdb-color darken-2">About</MDBCardTitle>
            <MDBRow>App for tracking tasks.</MDBRow>
        </MDBCardBody>
    );
};

export default About;
