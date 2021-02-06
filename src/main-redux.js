// 使用 Redux 代替 EventHub

// 引入 Redux 相关 API
const createStore = Redux.createStore

// 默认数据
const defaultState = {
  money: { amount: 100000 }
}

// 创建 reducer 函数，用于集中的处理事件
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case '我要花钱':
      return {
        money: {
          amount: state.money.amount - action.payload
        }
      }
    default:
      return state
  }
}

// 生成 store
const store = createStore(reducer)

class Child extends React.Component {
  constructor(props) {
    super(props)
  }
  clickButton() {
    store.dispatch({ type: '我要花钱', payload: 100 })
  }
  render() {
    return (
      <div className="child">
        <p>{'儿子' + this.props.index}</p>
        <p>{'银行卡余额：' + this.props.amount}</p>
        <button onClick={this.clickButton}>{'花钱'}</button>
      </div>
    )
  }
}

function Box(props) {
  return (
    <div className="box">
      <p>{'爸爸' + props.index}</p>
      <p>{'银行卡余额：' + props.amount}</p>
      <Child index={1} amount={props.amount}/>
      <Child index={2} amount={props.amount}/>
    </div>
  )
}

class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    const amount = this.props.store.money.amount
    return (
      <div className="grandfather">
        <p>{'爷爷'}</p>
        <p>{'银行卡余额：' + amount}</p>
        <div className="container">
          <Box index={1} amount={amount}/>
          <Box index={2} amount={amount}/>
        </div>
      </div>
    )
  }
}

render()

// 监听数据的变化，每次变化后重新 render。（State 一旦有变化，Store.subscribe 中的函数就会执行）
store.subscribe(render)

function render() {
  ReactDOM.render(<App store={store.getState()} />, document.querySelector('#root'))
}