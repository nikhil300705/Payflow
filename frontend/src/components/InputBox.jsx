
export function InputBox ({label, placeholder, onChange, type})
{
    return (
        <div className = "w-[300px] flex flex-col justify-center items-center m-1" >
            <label htmlFor = {label} className = "self-start pl-[55px] text-md" >{label}</label>
            <input type = {type} onChange = {onChange} id = {label} placeholder = {placeholder} className = "focus:outline-none border-b-[1px] border-gray-500 text-sm pl-2 pt-1 pb-1 w-[200px]"/>
        </div>
    )
}