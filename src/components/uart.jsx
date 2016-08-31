// View for the device UART state.
const React = require('react')
const {ipcRenderer} = require('electron')

import DeviceView from './deviceview.js'

export default class UART extends React.Component {
  constructor(props, context) {
    super(props, context)
    
    // Set internal state.
    this.state = {device: null, services: []}

    // Manually bind functions so they have proper context.
    this.send = this.send.bind(this)
    this.uartRx = this.uartRx.bind(this)
  }

  appendRx(line) {
    // Add a new line to the rx text area.
    $('#rx').val($('#rx').val() + '\r\n' + line)
  }

  send() {
    let data = $('#tx').val()
    this.appendRx('Sent: ' + data)
    ipcRenderer.send('uartTx', data)
  }

  uartRx(event, data) {
    this.appendRx('Received: ' + data)
  }

  componentDidMount() {
    // Setup async events that will change state of this component.
    ipcRenderer.on('uartRx', this.uartRx)
  }

  componentWillUnmount() {
    // Be careful to make sure state changes aren't triggered by turning off listeners.
    ipcRenderer.removeListener('uartRx', this.uartRx)
  }

  render() {
    // Render main UART view.
    return (
      <DeviceView header='UART' index={this.props.params.index}>
        <p>Send and receive data with a BLE UART device.</p>
        <form>
          <div className='form-group'>
            <label htmlFor='rx'>Received:</label>
            <textarea id='rx' className="form-control" rows="16" readOnly style={{'backgroundColor': '#ffffff'}}></textarea>
          </div>
          <div className='form-group'>
            <label htmlFor='tx'>Send:</label>
            <input id='tx' className='form-control'/>
          </div>
          <button type='button' className='btn btn-default' onClick={this.send}>Send</button>
        </form>
      </DeviceView>
    )
  }
}
