import "./App.css";
import { query } from "./functions/apiCall";
import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markdown";
import "prismjs/themes/prism.css";
function App() {
  const [output, setOutput] = useState("something");
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [mode, setMode] = useState();
  const getPrompt = (mode) => {
    const prompts = {
      jsdoc: `Generate JSDoc-style comments for the following JavaScript code. Add comments only above functions and methods using proper JSDoc syntax. Keep the code unchanged and return only the updated code with JSDoc comments.\n\nCode:\n${code}`,
      inline: `Add helpful inline comments to the following JavaScript code to explain what each part does. Keep the structure unchanged. Return only the updated code with inline comments.\n\nCode:\n${code}`,
      both: `Add both JSDoc-style comments above functions and helpful inline comments within the following JavaScript code. Use JSDoc syntax for function-level documentation and inline comments to explain key logic inside the functions. Keep the code unchanged and return only the updated code with comments added.\n\nCode:\n${code}`,
      markdown: `Generate technical documentation in clean markdown format for the following JavaScript code. 
            Include a brief overview, list of functions or methods with explanations, and any important behavior or edge cases. 
            Return only the output in markdown syntax without any extra commentary.
  Code:
${code}`,
    };
    return prompts[mode];
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => setCode(reader.result);
    }
  };

  return (
    <div data-theme="aqua">
      <div className="iofields">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Enter code here</legend>
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              minHeight: 100,
              minWidth: 500,
              overflow: "scroll",
              resize: "block",
            }}
          />
          <input
            type="file"
            className="file-input"
            onChange={handleFileChange}
          ></input>
        </fieldset>

        <button
          className="btn-primary"
          onClick={async () => setOutput("" + (await query(getPrompt(mode))))}
        >
          Generate
        </button>
        <select value={mode} onChange={(e)=> setMode(e.target.value)} defaultValue="jsdoc" className="select select-success">
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
          <Editor
            value={output}
            onValueChange={(op) => setOutput(op)}
            highlight={(code) => highlight(code, languages.md)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </fieldset>
      </div>
    </div>
  );
}

export default App;