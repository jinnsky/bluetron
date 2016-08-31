// View for the device scanning state.
const React = require('react')
const {Link, withRouter} = require('react-router')
const {ipcRenderer} = require('electron')

import SingleColumnView from './singlecolumnview.js'
import StatusBar from './statusbar.js'


class Scan extends React.Component {
  constructor(props, context) {
    super(props, context)

    // Set initial state.
    this.state = { isScanning: false, devices: [] }
    // Manually bind functions to make react state available to them.
    this.startScan = this.startScan.bind(this)
    this.stopScan = this.stopScan.bind(this)
    this.devicesChanged = this.devicesChanged.bind(this)
  }

  devicesChanged(event, newDevices) {
    this.setState({devices: newDevices})
  }

  startScan() {
    this.setState({isScanning: true, devices: []})
    this.refs.statusbar.setStatus('Scanning...')
    this.refs.statusbar.setProgress(100)
    ipcRenderer.send('startScan')
  }

  stopScan() {
    this.setState({isScanning: false})
    this.refs.statusbar.setStatus('Stopped')
    this.refs.statusbar.setProgress(0)
    ipcRenderer.send('stopScan')
  }

  componentDidMount() {
    // Setup async events that will change state of this component.
    ipcRenderer.on('devicesChanged', this.devicesChanged)
    // Kick off the scan of new devices.
    this.startScan()
  }

  componentWillUnmount() {
    // Be careful to make sure state changes aren't triggered by turning off listeners.
    ipcRenderer.removeListener('devicesChanged', this.devicesChanged)
  }

  render() {
    return (
      <SingleColumnView header='Device Scanning'>
        <StatusBar ref='statusbar' prefix='Status:'/>
        <ul className='list-inline text-right'>
          <li><button type='button' className='btn btn-primary' disabled={this.state.isScanning ? 'disabled' : ''} onClick={this.startScan}>Start</button></li>
          <li><button type='button' className='btn btn-primary' disabled={this.state.isScanning ? '' : 'disabled'} onClick={this.stopScan}>Stop</button></li>
        </ul>
        <hr/>
        <div className='panel panel-default'>
          <div className='panel-heading'>Discovered Devices</div>
          <div className='panel-body'>
            <p>Bluetooth low energy devices will be shown below as they are found.
            Click a device to connect and interact with it.</p>
          </div>
          <div className='list-group' id='device-list'>
            {this.state.devices.map(d => <Link to={`/connect/${d.index}`} className='list-group-item' key={d.index}>{d.name} [{d.address}]</Link>)}
          </div>
        </div>
      </SingleColumnView>
    )
  }
}

export default withRouter(Scan)
