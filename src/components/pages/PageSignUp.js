import { Link } from "react-router-dom";
import SignUpForm from "../SignUpForm";
import workImg from "../../images/work.svg"
import logoImg from "../../images/logo_lg.svg"

export default function PageSignUp() {
    return (
        <div
            id="signUpPage"
            className="bg-[#FFD370]">
            <div
                className="container mx-auto h-screen px-8 py-8 flex flex-col items-center lg:w-3/4 xl:w-3/5 md:flex-row md:justify-between md:items-start md:py-24">
                <div className="w-full md:w-1/2">
                    <Link to="/">
                        <img
                            className="mx-auto w-3/4 mb-4 md:w-full"
                            src={logoImg}
                            alt="logoImg" />
                    </Link>
                    <img
                        className="hidden md:block"
                        src={workImg}
                        alt="workImg" />
                </div>
                <div className='w-3/5 md:w-72'>
                    <SignUpForm />
                </div>
            </div>
        </div>
    );
}