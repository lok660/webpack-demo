import React, { useState, useEffect } from 'react'
import './index.less'
import bg from './assets/lufei.jpg'
import { resolve } from '../config/webpack.dev'

const Home = props => {
  const [name, setName] = useState(1)
  const [demoList, setDemoList] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: [{ id: 1 }, { id: 2 }]
        })
      }, 5000);
    })
    setDemoList(data)
  }

  const UNSAFE_componentWillMount = () => {
    console.log('哈哈哈~!准备渲染了')
    setTimeout(() => {
      setName(10)
    }, 3000);
  }

  const addNum = () => {
    setName(name + 1)
  }

  return (
    <div className="Home">
      HomePage
      <img src={bg} alt="bg" onClick={addNum} />
      {name}
      {
        demoList.data && demoList.data.map(item => <li key={item.id}>{item.id}</li>)
      }
    </div>
  )
}

export default Home