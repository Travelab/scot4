// React inject is global with help storybook
import {Component} from 'react'

export default class PageView extends Component {
  render() {
    let linkClassName = this.props.pageLinkClassName;
    let cssClassName = this.props.pageClassName;
    let onClick = this.props.onClick;

    if (this.props.selected) {
      if (typeof(cssClassName) !== 'undefined') {
        cssClassName = cssClassName + ' ' + this.props.activeClassName;
      } else {
        cssClassName = this.props.activeClassName;
      }
    }

    return (
        <li className={cssClassName}>
            <a onClick={onClick}
               className={linkClassName}
               tabIndex="0"
               onKeyPress={onClick}>
              {this.props.page}
            </a>
        </li>
    );
  }
};