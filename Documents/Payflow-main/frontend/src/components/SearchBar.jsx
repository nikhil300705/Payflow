
export function SearchBar ({setFilter})
{
    return (
        <div className="flex justify-center">
            <input onChange={(e) => {
                setFilter(e.target.value);
            }} type="text" placeholder="Search" className = "focus:outline-none w-[400px] mx-10 px-2 py-2 text-sm font-semibold text-black border-b-[1px] border-blue-400" />
        </div>
    )
}