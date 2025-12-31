
export function Button ({label, onClick})
{
    return (
        <div className = "p-2 w-[350px] flex justify-center items-center" >
            <button onClick={onClick} className = "bg-blue-500 text-white font-semibold border rounded-md px-7 hover:bg-blue-600 w-[200px] h-[30px]" >
                {label}
            </button>
        </div>
    )
}