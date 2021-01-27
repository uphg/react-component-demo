// 使用 props 实现简单的组件通信
function Child(props) {
  return (
    <div className="child">
      <p>{'儿子' + props.index}</p>
      <p>{'银行卡余额：' + props.amount}</p>
      <button onClick={props.message}>{'花钱'}</button>
    </div>
  )
}

function Box(props) {
  return (
    <div className="box">
      <p>{'爸爸' + props.index}</p>
      <p>{'银行卡余额：' + props.amount}</p>
      <Child index={1} amount={props.amount} message={props.message}/>
      <Child index={2} amount={props.amount} message={props.message}/>
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
  clickButton() {
    this.setState((state) => {
      return {
        amount: state.amount - 100
      }
    })
  }
  render() {
    return (
      <div className="grandfather">
        <p>{'爷爷'}</p>
        <p>{'银行卡余额：' + this.state.amount}</p>
        <div className="container">
          <Box index={1} amount={this.state.amount} message={this.clickButton.bind(this)}/>
          <Box index={2} amount={this.state.amount} message={this.clickButton.bind(this)}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))