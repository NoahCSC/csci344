
import React, { useState, useEffect } from "react";

export default function Profile({ token }) {

    let data="";
    const [profile, setProfile] = useState([]);
    async function getProfile() {
        const response = await fetch("https://photo-app-secured.herokuapp.com/api/profile/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            }
        });
         data = await response.json();
     //   console.log(data);
        setProfile(data);
    }
    useEffect(() => {
        getProfile();
    }, []);
    return (
        <header className="flex gap-4 items-center">
          <img src={profile.thumb_url} className="rounded-full w-16" />
            <h2 className="font-Comfortaa font-bold text-2xl">{profile.username}</h2>
        </header>
        
    );
}
