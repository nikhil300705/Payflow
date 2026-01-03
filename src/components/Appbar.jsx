import { useState } from "react";
import {useNavigate} from "react-router-dom"

export function Appbar ({firstName})
{
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className = "font-semibold flex justify-between items-center h-[50px] border border-b-2 border-amber-400" >
            <div className = "pl-4" >
                Payment App
            </div>
            <div className = "flex pr-4 w-[150px] justify-around" >
                <div>
                    {isHovered ? <Logout/> : <Hello/>}
                </div>
                <div onMouseEnter={() => {
                    setIsHovered(true);
                }} onMouseLeave={() => {
                    setTimeout(() => {
                        setIsHovered(false);
                    }, 1000);
                }} className = "cursor-pointer w-[30px] border border-blue-700 rounded-full flex justify-center hover:bg-blue-500 hover:text-white duration-100 group" >
                    {firstName.length > 0 ? firstName[0].toUpperCase() : <></> }
                </div>
            </div>
        </div>
    )
}

function Hello ()
{
    return (
        <div className="opacity-0 md:opacity-100 bg-amber-300 w-[80px] rounded-md flex justify-center items-center">
            Hello
        </div>
    )
}

function Logout ()
{
    const navigate = useNavigate();

    return (
        <div onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "https://dummy-paytm.vercel.app/";
        }} className="cursor-pointer bg-red-500 text-white border rounded-md w-[80px] flex justify-center items-center">
            Logout
        </div>
    )
}