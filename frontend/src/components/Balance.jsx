
export function Balance ({balance})
{
    return (
        <div className ="w-[300px] h-[50px] px-[40px] my-2 flex items-center justify-between" >
            <div className = "font-bold" >
                Your Balance
            </div>
            <div className = "font-semibold">
                Rs. {balance}
            </div>
        </div>
    )
}