import React from 'react';
import { Routes, Route, RouterProps, Link, useParams, useSearchParams, Navigate } from "react-router-dom";
import { Track,  getTopTracks, getSearchedTracks } from "../src/scripts";

import { Tracks } from "./Tracks"


export function TracksPage() {
    const [songName, setSongName] = React.useState<string>("Song name");
    const [artistName, setArtistName] = React.useState<string>("Artist name");

    let onTrackChange = (songName: string, artistName: string)=> {
        setSongName(songName);
        setArtistName(artistName);
    }

	return (
    <>
        <div className="site_body">
            <div className="grid-container">
                <Tracks onTrackChange={ onTrackChange } />
                <div className="post-2">
                    <div className="song_area">
                        <div className="song_name">
                            <h1 className="text_in_h1">{songName}</h1>
                        </div>
                        <div className="artist_name">
                            <h1 className="text_in_h1">{artistName}</h1>
                        </div>
                        <img src="resource/1_podborka_04.jpg" alt="album" className="album_pic" />
                    </div>
                </div>
            </div>
        </div> 
    </>
	);
}