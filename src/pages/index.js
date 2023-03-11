import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [arr, setArr] = useState([])

  useEffect(() => {
    console.log('arr changing..')
    console.log(arr)
  }, [arr])

  const submit = async () => {
    if (prompt.length > 0) {
      const endPoint = "/api/hello"
      const res = await axios.post(endPoint, {
        prompt: prompt
      })
      
      const _result = res.data.result
      const el = {
        prompt: prompt,
        result: _result
      }

      setArr(prev => [...prev, el])
      setPrompt("")
    }
  }

  return (
    <>
      <div>Talk with ChatGPT</div>
      <input value={prompt} onChange={e => setPrompt(e.target.value)} />
      <button onClick={e => submit()}>send</button>
      <br/><br/>
      {
        arr.map((el, index) => {
          return <div key={index}>
            <div>Question: {el.prompt}</div>
            <div>ChatGPT: {el.result}</div>
            <br/>
          </div>
        })
      }
    </>
  )
}