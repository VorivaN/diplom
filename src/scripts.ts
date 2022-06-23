const api_key = '73335b461e02a24bcf73ca10f447db52';

export type Artist = {
    name: string,
    url: string
};

export type Track = {
    name: string,
    url: string,
    artist: Artist
}

async function getData(url: string)  {
    const response = await fetch(url);
    return response.json();
}

export function getTopTracks(limit: number): Promise<Track[]>  {
    const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${api_key}&format=json&limit=${limit}`
   
    let json =  getData(url);
    return json.then(element => {
        return element.tracks.track;
    });
}

export function getSearchedTracks(songName: string, limit: number): Promise<Track[]> {
    const url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${songName}&api_key=${api_key}&format=json&limit=${limit}`
    let json =  getData(url);
    return json.then(element => {
        return element.results.trackmatches.track.map((e : Track) => {
            return {
                name: e.name,
                url: e.url,
                artist: {
                    name: e.artist
                }
            };
        });
    });
}
