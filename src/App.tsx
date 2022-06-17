import React from 'react';
import { Routes, Route, RouterProps, Link, useParams, useSearchParams, Navigate } from "react-router-dom";
import { Track,  getTopTracks, getSearchedTracks } from "../src/scripts";



export default function App() {
	return (
    <>
        <div className="flex-container-head">
            <div className="logo_pic_area">
                <img src="resource/music-store.png" alt="logo" className="logo_pic" />
            </div>
            <div className="logo">
                <p className="logo_text">MyMusic</p>
            </div>
            <div className="search">
                <form>
                    <input type="search" id="song-search" name="q" placeholder="Search the song..." />
                    <i className="fa fa-search"></i>
                </form>
            </div>
        </div>
		<div>
			<Routes>
				<Route path="/tracks" element={<TracksPage />} />
                <Route path="*" element = { <Navigate to="/tracks" /> } />
			</Routes>
		</div>
    </>
	);
}


function TracksPage() {
	return (
    <>
        <div className="site_body">
            <div className="grid-container">
                <Tracks />
                <div className="post-2">
                    <div className="song_area">
                        <div className="song_name">
                            <h1>Song name</h1>
                        </div>
                        <div className="artist_name">
                            <h1>Artist name</h1>
                        </div>
                        <img src="resource/1_podborka_04.jpg" alt="album" className="album_pic" />
                    </div>
                </div>
            </div>
        </div> 
    </>
	);
}


function Tracks () {
    const [searchParams, setSearchParams] = useSearchParams();
    let q = searchParams.get("q");
    //let header =  document.getElementsByClassName("tracks").item(0);

    if(q){
        return (
        <>
            <h1 className="tracks">Top 100 Tracks by request: {q}</h1>
            <div className="post-1">
                <div className="scroll_elem">
                <TracksList tracks={ getSearchedTracks(q, 100) } />
                </div>
            </div>
        </>);
    } else {
        return (
            <>
                <h1 className="tracks">Top 100 Chart</h1>
                <div className="post-1">
                    <div className="scroll_elem">
                    <TracksList tracks={ getTopTracks(100) } />
                    </div>
                </div>
            </>);
    }
}

 
function TracksList({...props} : { tracks: Promise<Track[]> }) {
    const [data, setData] = React.useState<Track[]>([]);
   

    React.useEffect(() => {
        props.tracks.then((e) => setData(e))
          .catch((error) => console.log(error));
      }, []);

    return (
    <>
        <ol className="rounded">{data.map((item) => {
            return  <li key={item.url}><a href={item.url} target="_blank" onMouseOver={() => {

                let song_name_tag = document.getElementsByClassName("song_name").item(0);
                if(song_name_tag)
                    song_name_tag.innerHTML = `<h1>${item.name}</h1>`;

                let artist_name_tag = document.getElementsByClassName("artist_name").item(0);
                if(artist_name_tag)
                    artist_name_tag.innerHTML = `<h1>${item.artist.name}</h1>`;
            }     
            }>{item.artist.name + ' - ' + item.name}</a></li>;
        })}
        </ol>
    </>);
}
