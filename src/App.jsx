import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios import 합니다.

const App = () => {
    const [todos, setTodos] = useState(null);
    const [inputValue, setInputValue] = useState({
        title: '',
    });

    // axios를 통해서 get 요청을 하는 함수를 생성합니다.
    // 비동기처리를 해야하므로 async/await 구문을 통해서 처리합니다.
    const fetchTodos = async () => {
        // const response = await axios.get('http://localhost:4000/todos');
        // console.log('response', response);
        const { data } = await axios.get('http://localhost:4000/todos');
        console.log('data', data);
        setTodos(data); // 서버로부터 fetching한 데이터를 useState의 state로 set 합니다.
    };

    const onSubmitHandler = async () => {
        axios.post('http://localghost:4000/todos', inputValue);
    };

    // 생성한 함수를 컴포넌트가 mount 됐을 떄 실행하기 위해 useEffect를 사용합니다.
    useEffect(() => {
        // effect 구문에 생성한 함수를 넣어 실행합니다.
        fetchTodos();
    }, []);

    // data fetching이 정상적으로 되었는지 콘솔을 통해 확인합니다.
    // console.log(todos); // App.js:16
    return (
        <>
            <div>
                {/* input 영역 */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        // 버튼 클릭 시, input에 들어있는 값(state)을 이용하여 DB에 저장(post 요청)
                        onSubmitHandler();
                    }}
                >
                    <input
                        type="text"
                        value={inputValue.title}
                        onChange={(e) => {
                            setInputValue({ title: e.target.value });
                        }}
                    />
                    <button>추가</button>
                </form>
            </div>
            <div>
                {/* 데이터 영역 */}
                {todos?.map((item) => {
                    return (
                        <div key={item.id}>
                            {item.id} : {item.title}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default App;
