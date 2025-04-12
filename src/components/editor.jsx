import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markdown";
import "prismjs/themes/prism.css";
export default function CustomEditor({value,onChange,highlight}){
    return (
        <Editor
            value={value}
            onValueChange={onChange}
            highlight={highlight}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              minHeight: 400,
              minWidth: 500,
              overflow: "scroll",
              resize: "block",
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