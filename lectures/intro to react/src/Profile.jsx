import "./Profile.css";
import React from "react";

export default function Profile({name, picture}) {
    return (
        <section className="profile">
            <img src={picture} alt="picture of user" />
          <h2>{name}</h2>
        </section>
    );
}