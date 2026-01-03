import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

export function Dashboard ()
{
    

    const [balance, setBalance] = useState(0);
    const [firstName, setFirstName] = useState("");

    async function handler ()
    {
        const response = await axios.get('https://dummy-paytm.onrender.com/api/v1/account/balance',{
            headers : {authorization : localStorage.getItem("token")}
        });
        
        setBalance(response.data.balance);
        setFirstName(response.data.firstName);
    }

    useEffect(() => {
        handler();
    }, [balance]);

    return (
        <div>
            <Appbar firstName={firstName} />
            <Balance balance={balance} />
            <Users/>
        </div>
    )
}