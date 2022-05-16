import React, { useState, useEffect } from 'react'
import * as Marvel from '../../services/Marvel';
import "./Hero.css"

const ComicsList = ({ available, id }) => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hiddenButton, setHiddenButton] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const moreComics = () => {
        setOffset(offset + 3);
        setIsLoading(true);
    }
    const notComics = () => {
        return (
            <div>Este personaje no tiene comics asociados.</div>
        )
    }
    useEffect(() => {
        if (comics.length !== available ) {
            setHiddenButton(false);
        } else if (comics.length === available) {
            setHiddenButton(true);
        }
        const getComics = async () => {
            const comicsList = await Marvel.fetchComics(id, offset);
            setComics([...comics, ...comicsList]);
            setIsLoading(false);
        };
        getComics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset])

    const printComics = (comic, index) => {


        return (
            <li key={index} className='li-comics'>{comic.title}</li>
        )
    }

    return (
        <div>
            {comics.length === 0 ? notComics() : null }
            {comics.map((comic, index) => (printComics(comic, index)))}
            {!hiddenButton ? <span className='text-muted text-more-comics' onClick={moreComics}>{isLoading === false ? 'Más Comics' : 'Cargando'}</span> : null}
        </div>
    )
}

export default ComicsList
