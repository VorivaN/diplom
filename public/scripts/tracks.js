import { getTopTracks, getSearchedTracks } from './requests.js';


export async function createChart(count){
    let tracks = await getTopTracks(count);
    
    let listName = document.getElementById('song_list_name');
    listName.innerHTML = "Top 100 Chart"

    createSongList(tracks);
}

export async function createSearchResults(songName, count){
    let tracks = await getSearchedTracks(songName, count);

    let listName = document.getElementById('song_list_name');
    listName.innerHTML = `Top 100 Results by '${songName}'`;

    createSongList(tracks);
}


async function createSongList(tracks){
    let trackList = document.getElementById('song_list');
    trackList.childNodes.forEach((e) => {
        trackList.removeChild(e);
    });
    for(let i in tracks) {
        let track = tracks[i];
       
        
        let elem = document.createElement('li');
        elem.innerHTML = `<a href="${track.url} " target="_blank">${track.artist.name} - ${track.name}</a>`;

        elem.addEventListener("mouseover", () => {
            let song_name_tag = document.getElementsByClassName("song_name").item(0);
            if(song_name_tag)
                song_name_tag.innerHTML = `<h1>${track.name}</h1>`;

            let artist_name_tag = document.getElementsByClassName("artist_name").item(0);
            if(artist_name_tag)
                artist_name_tag.innerHTML = `<h1>${track.artist.name}</h1>`;
        });

        trackList.appendChild(elem);
    }
}

let params = (new URL(document.location)).searchParams; 
let songName =  params.get("q");

if(songName)
    createSearchResults(songName, 100);
else
    createChart(100);