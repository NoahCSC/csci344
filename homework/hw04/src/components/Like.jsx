import React, {useState} from "react";
import {postDataToServer, deleteDataFromServer} from "../server-requests";
export default function Like({token, likeId, postId}){
    console.log(likeId);
    const [stateLikeId, setStateLikeId] = useState(likeId);
    async function createLike() {
        const sendData = {
            "post_id":postId,
        }
        console.log("Creating like");
        const responseData = await postDataToServer(token, "/api/likes/", sendData);
        console.log(responseData);
        setStateLikeId(responseData.id);
    }
    async function deleteLike() {
        const url='/api/likes/'+ stateLikeId;
        console.log("Deleting like");
        const responseData = await deleteDataFromServer(token, url);
        console.log(responseData);
        setStateLikeId(null);
    }
    if(likeId){
        return (  <button aria-label="Unlike this post." aria-checked="true" ariaRole="toggle" onClick={deleteLike}><i className="fas text-red-700 fa-heart"></i></button>);
    } else {
    return (  <button aria-label="Like this post." aria-checked="false" ariaRole="toggle" onClick={createLike}><i className="far fa-heart"></i></button>);
    }
}