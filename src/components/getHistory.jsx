import { useEffect,useState } from "react"


export function GetHistory({input,output}){

  function handleHistory(item){
    input(item.input); 
    output(item.output)
  }

    const [history,setHistory] = useState({});
    useEffect(()=>{
       setHistory(JSON.parse(localStorage.getItem("history")) || {history: []});
    },[])
    return (
        <div className="drawer z-[9999]">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="inline-block cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {(Array.isArray(history.history) ? history.history : []).map((item, index) => (
                    <li onClick={()=>handleHistory(item)}><a>{item.input}</a></li>
            ))}
          </ul>
        </div>
      </div>
        
    )
}