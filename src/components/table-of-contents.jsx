export function TableOfContents({toc}){
    console.log(toc);
   return( <div>
        <h2>Table of contents</h2>
        <ul>
            {toc.map((item,i) =>(
                <li key={i}>
                    <strong>{item.type}:{item.name}</strong>
                    {item.children && (
                        <ul>
                            {item.children.map ((child,j)=>(
                                <li key={j}>:{child.type}:{child.name}</li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    </div>
   )
}