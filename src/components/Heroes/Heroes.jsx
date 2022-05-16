import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap'
import * as Marvel from '../../services/Marvel';
import "./Heroes.css";



const Heroes = ({token}) => {
    const [heroes, setHeroes] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const tokenString = localStorage.getItem('login');
    const userToken = JSON.parse(tokenString);
    const user = userToken?.user;
    const more = async () => {
        setOffset(offset + 50);
        setIsLoading(true);
    }
    
    const characterCard = (hero) => {
        if (hero.description !== "") {
            return (
                <Card className='bg-dark text-white p-2 heroes__card' key={hero.id} style={{ width: '12rem' }}>
                    <Card.Img variant="top" src={`${hero.thumbnail.path}/landscape_medium.${hero.thumbnail.extension}`} />
                    <Card.Body>
                        <Card.Title>{hero.name}</Card.Title>
                        <Card.Text> Nº de Comics: {hero.comics.available}</Card.Text>
                        <Link className='btn btn-primary' to={`/hero/${hero.id}`}>Detalles</Link>
                    </Card.Body>
                </Card>
            )
        }
    }
    
    const logout = () => {
        localStorage.removeItem('login');
        navigate('/', { replace: true });
    }
    useEffect(() => {
        if (!userToken) {
            return navigate('/login' , { replace: true });
        }
        const getHeroes = async () => {
            const heroesList = await Marvel.fetchHeroes(offset);
            setHeroes([...heroes, ...heroesList]);
            setIsLoading(false);
        };
        
        getHeroes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset]);

    return (
        <div>
            <Row className="row d-flex justify-content-center mt-3 mb-3  heroes__navbar d-flex bd-highlight mb-3">
                <Col className="col-md-9">
                    <h1 className='p-2 bd-highlight'>Bienvenido <b className='text-user'>{user?.name} {user?.lastname}</b></h1>
                </Col>
                <Col className="col-md-3 ms-auto">
                    <h1>
                <Link onClick={logout} className='btn btn-danger btn-lg mt-2 ' to={"/"}>Cerrar Sesión</Link>
                </h1>
                </Col>
            </Row>
            <Row className="row d-flex justify-content-center">
                {heroes.map((hero) =>
                    characterCard(hero)
                )}
            </Row>
            <Row className="row d-flex justify-content-center mb-2">
                <Col className="col-md-6 text-center">
                    <Button variant="primary" onClick={more}>{isLoading === false ? 'Más heroes' : 'Cargando'}</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Heroes