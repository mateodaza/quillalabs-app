import React, {Component} from 'react'
import { inject, observer } from 'mobx-react'
import LoadingBar from 'react-top-loading-bar';
import Router from 'next/router'

export default function withAuth(AuthComponent, secured = true) {

  class Authenticated extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isLoading: true,
      };
    }

    componentDidMount () {
      const { authStore } = this.props.store
      // this.LoadingBar.continuousStart()
      this.LoadingBar.staticStart()
      if(!authStore.isLogged && secured) {
        this.setState({ isLoading: false, loadingBarProgress: 100 })
        return Router.push("/")
      }
      this.LoadingBar.complete()
      this.setState({ isLoading: false, loadingBarProgress: 100 })
    }

    render() {
      const { isLoading } = this.state
      const { authStore } = this.props.store

      return (
        <div>
          <LoadingBar
          height={2}
          color='linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)'
          onRef={ref => (this.LoadingBar = ref)}
          />
        {
          !authStore.isLogged && secured ? (
            <div>
              <h3>DENIED</h3>
              <a href="/">go back home</a>
            </div>
          ):(
            isLoading ? (
              <h3>Loading</h3>
            ): (
              <AuthComponent {...this.props}/>
            )
          )
        }
        </div>
      )
    }
  }

  return inject("store")(observer(Authenticated))

}