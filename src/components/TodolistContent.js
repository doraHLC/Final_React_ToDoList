import { useState } from "react";
import TodolistTab from './TodolistTab';
import TodolistItem from './TodolistItem';

export default function TodolistContent({ todoData, delApi, todolistGetApi, listClearAll }) {
    const doneListLength = todoData.filter(item => {
        return (item.completed_at !== null)
    }).length;

    const [tabStatus, setTabStatus] = useState('all');

    const mapTodoData = todoData.map((todo, i) => {
        return (
            <TodolistItem
                key={i}
                todo={todo}
                delApi={delApi}
                todolistGetApi={todolistGetApi}
                tabStatus={tabStatus} />
        )
    });

    const tabClick = (e) => {
        const toggleTab = e.target.dataset.tab;
        setTabStatus(toggleTab);
    };

    return (
        <div
            className="rounded-lg bg-white shadow-[0_0_15px_0_rgba(0,0,0,0.3)]">
            <TodolistTab
                tabClick={tabClick}
                tabStatus={tabStatus} />
            <div className="pt-6 pl-6 pr-4 pb-8">
                <ul className="mb-2">
                    {mapTodoData}
                </ul>
                <div className="flex justify-between">
                    <p
                        className="text-sm font-bold text-[#333333]">
                        <span>
                            {doneListLength}
                        </span>
                        個已完成項目
                    </p>
                    <p
                        className="text-sm font-bold text-[#9F9A91] cursor-pointer"
                        onClick={listClearAll}>
                        清除已完成項目
                    </p>
                </div>
            </div>
        </div>
    )
}