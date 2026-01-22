import { Link } from "react-router-dom"

export function BottomWarning ({label, buttonText, to})
{
    return (
        <div className = "flex" >
            <div className="font-small text-sm">{label}</div>
            <Link className="text-sm pointer underline pl-1 cursor-pointer hover:scale-105 duration-200" to={to}>
                {buttonText}
            </Link>
        </div>
    )
}