import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { API_URL, UserTokenContext, UserNicknameContext } from '../contexts/UserContext';
import { setAuthToken, setNickName } from './utilities/utils';
import { LoginSwalSucces, LoginSwalFail } from './utilities/LoginSwal';

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues:
        {
            email: "",
            password: ""
        }
    });
    const { setCurrentToken } = UserTokenContext(null);
    const { setCurrentNickname } = UserNicknameContext(null);

    const navigate = useNavigate();

    const onSubmit = data => {
        const {
            email,
            password
        } = data;

        axios
            .post(`${API_URL}users/sign_in`,
                {
                    "user": {
                        "email": email.trim(),
                        "password": password.trim()
                    }
                })
            .then(res => {
                const token = res.headers.authorization;
                const nickname = res.data.nickname;
                setCurrentToken(token);
                setAuthToken(token);
                setNickName(nickname);
                setCurrentNickname(nickname);
                LoginSwalSucces();
                navigate("/PageTodolist");
            })
            .catch(err => {
                console.log(err);
                LoginSwalFail();
            })
    };

    return (
        <form
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}>
            <h2
                className="text-xl text-center font-black mb-5 md:text-2xl md:text-left">
                最實用的線上代辦事項服務
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
                placeholder="請輸入 email"
                {...register("email", {
                    required: {
                        value: true,
                        message: '請輸入資料內容!'
                    },
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "格式有誤!"
                    }
                })} />
            <p
                className="text-xs mb-2 text-rose-600">
                {errors.email?.message}
            </p>
            <label
                className="text-md font-black mb-1.5 mt-3"
                htmlFor="logInPwd">
                密碼
            </label>
            <input
                className="mb-1 py-3 px-4 rounded-lg"
                name="logInPwd"
                type="password"
                placeholder="請輸入 password"
                {...register("password", {
                    required: {
                        value: true,
                        message: '請輸入資料內容!'
                    },
                    minLength: {
                        value: 6,
                        message: "密碼長度至少6位字元"
                    }
                })} />
            <p
                className="text-xs mb-2 text-rose-600">
                {errors.password?.message}
            </p>
            <input
                className="rounded-lg py-3 px-16 mt-3 mb-5 w-max bg-[#333333] text-white self-center md:cursor-pointer font-black"
                type="submit"
                value="登入" />
            <Link
                to="/PageSignUp"
                className="text-center font-black">
                註冊帳號
            </Link>
        </form>
    );
};
