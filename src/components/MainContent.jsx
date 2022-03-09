import React from 'react';
import Input from './input/Input';
import Todos from './todos/Todos';

const MainContent = () => {
    return (
        <div className='container'>
            <Input />
            <Todos />
        </div>
    );
};

export default MainContent;