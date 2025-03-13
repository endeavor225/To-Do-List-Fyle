import React, { useEffect } from 'react'
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export default function Error() {

    useEffect(()=> {
        window.scrollTo(0, 0)
    },[])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Result
                status="404"
                title="404"
                subTitle="Désolé, la page que vous avez visitée n'existe pas."
                extra={<Link to="/">Retour à la page d'accueil</Link>}
            />
        </div>
    )
}