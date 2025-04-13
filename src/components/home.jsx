import {query} from "../functions/apiCall"
import { useState,useEffect } from "react";
import { getPrompt,handleFileChange } from "../functions/getPrompt"
import {OutputEditor,CodeEditor} from "./editor";
import { parseAst } from "../functions/ast-parser";
import { TableOfContents } from "./table-of-contents";
export default function Home(){
    const [output, setOutput] = useState("something");
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [mode, setMode] = useState("jsdoc");
  const [toc,setToc] = useState([]);
  useEffect(()=>{
    try{
      setToc(parseAst(code));
    }
    catch(err){
      console.log(err);
      setToc([]);
    }
  },[code])


    return (
      <div className="container">
        <h1 className="main-header">CODE DOCUMENTATION GENERATOR</h1>
      <div className="iofields">
      <div className="inputfields">
        <h2 className="inputfields-header">ENTER CODE HERE</h2>
        <fieldset className="fieldset">
          <TableOfContents toc={toc} />
          <CodeEditor code={code} setCode={setCode}/> 
          <button
          className="btn-primary"
          onClick={async () => setOutput("" + (await query(getPrompt(mode,code))))}>
          Generate
        </button> 
        </fieldset>
        <input
            type="file"
            className="file-input"
            onChange={(e)=>handleFileChange(e,setCode)}
          ></input>
          
      </div>
        <div className="outputfields">
        <h2 className="inputfields-header">AUTOMATICALLY GENERATED DOCUMENTATION</h2>
        <fieldset className="fieldset">
          <OutputEditor output={output} setOutput={setOutput} mode={mode} />
        </fieldset>
        <select value={mode} onChange={(e)=> setMode(e.target.value)} className="select select-success">
  <option disabled={true}>Pick a format</option>
  <option value="jsdoc">JsDoc</option>
  <option value="inline">Inline Comments</option>
  <option value="both">Inline Comments+JsDoc</option>
  <option value="markdown">Markdown</option>
</select>
        
      </div>
      </div>
      </div>
    )
}