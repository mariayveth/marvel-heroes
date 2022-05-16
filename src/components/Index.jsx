import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Index = ({token}) => {
    const navigate = useNavigate();
    const tokenString = localStorage.getItem('login');
    const userToken = JSON.parse(tokenString);

    useEffect(() => {
        if (!userToken) {
            return navigate('/login' , { replace: true });
        } else {
            return navigate('/heroes' , { replace: true })
        }
    }, [navigate, userToken])
}
export default Index

