import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const LoginSwalSucces = () => {
    return MySwal.fire({
        icon: "success",
        title: "登入成功!"
    });
}

export const LoginSwalFail = () => {
    return MySwal.fire({
        icon: "error",
        title: "帳號或密碼有誤，請重新登入或註冊新帳號!"
    });
}

export const LoginSwalMessage = () => {
    return MySwal.fire({
        icon: "question",
        title: "請輸入帳號資料!"
    });
}