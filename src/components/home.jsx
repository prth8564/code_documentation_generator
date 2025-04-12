import {query} from "../functions/apiCall"
import { useState } from "react";
import { getPrompt,handleFileChange } from "../functions/getPrompt"
import {OutputEditor,CodeEditor} from "./editor";
export default function Home(){
    const [output, setOutput] = useState("something");
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [mode, setMode] = useState("jsdoc");
    return (
        <div className="iofields">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Enter code here</legend>
          <CodeEditor code={code} setCode={setCode}/>
          <input
            type="file"
            className="file-input"
            onChange={(e)=>handleFileChange(e,setCode)}
          ></input>
        </fieldset>

        <button
          className="btn-primary"
          onClick={async () => setOutput("" + (await query(getPrompt(mode,code))))}
        >
          Generate
        </button>
        <select value={mode} onChange={(e)=> setMode(e.target.value)} className="select select-success">
  <option disabled={true}>Pick a format</option>
  <option value="jsdoc">JsDoc</option>
  <option value="inline">Inline Comments</option>
  <option value="both">Inline Comments+JsDoc</option>
  <option value="markdown">Markdown</option>
</select>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">
            Automatically generated documentation
          </legend>
          <OutputEditor output={output} setOutput={setOutput} mode={mode} />
        </fieldset>
      </div>
    )
}