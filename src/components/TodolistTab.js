export default function TodolistTab({ tabClick, tabStatus }) {
    return (
        <ul
            className="flex justify-evenly">
            <li
                data-tab="all"
                onClick={tabClick}
                className={`w-full text-center p-3 font-black text-[#9F9A91] border-[#efefef] border-solid border-b-2 cursor-pointer ${tabStatus === "all" ? "active" : null}`}>
                全部
            </li>
            <li
                data-tab="work"
                className={`w-full text-center p-3 font-black text-[#9F9A91] border-[#efefef] border-solid border-b-2 cursor-pointer ${tabStatus === "work" ? "active" : null}`}
                onClick={tabClick}>
                待完成
            </li>
            <li
                data-tab="done"
                className={`w-full text-center p-3 font-black text-[#9F9A91] border-[#efefef] border-solid border-b-2 cursor-pointer ${tabStatus === "done" ? "active" : null}`}
                onClick={tabClick}>
                已完成
            </li>
        </ul>
    );
}