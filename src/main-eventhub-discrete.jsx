// 使用 eventHub 实现组件间通信 - 分离全局数据

class EventHub {
  constructor() {
    this.cache = {}
  }
  trigger(eventName, data) {
    if (this.cache[eventName]) {
      this.cache[eventName].forEach(fn => { fn(data) })
    } else {
      console.log('该事件不存在！')
    }
  }
  on(eventName, fn) {
    if (!this.cache[eventName]) {
      this.cache[eventName] = []
    }
    this.cache[eventName].push(fn)
  }
}

// 全局的数据
const store = {
  money: { amount: 100000 }
}

// 创建一个 eventHub
const eventHub = new EventHub()

// 监听花钱事件
eventHub.on('我要花钱', (data) => {
  store.money.amount -= data
  render()
})

class Child extends React.Component {
  constructor(props) {
    super(props)
  }
  clickButton() {
    eventHub.trigger('我要花钱', 100)
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
    this.state = {
      money: store.money
    }
  }
  render() {
    return (
      <div className="grandfather">
        <p>{'爷爷'}</p>
        <p>{'银行卡余额：' + this.state.money.amount}</p>
        <div className="container">
          <Box index={1} amount={this.state.money.amount}/>
          <Box index={2} amount={this.state.money.amount}/>
        </div>
      </div>
    )
  }
}

render()

function render() {
  ReactDOM.render(<App />, document.querySelector('#root'))
}