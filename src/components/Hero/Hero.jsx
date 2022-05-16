import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap'
import * as Marvel from '../../services/Marvel';
import "./Hero.css"
import ComicsList from './ComicsList';
const Hero = () => {
    const [hero, setHero] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const tokenString = localStorage.getItem('login');
    const userToken = JSON.parse(tokenString);

    const getHero = async (id) => {
        const heroDetails = await Marvel.fetchHero(id);
        await setHero([heroDetails]);
    };
    


    const heroCard = (hero) => {
        return (
            <Card className='p-2 bg-dark text-white' key={hero.id} id={hero.id} style={{ width: 'auto' }}>
                <Card.Img variant="top" className='img-darken' src={`${hero.thumbnail.path}/landscape_incredible.${hero.thumbnail.extension}`} alt="Card image" />
                <Card.Title className='mt-3 mb-3'><h3>{hero.name}</h3></Card.Title>
                <Card.Text><b>Description: </b>
                    {hero.description}
                </Card.Text>
                <Card.Text>
                    <b>Comics: </b>
                    <ComicsList id = {hero.id} available= {hero.comics.available} />
                    <br />
                </Card.Text>
                <Card.Footer className="">
                    <Link className='btn btn-danger' to={`/heroes`}>Volver</Link>
                </Card.Footer>
            </Card>
        )
    }

    useEffect(() => {
        if (!userToken) {
            return navigate('/login' , { replace: true });
        }
        getHero(id);
    }, [id, navigate, userToken])

    return (
        <div className="mt-5 mb-5">
            <Row className="row d-flex justify-content-center">
                <Col className="col-md-6">
                    {hero.map((hero) =>
                        heroCard(hero)
                    )}
                </Col>
            </Row>
        </div>
    )
}

export default Hero
