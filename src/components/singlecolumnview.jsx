// Single column of information view.
const React = require('react')

export default class SingleColumnView extends React.Component {
  render() {
    const { header, children, ...rest } = this.props
    return (
      <div className="row">
        <div className="col-sm-8 col-sm-offset-2">
          <div className="page-header">
            <h3>{header}</h3>
          </div>
          {children}
        </div>
      </div>
    )
  }
}
