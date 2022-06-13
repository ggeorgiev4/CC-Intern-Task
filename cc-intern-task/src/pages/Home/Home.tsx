import { useEffect } from 'react';

export const Home = () => {
    useEffect(() => {
        fetch('https://my-json-server.typicode.com/ggeorgiev4/CC-Intern-Task/posts')
            .then((response) => response.json())
            .then((json) => console.log(json));
    });

    return <div className="home-wrapper">home</div>;
};
