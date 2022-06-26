import React from 'react';
import { Routes, Route, RouterProps, Link, useParams, useSearchParams, Navigate } from "react-router-dom";
import { Track,  getTopTracks, getSearchedTracks } from "./scripts";
import { Tracks } from './Tracks';


interface ChartProps {
    onTrackChange: Function
}

export function Chart  (props : ChartProps) {

    const [data, setData] = React.useState<Track[]>([]);
    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
    const [hasError, setHasError] = React.useState<boolean>(false);
    const [loadError, setError] = React.useState<string>("");

    
    React.useEffect(() => {
         getTopTracks(100).then(result => {
            setData(result);
            setIsLoaded(true);
        },
        error => {
            setHasError(true);
            setError(error);
        })
    }, []);

    
    if(hasError) {
        return (
        <>
            <p className='p_notify'>{loadError}</p>
        </>);
    }
    if(!isLoaded) {
        return (
        <>
            <p className='p_notify'>Загрузка...</p>
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