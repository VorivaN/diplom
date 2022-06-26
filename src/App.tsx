import React from 'react';
import { Routes, Route, RouterProps, Link, useParams, useSearchParams, Navigate } from "react-router-dom";
import { Track,  getTopTracks, getSearchedTracks } from "../src/scripts";

import { TracksPage } from "./TracksPage"

export default function App() {
	return (
    <>
        <div className="flex-container-head">
            <div className="logo_pic_area">
                <a href='/'>
                    <img  src="resource/music-store.png" alt="logo" className="logo_pic" />
                </a>
                </div>
            <div className="logo">
                <p className="logo_text">MyMusic</p>
            </div>
            <div className="search">
                <form className="input_form">
                    <input type="search" className="input_search" id="song-search" name="q" placeholder="Search the song..." />
                    <i className="fa fa-search" />
                </form>
            </div>
        </div>
		<div>
			<Routes>
				<Route path="/" element={<TracksPage />} />
                <Route path="*" element = { <Navigate to="/" /> } />
			</Routes>
		</div>
    </>
	);
}
