import React, {Component} from 'react';
import './DatesWeek.sass';
import * as moment from 'moment';

class DatesWeek extends Component {
    render() {
        return (
            <div
                className={this.props.className}
                onClick={() => this.props.onClick()}
            >{moment(this.props.content).format("D")}</div>
        )
    };
};
export default DatesWeek;