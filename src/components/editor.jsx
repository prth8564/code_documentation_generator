import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markdown";
import "prismjs/themes/prism-okaidia.css";
export default function CustomEditor({value,onChange,highlight}){
    return (
        <Editor
        className="editor"
            value={value}
            onValueChange={onChange}
            highlight={highlight}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 20,
              height: 400,
              width: 500,
              overflow: "auto",
              border: "3px solid",
              boxSizing: "border-box"
            }}
          />
    )
}

export function OutputEditor({output,setOutput,mode}){
    const lang = mode == 'markdown'? languages.md : languages.js
    return (
    <CustomEditor value={output}
            onChange={(op) => setOutput(op)}
            highlight={(code) => highlight(code, lang)} />
        )
}

export function CodeEditor({code,setCode}){
    return (
        <CustomEditor value={code}
            onChange={(code) => setCode(code)}
            highlight={(code) => highlight(code, languages.js)} />
    )
}