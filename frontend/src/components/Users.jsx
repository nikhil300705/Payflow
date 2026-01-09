import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {SearchBar} from './SearchBar'

export function Users ()
{
    const [users, setUsers] = useState([]);
    const [filter, setfilter] = useState("");

    async function handler ()
    {
        const tusers = await axios.get('https://dummy-paytm.onrender.com/api/v1/user/bulk?filter=' + filter)
        setUsers(tusers.data.user);
    }

    useEffect(() => {
        handler();
    }, [filter]);

    return (
        <div>
            <SearchBar setFilter = {setfilter} />
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                {users == null ? <></> : users.map((user) => <User user = {user} key = {user._id} />)}
            </div>
        </div>
    )
}

function User ({user})
{
    return (
        <div className = "w-[400px] font-semibold text-gray-600 h-20 text-sm mx-[100px] my-[10px] flex justify-between items-center border-b border-blue-800 hover:scale-105 duration-200" >
            <div>
                {user.firstName} {user.lastName}
            </div>
            <Link to = {`/sendmoney?id=${user._id}&firstName=${user.firstName}&lastName=${user.lastName}`} className = 'focus:outline-green-500 flex justify-center items-center rounded-md w-[100px] h-[50px] bg-green-600 text-white cursor-pointer' >
                Transfer
            </Link>
        </div>
    )
}