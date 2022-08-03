import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const SignUpSwalSucces = () => {
    return MySwal.fire({
        icon: "success",
        title: "註冊成功!"
    });
}

export const SignUpSwalFail = () => {
    return MySwal.fire({
        icon: "error",
        title: "帳號已被使用或密碼字數至少6位!"
    });
}