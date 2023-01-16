import React from "react";
import { Link } from "react-router-dom";
import batman from "../../images/batman.png";

const Error = () => {
    const h2Style = {
        textAlign: "center",
        marginTop: "50px",
    };

    const h3Style = {
        textAlign: "center",
        marginTop: "5px",
    };
    const imgStyle = {
        display: "block",
        margin: "40px auto",
    };

    return (
        <div className="quiz-bg">
            <div className="container">
                <h2 style={h2Style}>oups, cette page n'existe pas!</h2>
                <Link to="/"><h3 style={h3Style}>Redirigez-vous vers la page home svp</h3></Link>
                <img style={imgStyle} src={batman} alt="batman" srcset="" />
            </div>
        </div>
    );
};

export default Error;