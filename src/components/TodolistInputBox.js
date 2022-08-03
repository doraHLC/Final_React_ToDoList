import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TodolistInputBox({ TodolistPostApi }) {
    const [value, setValue] = useState('');

    const valueChange = e => {
        setValue(e.target.value)
    }
    const inputClick = () => {
        TodolistPostApi(value);
        setValue('');
    }

    return (
        <div className='relative mb-4'>
            <input
                className="w-full py-3 px-4 rounded-lg shadow-[0_0_15px_0_rgba(0,0,0,0.3)]"
                type="text"
                placeholder="請輸入待辦事項"
                value={value}
                onChange={valueChange} />
            <FontAwesomeIcon
                className='block p-3 bg-[#333333] text-white rounded-lg absolute top-1 right-1'
                icon="fa fa-plus"
                onClick={inputClick} />
        </div>
    )
}