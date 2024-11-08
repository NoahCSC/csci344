import React from "react";
import Profile from  "./Profile.jsx";
import "./App.css"
export default function App() {

    return (
        <>
            <header>
                <h1>My First App</h1>
            </header>
            <main>
                <p>Hello React!</p>
                <div className="people">
                <Profile name="Anita" picture="https://picsum.photos/id/216/100/100" />
<Profile name="Ben" picture="https://picsum.photos/id/217/100/100" />
<Profile name="Adwaina" picture="https://picsum.photos/id/218/100/100" />
<Profile name="Laciesha" picture="https://picsum.photos/id/219/100/100" />
                </div>
            </main>
        </>
    );
}