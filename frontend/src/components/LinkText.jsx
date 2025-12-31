
export function LinkText ({linktext, url})
{
    return (
        <div className = "px-1 underline" >
            <a href={url}>{linktext}</a>
        </div>
    )
}