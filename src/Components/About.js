import React from "react";
import {MDBCardBody, MDBCardTitle} from "mdb-react-ui-kit";

const About = () => {
    return (
        <MDBCardBody className={"about-page"}>
            <MDBCardTitle color="mdb-color darken-2">About</MDBCardTitle>
            <p>App for tracking tasks.</p>
        </MDBCardBody>
    );
};

export default About;
