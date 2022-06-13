import { useEffect } from 'react';

export const Home = () => {
    useEffect(() => {
        fetch('https://my-json-server.typicode.com/ggeorgiev4/CC-Intern-Task/posts/1')
            .then((response) => response.json())
            .then((json) => console.log(json));

        fetch('https://my-json-server.typicode.com/ggeorgiev4/CC-Intern-Task/users/1')
            .then((response) => response.json())
            .then((json) => console.log(json));
    });

    return <div className="home-wrapper">home</div>;
};
