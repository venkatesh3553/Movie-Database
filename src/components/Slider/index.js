import {Component} from 'react'
import './index.css'

class Slider extends Component {
  state = {
    pageNo: 1,
  }

  onNextPage = () => {
    const {apiCallback, totalPages} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo < totalPages) {
          return {
            pageNo: prevState.pageNo + 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  onPrevPage = () => {
    const {apiCallback} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo > 1) {
          return {
            pageNo: prevState.pageNo - 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  render() {
    const {pageNo} = this.state

    return (
      <div className="slider-container">
        <button type="button" className="button" onClick={this.onPrevPage}>
          Prev
        </button>
        <p className="page-no">{pageNo}</p>
        <button type="button" className="button" onClick={this.onNextPage}>
          Next
        </button>
      </div>
    )
  }
}
export default Slider
