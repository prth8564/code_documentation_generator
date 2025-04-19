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
  const [language, setLanguage] = useState("javascript");
  const [toc,setToc] = useState([]);
  const [toggleAnime,setToggleAnime] = useState(true);
  const typeWriter = (text) => {
    console.log(toggleAnime);
    if(toggleAnime){
    let i = 0;
    setOutput("");
    const interval = setInterval(() => {
      if (i < text.length) {
        setOutput((prev) => prev + text[i]);
        i++;
      }
      else{
        clearInterval(interval);
        setOutput(text);
      }
    }, 2);
  }
  else{
    setOutput(text);
  }
  }
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
        <div className="header" style = {{ display: 'flex', alignItems: 'center' }}>
        <img src="../logo.png" className="logo"/><h1 className="heading">DocCraft</h1>
        </div>
      <div className="iofields">
      <div className="inputfields">
        <h2 className="inputfields-header">ENTER CODE HERE</h2>
        <fieldset className="fieldset">
          <TableOfContents toc={toc} />
          <CodeEditor code={code} setCode={setCode} language={language}/> 
          <button
          className="btn-primary"
          onClick={async () => typeWriter((await query(getPrompt(mode,code))))}>
          Generate
        </button> 
        </fieldset>
        <input
            type="file"
            className="file-input"
            onChange={(e)=>handleFileChange(e,setCode)}
          ></input>
          <select onChange={(e) => { setLanguage(e.target.value)}} value={language} className="select inputfields-select">
  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="markdown">Markdown</option>
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="json">JSON</option>
  <option value="yaml">YAML</option>
  <option value="python">Python</option>
</select>
          
      </div>
        <div className="outputfields">
        <h2 className="inputfields-header">AUTOMATICALLY GENERATED DOCUMENTATION</h2>
        <fieldset className="fieldset">
          <OutputEditor output={output} setOutput={setOutput} mode={mode} />
        </fieldset>
        <input type="checkbox" checked={toggleAnime} className="toggle toggle-primary" onChange={(e)=>setToggleAnime(e.target.checked)}/>
        <label className="label">Toggle Animation</label>
        <select value={mode} onChange={(e)=> setMode(e.target.value)} className="select outputfields-select">
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