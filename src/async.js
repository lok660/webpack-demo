//  异步导出第三方库

// export default function getComponent () {
//   return import('lodash').then(({ default: _ }) => {
//     var element = document.createElement('div')
//     element.innerHTML = _.join(['Hello', 'Darrekk'], '-')
//     return element
//   })
// }

// const getComponent = async () => {

//   const { default: _ } = await import(/*webpackChunkName:"lodash" */ 'lodash')
//   const element = document.createElement('div')
//   element.innerHTML = _.join(['Hello', 'Darrell'], '-')
//   return element
// }

// export default getComponent

import './async.less'

const handleClick = () => {
  for (let i = 0; i < 20; i++) {
    const element = document.createElement('div')
    element.innerHTML = 'Hello Darrell'
    document.body.appendChild(element)
  }
}

export default handleClick
