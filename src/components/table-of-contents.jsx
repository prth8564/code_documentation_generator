export function TableOfContents({toc}){
   return( <div >
        <ul>
            {toc.map((item,i) =>(
                <li className="list-row" key={i}>
                    <strong>{item.type}:{item.name}</strong>
                    {item.children && (
                        <ul>
                            {item.children.map ((child,j)=>(
                                <li className="list-row" key={j}>:{child.type}:{child.name}</li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    </div>
   )
}