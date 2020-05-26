import React, {Component} from 'react'
import { inject, observer } from 'mobx-react'
import LoadingBar from 'react-top-loading-bar';
import Router from 'next/router'

export default function withAuth(AuthComponent) {

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
      if(!authStore.isLogged) {
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
          height={3}
          color='rgba(201, 61, 55, 1)'
          onRef={ref => (this.LoadingBar = ref)}
          />
        {
          !authStore.isLogged ? (
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

  return  inject("store")(observer(Authenticated))

}