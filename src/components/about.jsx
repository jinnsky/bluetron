// View for the about state.
const React = require('react')

import pkg from '../../package.json'
import noble from 'noble/package.json'


export default class About extends React.Component {
  constructor() {
    super()
  }

  render() {
    // Render about view.
    return (
      <div className='modal fade' id='about-modal' tabIndex='-1' role='dialog'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
              <h4 className='modal-title'>About</h4>
            </div>
            <div className='modal-body'>
              <p>Bluetron version: {pkg.version}</p>
              <p>noble version: {noble.version}</p>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
