import Editor,{useMonaco} from "@monaco-editor/react";
import { use, useEffect } from "react";
export default function CustomEditor({ value, onChange, language  }) {
    const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("myCoolTheme", {
        base: "vs-dark", // or 'vs'
        inherit: true,
        rules: [
          { token: "comment", foreground: "6A9955", fontStyle: "italic" },
          { token: "keyword", foreground: "C586C0" },
          { token: "string", foreground: "CE9178" },
        ],
        colors: {
          "editor.background": "#1a368b",
          "editor.lineHighlightBackground": "#1a368b",
          "editorCursor.foreground": "#FFFFFF",
          "editorLineNumber.foreground": "#858585",
        },
      });

      monaco.editor.setTheme("myCoolTheme");
    }
  }, [monaco]);

  useEffect(() => {
    if(monaco){
        monaco.editor.setModelLanguage(monaco.editor.getModels()[0], language);
    }
  }, [language]);

  return (
    <Editor
      className="editor"
      value={value}
      defaultLanguage={language}
      onChange={(val) => onChange(val || "")}
      height="400px"
      width="500px"
      options={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 20,
        wordWrap: "on",
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        automaticLayout: true,
        padding: { top: 10 },
      }}
    />
  );
}

export function OutputEditor({ output, setOutput, mode }) {
    const lang = mode === "markdown" ? "markdown" : "javascript";
    return (
      <CustomEditor
        value={output}
        onChange={(op) => setOutput(op)}
        language={lang}
      />
    );
  }
  
  export function CodeEditor({ code, setCode,language }) {
    console.log("inside codeEditor",language)
    return (
      <CustomEditor
        value={code}
        onChange={(newCode) => setCode(newCode)}
        language={language}
      />
    );
  }
