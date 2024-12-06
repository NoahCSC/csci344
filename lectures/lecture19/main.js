// https://www.apitutor.org/spotify/simple/v1/search?q=beyonce&type=track&limit=5

/** 1. Write an asynchronous function that accepts two arguments...
 *       - A search term
 *       - The number of results
 *
 * Your function will then query Spotify based on the arguments provided and
 * returns a list of data matching the search criteria.
 *
 *
 *  2. Write a function that accepts a JavaScript "track" object and returns an
 *     HTML representation of this object
 *
 *  3. Wire up the functiontality that you made to an HTML search form. When
 *     the user types in a search term and clicks the submit button, your form
 *     should show a list of the matching tracks.
 *
 */
async function spotifySearch(searchTerm,limit) {
    const searchURL=`https://www.apitutor.org/spotify/simple/v1/search?q=${searchTerm}&type=track&limit=${limit}`;
    console.log(searchTerm, limit)
    const response= await fetch(searchURL);
    const data = await response.json();
    console.log(data);
    return data;
}
spotifySearch("Linkin Park", 5)