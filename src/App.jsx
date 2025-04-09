import './App.css'
import { query } from './functions/apiCall'
import { useState } from 'react'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
function App() {
  const [output,setOutput] = useState("something");
  const [code ,setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

const prompt = { inputs: `Generate documentation for the following code and response should only contain the code which includes the documentation as a string:\n${code}` };

  return (
    <>
    <div className='iofields'>
      <fieldset className="fieldset">
  <legend className="fieldset-legend">Enter code here</legend>
  <Editor
      value={code}
      onValueChange={code => setCode(code)}
      highlight={code => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
        minHeight:100,
        minWidth:500,
        overflow:'scroll',
        resize:'block'
      }}
    />
</fieldset>

<button className="btn btn-xl" onClick={async ()=> setOutput(""+await query(prompt))}>Generate</button>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Automatically generated documentation</legend>
  <Editor
      value={output}
      highlight={code => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />
</fieldset>
</div>
    </>
  )
}

export default App