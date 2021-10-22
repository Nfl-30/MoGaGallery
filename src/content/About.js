import React from "react";
import LayOutWeb from "../layout/layout";


const About = () => {
    return(
        <>
        <div className="About">
        <h1>My Profile</h1>
        <ol type="1">
            <li><strong>Nama</strong>: Naufal Alif Fauzan</li>
            <li><strong>Email</strong>: e.naufal.naf@gmail.com</li>
            <li><strong>Description</strong>: <p>
                A gallery of movie and games using an API. Able to register new user,
                change password, login and also logout. Some certain navigation menu only
                appears when the user are login. There are 2 galleries on this website the
                first is movie and the second one are games. Each categories contains a gallery,
                a table, and a form to input the data (to access the table and form the user are required to login).
            </p></li>
        </ol>
        </div>
        </>
    )
}

const AboutSection = () => <LayOutWeb content={<About/>}/>

export default AboutSection