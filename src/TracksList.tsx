import React from 'react';
import { Routes, Route, RouterProps, Link, useParams, useSearchParams, Navigate } from "react-router-dom";
import { Track,  getTopTracks, getSearchedTracks } from "../src/scripts";
import { Tracks } from './Tracks';

export function TracksList( {...props} : { tracks: Promise<Track[]>, onTrackChange: Function }) {
    const [data, setData] = React.useState<Track[]>([]);
    const [hasError, setHasError] = React.useState<boolean>(false);
    const [loadError, setError] = React.useState<string>("");

    React.useEffect(() => {
        props.tracks.then((e) => setData(e))
          .catch((error) => {
            setHasError(true);
            setError("Произошла ошибка при загрузке треков.\n Ошибка: " + error.stack);
        });
    }, []);

    
    if(hasError){
        return (
        <>
            <p className='p_error'>{loadError}</p>
        </>);
    }
    return (
    <>
        <ol className="rounded">{data.map((item) => {
            return  <li key={item.url}><a className='linq_a' href={item.url} target="_blank" onMouseOver={() => props.onTrackChange(item.name, item.artist.name) }>{item.artist.name + ' - ' + item.name}</a></li>;
        })}
        </ol>
    </>);
}