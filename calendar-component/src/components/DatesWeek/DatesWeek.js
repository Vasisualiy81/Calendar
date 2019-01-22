import React, {Component} from 'react';
import './DatesWeek.sass';
import * as moment from 'moment';

class DatesWeek extends Component {
    constructor(props) {
        super(props);
        let curDay = moment();


        this.state = {
            content: "",
            selectedDate: curDay
        };

    };

    render() {
        console.log("render - selectedDate >>> ",  moment(this.state.selectedDate).format("D MMM"));
        return (
            <div onClick={() => this.onDateClick(this.props)}>{this.isCheked(this.props)}</div>
        )
    };

    isCheked(props) {
        console.log("isCheked props.content >>> ",moment(this.props.content).format("D"));
        console.log("isCheked curDay >>> ", moment(this.curDay).format("D"));
        if (moment(this.props.content).format("D") === moment(this.curDay).format("D")) {
            return <div className={"selectedDateOfWeek"}
                        onClick={() => this.onDateClick(this.props)}>{moment(this.props.content).format("D")}</div>;
        } else {
            return <div className={"dateOfWeek"}
                        onClick={() => this.onDateClick(this.props)}>{moment(this.props.content).format("D")}</div>;
        };
    }

    onDateClick(props) {
        console.log("onDateClick props >>> ",this.props.content);
        this.curDay=this.props.content;



        //console.log("onDateClick - selectedDate  >>> ", moment(newDate).format("D MMM"));
        //this.chekedDay = this.props.content;
        //this.setState({selectedDate: newDate});

    }
};

export default DatesWeek;