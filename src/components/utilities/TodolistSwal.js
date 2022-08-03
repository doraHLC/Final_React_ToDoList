import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const TodolistSwalSucces = () => {
    return MySwal.fire({
        icon: "success",
        title: "新增成功!"
    });
}

export const TodolistSwalDel = () => {
    return MySwal.fire({
        icon: "success",
        title: "刪除成功!"
    });
}

export const TodolistSwaledit = () => {
    return MySwal.fire({
        title: '輸入修改內容',
        input: 'text',
        inputLabel: '',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return '沒有內容資訊'
            }
        }
    })
}

export const TodolistSwalLogOut = () => {
    return MySwal.fire({
        icon: "success",
        title: "已登出!"
    })
}

export const TodolistSwalClearAll = () => {
    return MySwal.fire({
        title: '清除全部已完成項目嗎?',
        text: "清除後將無法回復!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '是的，清除全部已完成項目!'
    })
}

export const TodolistSwalClearSucces = () => {
    return MySwal.fire({
        icon: "success",
        title: "已清除全部完成項目"
    })
}