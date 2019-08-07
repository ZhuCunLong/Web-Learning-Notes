import React, {Component} from 'react'

interface IProps {
  isFinished: boolean,
  title: string,
  index: number
  handleChange: (index: number) => void,
  handleDelte: (index: number) => void
}

interface IState {
}

export default class TodoItem extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.onClickChange = this.onClickChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  render() {
    const {isFinished, title} = this.props
    return (
      <div>
        <input
          type="checkbox"
          checked={isFinished}
          onChange={this.onClickChange}
        />
        ---{title}---
        <input type="button" value="删除" onClick={this.handleDelete}/>
      </div>
    )
  }

  onClickChange() {
    this.props.handleChange(this.props.index)
  }

  handleDelete() {
    this.props.handleDelte(this.props.index)
  }
}
