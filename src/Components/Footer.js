import React from "react";
import {MDBFooter} from "mdb-react-ui-kit";

const Footer = () =>{
    return (
        <MDBFooter className='text-center text-lg-start text-muted fixed-bottom'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
                    <span>Get connected with us on social networks:</span>
                </div>

                <div>
                    <a href='https://www.facebook.com' className='me-4 text-reset'>
                        <i className='fab fa-facebook-f'></i>
                    </a>
                    <a href='https://www.twitter.com' className='me-4 text-reset'>
                        <i className='fab fa-twitter'></i>
                    </a>
                    <a href='https://www.google.com' className='me-4 text-reset'>
                        <i className='fab fa-google'></i>
                    </a>
                    <a href='https://www.instagram.com' className='me-4 text-reset'>
                        <i className='fab fa-instagram'></i>
                    </a>
                    <a href='https://www.linkedin.com' className='me-4 text-reset'>
                        <i className='fab fa-linkedin'></i>
                    </a>
                    <a href='https://github.com/bourama1' className='me-4 text-reset'>
                        <i className='fab fa-github'></i>
                    </a>
                </div>
            </section>

            <div className='text-center p-4' style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
                &copy;bourama1 OWE
            </div>
        </MDBFooter>
    );
};

export default Footer;
