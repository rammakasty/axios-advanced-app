import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
    const [todos, setTodes] = useState(null);
    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:4001/todos');
        // console.log('response', response);
        setTodes(data);
    };
    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <>
            <div>
                {todos?.map((item) => {
                    return (
                        <div key={item.id}>
                            {item.id}
                            {item.title}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default App;
