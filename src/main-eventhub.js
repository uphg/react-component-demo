// 使用 eventHub 实现组件间通信

// 实现一个简单的 eventHub
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

const eventHub = new EventHub()

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
      amount: 100000
    }
  }
  // 生命周期，类似 Vue mounted
  componentDidMount() {
    eventHub.on('我要花钱', (data) => {
      this.setState((state) => {
        return {
          amount: state.amount - data
        }
      })
    })
  }
  render() {
    return (
      <div className="grandfather">
        <p>{'爷爷'}</p>
        <p>{'银行卡余额：' + this.state.amount}</p>
        <div className="container">
          <Box index={1} amount={this.state.amount}/>
          <Box index={2} amount={this.state.amount}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))