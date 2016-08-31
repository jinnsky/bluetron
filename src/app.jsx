// Application route definitions.
const React = require('react')
const ReactDOM = require('react-dom')
const {Router, Route, hashHistory} = require('react-router')

import Loading from './components/loading.js'
import Scan from './components/scan.js'
import Connect from './components/connect.js'
import Information from './components/information.js'
import UART from './components/uart.js'
import About from './components/about.js'


// Main application component, will be rendered inside app.html's body.
// Just displays the currently selected route.
class App extends React.Component {
  render () {
    return (
      <div>
        <nav className='navbar navbar-inverse navbar-fixed-top'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar-elements' aria-expanded='false'>
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
              </button>
              <span className='navbar-brand' >
                  <span><img src='assets/ble_logo_small.png' height='25' width='25'/></span>
                  &nbsp; Bluetron
              </span>
            </div>
            <div className='collapse navbar-collapse' id='navbar-elements'>
              <ul className='nav navbar-nav navbar-right'>
                <li><a data-toggle='modal' data-target='#about-modal' style={{cursor:'pointer'}}>About</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <About/>
        <div className='container-fluid'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

// Define table of routes.
let routes = (
  <Route path='/' component={App}>
    <Route path='loading' component={Loading} />
    <Route path='scan' component={Scan} />
    <Route path='connect/:index' component={Connect} />
    <Route path='info/:index' component={Information} />
    <Route path='uart/:index' component={UART} />
  </Route>
)

// Render the application.
export default ReactDOM.render(<Router routes={ routes } history={ hashHistory } />, document.getElementById('content'))
