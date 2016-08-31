// View for the device connecting state.
const React = require('react')
const {Link, withRouter} = require('react-router')
const {ipcRenderer} = require('electron')

import SingleColumnView from './singlecolumnview.js'
import StatusBar from './statusbar.js'

class Connect extends React.Component {
  constructor(props, context) {
    super(props, context)
 
    // Set internal state.
    this.state = {device: null}
    // Manually bind functions so they have proper context.
    this.connectStatus = this.connectStatus.bind(this)
  }

  componentDidMount() {
    // Grab the device for this connection and set state appropriately.
    let device = ipcRenderer.sendSync('getDevice', this.props.params.index)
    this.setState({device: device})

    // Setup async events that will change state of this component.
    ipcRenderer.on('connectStatus', this.connectStatus)
 
    // Tell main process to connect to device.
    ipcRenderer.send('deviceConnect', this.props.params.index)
  }

  connectStatus(event, status, progress) {
    // Update the status of the connection attempt.
    this.refs.statusbar.setStatus(status)
    this.refs.statusbar.setProgress(progress)
    
    // Once the progress is 100% then move to the device info page.
    if (progress === 100) {
      this.props.router.push(`info/${this.props.params.index}`)
    }
  }

  componentWillUnmount() {
    // Be careful to make sure state changes aren't triggered by turning off listeners.
    ipcRenderer.removeListener('connectStatus', this.connectStatus)
  }

  render() {
    return (
      <SingleColumnView header='Connecting'>
        {this.state.device === null ? '' : <h4>{this.state.device.name} [{this.state.device.address}]</h4>}
        <StatusBar ref='statusbar' prefix='Status:'/>
        <ul className='list-inline text-right'>
          <li><Link to={`/scan`} className='btn btn-primary'>Stop</Link></li>
        </ul>
      </SingleColumnView>
    )
  }
}

export default withRouter(Connect)
