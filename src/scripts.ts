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
    try{
        const response = await fetch(url);
        return response.json();
    } catch (err){
        throw `Ошибка GET запроса по адресу ${url.substring(0, 50)}...`;
    }
}

export function getTopTracks(limit: number): Promise<Track[]>   {
    const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${api_key}&format=json&limit=${limit}`
   
    let json =  getData(url);
    return json.then(result => {
        return result.tracks.track;
    }, error => {
        throw `Не удалось получить топ-100 треков: ${error}`;
    });
}

export function getSearchedTracks(songName: string, limit: number): Promise<Track[]> {
    const url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${songName}&api_key=${api_key}&format=json&limit=${limit}`
    let json =  getData(url);
    return json.then(result => {
        return result.results.trackmatches.track.map((e : Track) => {
            return {
                name: e.name,
                url: e.url,
                artist: {
                    name: e.artist
                }
            };
        });
    }, error => {
        throw `Не удалось получить топ-100 треков по запросу ${songName}: ${error}`;
    });
}
