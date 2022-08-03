import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { API_URL, UserTokenContext, UserNicknameContext } from '../contexts/UserContext';
import { setAuthToken, setNickName } from './utilities/utils';
import { SignUpSwalSucces, SignUpSwalFail } from './utilities/SignUpSwal';

export default function SignUpForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues:
        {
            email: "",
            nickname: "",
            password: ""
        }
    });

    const { setCurrentToken } = UserTokenContext(null);
    const { setCurrentNickname } = UserNicknameContext(null);

    const navigate = useNavigate();

    const onSubmit = data => {
        const {
            email,
            nickname,
            password
        } = data;

        axios
            .post(`${API_URL}users`,
                {
                    "user": {
                        "email": email.trim(),
                        "nickname": nickname.trim(),
                        "password": password.trim()
                    }
                })
            .then(res => {
                const token = res.headers.authorization;
                setAuthToken(token);
                setNickName(nickname);
                setCurrentToken(token);
                setCurrentNickname(nickname);
                SignUpSwalSucces();
                navigate("/PageTodolist");
            })
            .catch(err => {
                console.log(err);
                SignUpSwalFail();
            });
    }

    return (
        <form
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}>
            <h2
                className="text-xl text-center font-black mb-5 md:text-2xl md:text-left">
                註冊帳號
            </h2>
            <label
                className="text-md font-black mb-1.5"
                htmlFor="email">
                Email
            </label>
            <input
                className="mb-1 py-3 px-4 rounded-lg"
                name="email"
                type="text"
                placeholder="email"
                {...register("email",
                    {
                        required: {
                            value: true,
                            message: '請輸入資料內容!'
                        },
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "格式有誤!"
                        }
                    }
                )} />
            <p
                className="text-xs mb-2 text-rose-600">
                {errors.email?.message}
            </p>
            <label
                className="text-md font-black mb-1.5 mt-3"
                htmlFor="nickname">
                您的暱稱
            </label>
            <input
                className="mb-1 py-3 px-4 rounded-lg"
                name="nickname"
                type="text"
                placeholder="nickname"
                {...register("nickname", {
                    required: {
                        value: true,
                        message: '請輸入您的暱稱!'
                    }
                })} />
            <p
                className="text-xs mb-2 text-rose-600">
                {errors.nickname?.message}
            </p>
            <label
                className="text-md font-black mb-1.5 mt-3"
                htmlFor="signUpPwd">
                密碼
            </label>
            <input
                className="mb-1 py-3 px-4 rounded-lg"
                name="signUpPwd"
                type="password"
                placeholder="password"
                {...register("password",
                    {
                        required: {
                            value: true,
                            message: '請輸入資料內容!'
                        },
                        minLength: {
                            value: 6,
                            message: "密碼長度至少6位字元"
                        }
                    }
                )} />
            <p className="text-xs mb-2 text-rose-600">{errors.password?.message}</p>
            <label
                className="text-md font-black mb-1.5 mt-3"
                htmlFor="pwdConfirm">
                再次輸入密碼
            </label>
            <input
                className="mb-1 py-3 px-4 rounded-lg"
                name="pwdConfirm"
                type="password"
                placeholder="passwordConfirm"
                {...register("passwordConfirm",
                    {
                        required: {
                            value: true,
                            message: '請輸入資料內容!'
                        },
                        minLength: {
                            value: 6,
                            message: "密碼長度至少6位字元"
                        }
                    }
                )} />
            <p
                className="text-xs mb-2 text-rose-600">
                {errors.passwordConfirm?.message}
            </p>
            <input
                type="submit"
                className="rounded-lg py-3 px-16 mt-3 mb-5 w-max bg-[#333333] text-white self-center md:cursor-pointer font-black"
                value="註冊帳號" />
            <Link
                to="/"
                className="text-center font-black">
                登入
            </Link>
        </form>
    );
}
