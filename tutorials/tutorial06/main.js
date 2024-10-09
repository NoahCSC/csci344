// Part 1: Set up the helper functions:
// 1. Implement two filter functions (which should return either true or false):
//      * filterClassFull: to filter out the closed courses (if applicable)
//      * filterTermMatched: to only match courses relevant to the search term
// 2. Implement the dataToHTML function, which takes a course object as an
//    argument and returns an HTML string that represents the course.

// Part 2: Within the showData function, use the array's filter, map, join
//         methods, and any relevant DOM methods, to build the interface.
// 1. Use the array's built in "filter" method, which takes a filter
//    function as an argument and returns an array of objects that
//    match the criteria.
//          * Note that you can chain filter functions together.
// 2. Use the array's built in "map" method to generate an array of
//    HTML strings.
// 3. Join the array of strings on the empty string or new line character
//    to create one large HTML string.
// 4. Clear out the existing courses in the DOM and insert
//    the HTML string into the DOM.
let searchTerm = "";
const search = (ev) => {
    ev.preventDefault(); // overrides default button action

    // Get user's preferences:
     searchTerm = document.querySelector("#search_term").value;
    const openOnly = document.querySelector("#is_open").checked;

    // Pass the user's preferences into the showData function
    showData(searchTerm, openOnly);
};

// Part 1.1a
const filterClassFull = (course) => {
    // modify this
    if(course.EnrollmentCurrent>=course.EnrollmentMax){
        return true;
    } else{
        return false;
    }
    
};

// Part 1.1b
const filterTermMatched = (course) => {
    // modify this
    if(searchTerm.includes(course.Title) || searchTerm.includes(course.Code) || searchTerm.includes(course.CRN) || searchTerm.includes(course.Instructors.Username ) || searchTerm.includes(course.Hours)){
        return true;
    } else{
        return false;
    }
   
};

// Part 1.2
const dataToHTML = (course) => {
    let seats=course.EnrollmentCurrent-course.EnrollmentMax;
  
    return ` <section class="course">
            <h2>${course.Code}${course.Title}</h2>
            <p>
                <i class="fa-solid fa-circle-check"></i> 
                Open  &bull; 10174 &bull; Seats Available: ${seats}
            </p>
            <p>
                ${course.Days} &bull; ZEI 201 &bull; ${course.Hours} credit hour(s)
            </p>
            <p><strong>${course.Instructors.Username}</strong></p>
        </section>
`;
};

// Part 2
const showData = (searchTerm, openOnly) => {
    console.log(searchTerm, openOnly);
    console.log(data); // imported from course-data.js
    // Your code here:
   const h2 = document.getElementById("place");
   const collection = document.getElementsByClassName("course");
   for(let i=0; i<collection.length;i++){
    collection[i].parentNode.removeChild(collection[i]);
   }
    const matches = data.filter(filterTermMatched);
    console.log(matches);
   const htmlarray= matches.map(dataToHTML);
    console.log(htmlarray);
    const bigarray = htmlarray.join('');
    console.log(bigarray);
    //const element = document.getElementById("c1");
   // element.remove();
   // const element1 = document.getElementById("c2");
   // element1.remove();
   
    h2.insertAdjacentHTML("beforeend", bigarray);

};
