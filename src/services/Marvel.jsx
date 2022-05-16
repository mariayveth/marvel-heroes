import md5 from 'md5'

const API_PUBLIC = '8aea138efab9f5d5d0d37aaa771ad9ee';
const API_PRIVATE = '201dee236dcc2d4420e2d34d9a3bee559041ad0a';
const BASE_URL = new URL('https://gateway.marvel.com');


export async function fetchHeroes(offset) {
    const ts = Date.now();
    const params = {
        ts,
        apikey: API_PUBLIC,
        hash: md5(ts + API_PRIVATE + API_PUBLIC),
        limit: offset !== undefined ? 50 : undefined,
        offset
    };
    BASE_URL.search = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL.origin}/v1/public/characters${BASE_URL.search}`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data.data.results;
}


export async function fetchHero(id) {
    const ts = Date.now();
    const params = {
        ts,
        apikey: API_PUBLIC,
        hash: md5(ts + API_PRIVATE + API_PUBLIC),
    };
    BASE_URL.search = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL.origin}/v1/public/characters/${id}${BASE_URL.search}`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data.data.results[0];
}

export async function fetchComics(id, offset) {
    const ts = Date.now();
    const params = {
        ts,
        apikey: API_PUBLIC,
        hash: md5(ts + API_PRIVATE + API_PUBLIC),
        limit: offset !== undefined ? 3 : undefined,
        offset
    };
    BASE_URL.search = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL.origin}/v1/public/characters/${id}/comics${BASE_URL.search}`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data.data.results;
}


