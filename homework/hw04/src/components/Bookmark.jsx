import React, {useState} from "react";
import {postDataToServer, deleteDataFromServer} from "../server-requests";
export default function Bookmark({token, bookmarkId, postId}){
    const [stateBookmarkId, setStateBookmarkId] = useState(bookmarkId);
async function createBookmark() {
    const sendData = {
        "post_id":postId,
    }
    console.log("Creating bookmark");
    const responseData = await postDataToServer(token, "/api/bookmarks/", sendData);
    console.log(responseData);
    setStateBookmarkId(responseData.id);
}
async function deleteBookmark() {
    const url='/api/bookmarks/21'+ stateBookmarkId;
    console.log("Deleting bookmark");
    const responseData = await deleteDataFromServer(token, url);
    console.log(responseData);
    setStateBookmarkId(null);
}
    if(stateBookmarkId){
    return (<button onClick={deleteBookmark}><i className="fas fa-bookmark"></i></button>);
    } else {
        return (<button onClick={createBookmark}><i className="far fa-bookmark"></i></button>);
    }
}