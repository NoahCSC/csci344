import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "noah";
let password = "password";

async function initializeScreen() {
    token = await getToken();
    showNav();
    showAside();
    getPosts();
    getSuggestions();
    getStories();
}

async function getToken() {
    return await getAccessToken(rootURL, username, password);
}

function showNav() {
    document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
    
}
async function showAside() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/profile/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
    document.querySelector("#header").innerHTML = `
    <header id="header" class="flex gap-4 items-center">
            <img src="${data.image_url}" class="rounded-full w-16" />
            <h2 class="font-Comfortaa font-bold text-2xl">${data.username}</h2>
        </header>
    `;
    
}
async function getStories() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/stories/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const stories = await response.json();
    console.log(stories);
    showStories(stories);
}
function showStories(stories){
const storyEl=document.querySelector("#story");
stories.forEach(story => {
const template = `

 <div class="flex flex-col justify-center items-center">
                <img src="${story.user.thumb_url}" class="rounded-full border-4 border-gray-300" />
                <p class="text-xs text-gray-500">${story.user.username}</p>
            </div>`;
            storyEl.insertAdjacentHTML("beforeend", template); 
})
}
// implement remaining functionality below:
//await / async syntax:
async function getSuggestions() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/suggestions/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const suggestions = await response.json();
    console.log(suggestions);
    showSuggestions(suggestions);
}
function showSuggestions(suggestions){
const asideEl= document.querySelector("#panel");
suggestions.forEach(suggestion => {
const template = `
<section class="flex justify-between items-center mb-4 gap-2">
                <img src="${suggestion.thumb_url}" class="rounded-full" />
                <div class="w-[180px]">
                    <p class="font-bold text-sm">${suggestion.username}</p>
                    <p class="text-gray-500 text-xs">suggested for you</p>
                </div>
                <button class="text-blue-500 text-sm py-2">follow</button>
            </section>
            
            `;
            asideEl.insertAdjacentHTML("beforeend", template);




})
}
async function getPosts() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/posts/?limit=10", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const posts= await response.json();
    console.log(posts);
    showPosts(posts);
}

function showPosts(posts){
const mainEl = document.querySelector("main");
posts.forEach(post => {
    const template =  `
     <section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${post.user.username}</h3>
                <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${post.image_url}" alt="${post.alt_text}" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                    ${getLikeButton(post)}
                     
                        <button><i class="far fa-comment"></i></button>
                        <button><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        ${getBookmarkButton(post)}
                    </div>
                </div>
                <p class="font-bold mb-3">${post.likes.length} likes</p>
                <div class="text-sm mb-3">
                    <p>
                        <strong>${post.user.username}</strong>
                        ${post.caption} <button class="button">more</button>
                    </p>
                </div>
                ${showComments(post.comments)}
                
                <p class="uppercase text-gray-500 text-xs">${post.display_time}</p>
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
                </div>
                <button class="text-blue-500 py-2">Post</button>
            </div>
        </section>
    `;
    mainEl.insertAdjacentHTML("beforeend", template)
});
}
function showComments(comments){
    if(comments.length > 1){
        const lastComment = comments[comments.length-1];
        return `<button> Show All ${comments.length} Comments</button>
        <p>${lastComment.user.username} ${lastComment.text}</p>
        `
    }
    if(comments.length === 1){
return `<p>${comments[0].user.username} ${comments[0].text}</p>`
    }
    return ``;
}
function getLikeButton(post){
  let iconClass = "far";
  if(post.current_user_like_id){
   iconClass="fa-solid text-red-700"
  }
    // return `<button><i class="fa-solid fa-heart text-red-700"></i></button>`
    return `<button><i class="${iconClass} fa-heart"></i></button>`
}
function getBookmarkButton(post){
    if(post.current_user_bookmark_id){
         return `<button onclick="deleteBookmark(${post.current_user_bookmark_id})"><i class="fa-solid fa-bookmark"></i></button>`;
         } else {
            return `<button onclick="createBookmark(${post.id})"><i class="far fa-bookmark"></i></button>`;
         }
    // let iconClass = "far";
    // if(post.current_user_bookmark_id){
    //  iconClass="fa-solid"
    // }
    //   // return `<button><i class="fa-solid fa-heart text-red-700"></i></button>`
    //   return `<button><i class="${iconClass} fa-bookmark"></i></button>`
  }
 window.createBookmark = async function (postID){
    const postData = {
        "post_id": postID,
    };
    
console.log({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}` ,
});
        const response = await fetch("https://photo-app-secured.herokuapp.com/api/bookmarks/", {
            method: "POST",
            headers: {
                'Content-Type': `application/json`,
                Authorization: `Bearer ${token}` ,
            },
            body: JSON.stringify(postData)
        });
        const data = await response.json();
        console.log(data);
    
  }
  window.deleteBookmark= async function(bookmarkID) {
    const response = await fetch(`https://photo-app-secured.herokuapp.com/api/bookmarks/${bookmarkID}`, {
        method: "DELETE",
        headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${token}` ,
        }
    });
    const data = await response.json();
    console.log(data);
  }

  
// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();
