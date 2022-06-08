const api_key = '73335b461e02a24bcf73ca10f447db52';
const secret = '120fdfe95521e0b2fd288535a3c23cfa';

async function getData(url)  {
    const response = await fetch(url);
    return response.json();
}

export function getTopTracks(limit) {
    const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${api_key}&format=json&limit=${limit}`
    let json =  getData(url);
    return json.then(element => {
        return element.tracks.track;
    });
}

export function getSearchedTracks(songName, limit) {
    const url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${songName}&api_key=${api_key}&format=json&limit=${limit}`
    let json =  getData(url);
    return json.then(element => {
        return element.results.trackmatches.track.map((e) => {
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
