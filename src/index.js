import { add } from './math'
import header from './header'
import _ from 'lodash'
import '@babel/polyfill'
import './index.less'


console.log(_.join(['a', 'b', 'c'], '***'))



header()

add(1, 2)

const a = () => {
  return (
    <div>
      11111111111111
    </div>
  )
}