import './App.css'

function App() {
  return (
    <>
    <div className='iofields'>
      <fieldset className="fieldset">
  <legend className="fieldset-legend">Enter code here</legend>
  <textarea className="textarea h-100 w-150" placeholder="code"></textarea>
</fieldset>

<button className="btn btn-xl">Generate</button>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Automatically generated documentation</legend>
  <output className="textarea h-100 w-150" placeholder="documentation"></output>
</fieldset>
</div>
    </>
  )
}

export default App