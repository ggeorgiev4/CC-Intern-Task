import React, { useContext, useState } from 'react';
import './App.css';
import { AppRoutes } from './routing/AppRoutes';

export const AppContext = React.createContext({
    data: {
        id: true,
        name: true,
        actions: true,
    },
    setPropsVisibility: (data: { data: { id: boolean; name: boolean; actions: boolean } }) => {},
});

function App() {
    const [propsVisibility, setPropsVisibility] = useState({
        data: {
            id: useContext(AppContext).data.id,
            name: useContext(AppContext).data.name,
            actions: useContext(AppContext).data.actions,
        },
    });

    const contextValue = { ...propsVisibility, setPropsVisibility };

    return (
        <AppContext.Provider value={contextValue}>
            <div className="app">
                <AppRoutes />
            </div>
        </AppContext.Provider>
    );
}

export default App;
