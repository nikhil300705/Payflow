import {Heading} from '../components/Heading'
import {InputBox} from '../components/InputBox'
import {SubHeading} from '../components/SubHeading'
import {FriendLogo} from '../components/FriendLogo'
import { LoadComponent } from '../components/LoadComponent'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export function SendMoney ()
{
    const [queryParams] = useSearchParams();
    const firstName = queryParams.get("firstName");
    const lastName = queryParams.get("lastName");
    const id = queryParams.get("id");
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <div className = 'h-screen flex justify-center items-center'>
            <div className = 'bg-white h-[400px] flex flex-col justify-center items-center border shadow-sm shadow-gray-500 rounded-2xl' >
                <Heading label = {"Send Money"} />
                <div className = 'w-[400px] flex justify-center p-2' >
                    <FriendLogo label = {firstName[0].toUpperCase()} />
                    <SubHeading label = {`${firstName} ${lastName}`} />
                </div>
                <InputBox type={"number"} onChange={(e) => {
                    setAmount(e.target.value);
                }} label = {""} placeholder = {"Amount(in Rs.)"} />
                <div className='text-red-600 font-semibold text-xs'>{message}</div>
                {loading ? <LoadComponent label={"Sending..."} /> : <></>}
                <div className='h-[100px] flex flex-col justify-center items-center'>
                    <button onClick={async () => {

                        setLoading(true);

                        const response = await axios.post('https://dummy-paytm.onrender.com/api/v1/account/transfer', {
                            body : {
                                        to: id,
                                        amount : parseInt(amount)
                                    }}, {
                            headers : {
                            Authorization : localStorage.getItem("token")
                        }})

                        setLoading(false);

                        if (response.data.message === 'Transfer successful')
                        {
                            navigate(-1);
                            alert("Transaction successful");
                        }

                        setMessage(response.data.message);
                    }} className = "focus:outline-blue-900 bg-blue-500 text-white font-semibold text-sm border rounded-md px-7 my-2 hover:bg-blue-600 duration-150 w-[200px] h-[40px]" >
                        {"Initiate Transfer"}
                    </button>
                    <button onClick = {() => {
                        navigate(-1);
                    }} className='focus:outline-red-700 text-white bg-red-500 font-semibold text-sm border rounded-md w-[200px] h-[40px] flex justify-center items-center hover:bg-red-600 duration-150'>Cancel</button>
                </div>
            </div>
        </div>
    )
}