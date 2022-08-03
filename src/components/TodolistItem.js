import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { API_URL, UserTokenContext } from '../contexts/UserContext';
import { TodolistSwaledit } from './utilities/TodolistSwal';

export default function TodolistItem({ todo, delApi, todolistGetApi, tabStatus }) {
    const { id, content, completed_at } = todo;
    const { currentToken } = UserTokenContext(null);

    const checked = completed_at !== null ? "checked" : "";

    const delClick = () => {
        delApi(id);
    }

    const toggleList = async () => {
        try {
            // eslint-disable-next-line no-unused-vars
            const res = await axios
                .patch(`${API_URL}todos/${id}/toggle`, {},
                    {
                        headers: {
                            'Authorization': currentToken,
                        }
                    });
            todolistGetApi();
        } catch (err) {
            console.log(err);
        }
    }

    const editTodolist = () => {
        TodolistSwaledit()
            .then(editTxt => {
                axios.put(`${API_URL}todos/${id}`,
                    {
                        todo: {
                            'content': editTxt.value.trim()
                        }
                    },
                    {
                        headers: {
                            'Authorization': currentToken
                        }
                    }).then(() => {
                        todolistGetApi();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
    }

    const listItem = () => {
        return (
            <li
                id={id}
                className="flex mb-4 items-center">
                <label
                    className="flex w-full pb-4 border-b border-[#e5e5e5] text-[#333333]">
                    <input
                        className="w-5 h-5 mr-4 strikethrough"
                        type="checkbox"
                        checked={checked}
                        onChange={toggleList} />
                    <span
                        className="break-all">
                        {content}
                    </span>
                </label>
                <FontAwesomeIcon
                    icon="fa-solid fa-pen-to-square"
                    id={id}
                    onClick={editTodolist}
                    className="text-xl pb-4 ml-4 cursor-pointer" />
                <FontAwesomeIcon
                    icon="fa fa-times"
                    id={id}
                    className="text-xl pb-4 ml-4 cursor-pointer opacity-30 hover:opacity-100"
                    onClick={delClick} />
            </li>
        )
    }

    const itemStatus = completed_at ? 'completed' : 'active';

    if ((tabStatus === 'all') || (tabStatus === 'work' && itemStatus === 'active') || (tabStatus === 'done' && itemStatus === 'completed')) {
        return listItem();
    };
}