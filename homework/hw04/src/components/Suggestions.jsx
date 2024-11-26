import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Suggestion from "./Suggestion";
export default function Suggestions({ token }) {
    const [suggestions, setSuggestions] = useState([]);

    async function getSuggestions() {
        const data = await getDataFromServer(token, "/api/stories");
        console.log(data);
        setSuggestions(data);
    }

    useEffect(() => {
        getSuggestions();
    }, []);


console.log(suggestions);


function outputSuggestion(suggestionObj) {
    return <Suggestion key={suggestionObj.id} Suggestion={suggestionObj} />;
  }
//   return (  <header className="flex gap-6 bg-white border p-2 overflow-hidden mb-6">
//   <div>{stories.map(outputStory)}</div>
//   </header>
// );
    return (
        <div className="mt-4">
            <p className="text-base text-gray-400 font-bold mb-4">
                Suggestions for you
            </p>

            <section className="flex justify-between items-center mb-4 gap-2">
            <div>{suggestions.map(outputSuggestion)}</div>
            </section>
        </div>
    );
}
