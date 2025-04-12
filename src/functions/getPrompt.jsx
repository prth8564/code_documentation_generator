export const getPrompt = (mode,code) => {
    
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
    return {inputs:prompts[mode]};
  };



export const handleFileChange = (event,setCode) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => setCode(reader.result);
    }
  };