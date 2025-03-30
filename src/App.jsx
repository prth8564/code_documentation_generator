import './App.css'
import { query } from './functions/apiCall'
import { useState } from 'react'
function App() {
  const [output,setOutput] = useState("something");
  const [code ,setCode] = useState("");

const prompt = { inputs: `Generate documentation for the following code and response should only contain the code which includes the documentation:\n${code}` };

  return (
    <>
    <div className='iofields'>
      <fieldset className="fieldset">
  <legend className="fieldset-legend">Enter code here</legend>
  <textarea className="textarea h-100 w-150" placeholder="code" onChange={(e)=>{setCode(e.target.value)}}></textarea>
</fieldset>

<button className="btn btn-xl" onClick={async ()=> setOutput(await query(prompt))}>Generate</button>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Automatically generated documentation</legend>
  <output className="textarea h-100 w-150" placeholder="documentation">{output}</output>
</fieldset>
</div>
    </>
  )
}

export default App