import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL, UserTokenContext, UserNicknameContext } from "../../contexts/UserContext";
import TodolistInputBox from "../TodolistInputBox";
import TodolistContent from "../TodolistContent";
import { getAuthToken, getNickName } from "../utilities/utils";
import {
    TodolistSwalSucces,
    TodolistSwalDel,
    TodolistSwalLogOut,
    TodolistSwalClearAll,
    TodolistSwalClearSucces,
} from "../utilities/TodolistSwal";

export default function PageTodolist() {
    const [todoData, setTodoData] = useState([
        {
            id: "",
            content: "",
            completed_at: "",
        },
    ]);

    const navigate = useNavigate();
    const token = getAuthToken();

    const { currentToken, setCurrentToken } = UserTokenContext();
    const { currentNickname, setCurrentNickname } = UserNicknameContext(null);
    const nickNameValue = getNickName();

    const todolistGetApi = async () => {
        try {
            const res = await axios.get(`${API_URL}todos`, {
                headers: {
                    Authorization: currentToken,
                },
            });
            const getData = res.data.todos;
            setTodoData(getData);
        } catch (err) {
            console.log(err);
        }
    };

    const todolistPostApi = async (todoThing) => {
        setTodoData([
            {
                ...todoData,
            },
        ]);
        try {
            // eslint-disable-next-line no-unused-vars
            const res = await axios.post(
                `${API_URL}todos`,
                {
                    todo: {
                        content: todoThing.trim(),
                    },
                },
                {
                    headers: {
                        Authorization: currentToken,
                        "Content-Type": "application/json",
                    },
                }
            );
            setTodoData([
                {
                    ...todoData,
                    content: todoThing,
                },
            ]);
            TodolistSwalSucces();
            todolistGetApi();
        } catch (err) {
            console.log(err);
        }
    };

    const delApi = async (id) => {
        try {
            // eslint-disable-next-line no-unused-vars
            const res = await axios.delete(`${API_URL}todos/${id}`, {
                headers: {
                    Authorization: currentToken,
                    "Content-Type": "application/json",
                },
            });
            TodolistSwalDel();
            todolistGetApi();
        } catch (err) {
            console.log(err);
        }
    };

    const logOut = (e) => {
        e.preventDefault();
        axios
            .delete(`${API_URL}users/sign_out`, {
                headers: {
                    Authorization: currentToken,
                    "Content-Type": "application/json",
                },
            })
            .then(() => {
                TodolistSwalLogOut();
                setCurrentToken(null);
                setCurrentNickname(null);
                localStorage.clear();
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const listClearAll = () => {
        const doneList = todoData.filter(item => {
            return item.completed_at !== null;
        });

        const urls = doneList.map(item => {
            return `${API_URL}todos/${item.id}`;
        });
        TodolistSwalClearAll().then(res => {
            if (res.isConfirmed) {
                Promise.all(
                    urls.map((url) => {
                        return axios.delete(url, {
                            headers: {
                                Authorization: currentToken,
                                "Content-Type": "application/json",
                            },
                        });
                    })
                ).then(() => {
                    todolistGetApi();
                    TodolistSwalClearSucces();
                });
            }
        });
    };

    useEffect(() => {
        todolistGetApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentToken, token, nickNameValue, currentNickname]);

    return (
        <div
            id="todoListPage"
            className="bg-half">
            <nav className="flex justify-between py-6 px-8">
                <h1>
                    <Link
                        to="/PageTodolist"
                        className="h1-logo">
                        ONLINE TODO LIST
                    </Link>
                </h1>
                <ul className="flex gap-6">
                    <li className="font-bold">
                        <Link to="/PageTodolist">
                            {currentNickname}的代辦
                        </Link>
                    </li>
                    <li>
                        <Link to="/"
                            className="font-bold"
                            onClick={logOut}>
                            登出
                        </Link>
                    </li>
                </ul>
            </nav>
            <div
                className="container mx-auto h-screen w-4/5 py-4 px-8 md:w-2/3 lg:w-[45%]">
                <TodolistInputBox
                    todolistPostApi={todolistPostApi}
                />
                <TodolistContent
                    todoData={todoData}
                    delApi={delApi}
                    todolistGetApi={todolistGetApi}
                    listClearAll={listClearAll}
                />
            </div>
        </div>
    );
}
