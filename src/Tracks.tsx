
import React from 'react';
import { Routes, Route, RouterProps, Link, useParams, useSearchParams, Navigate } from "react-router-dom";
import { Track,  getTopTracks, getSearchedTracks } from "../src/scripts";
import { Chart } from "./Chart"
import { Search } from './Search';

export function Tracks ( {...props} : { onTrackChange: Function }) {
    const [searchParams] = useSearchParams();
    let q = searchParams.get("q");

    if(q){
        return (
            <>
                <h1 className="tracks">Top 100 Tracks by request: {q}</h1>
                <div className="post-1">
                    <div className="scroll_elem">
                        <Search songName={q} onTrackChange={props.onTrackChange}/>
                    </div>
                </div>
            </>);
    } else {
        return (
            <>
                <h1 className="tracks">Top 100 Chart</h1>
                <div className="post-1">
                    <div className="scroll_elem">
                    <Chart onTrackChange={props.onTrackChange}/>
                    </div>
                </div>
            </>);
    }
}