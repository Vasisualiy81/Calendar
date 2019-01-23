import React, {Component} from 'react';
import './Calendar.sass';
import * as moment from 'moment';
import DatesWeek from '../DatesWeek/DatesWeek'
import dropdown from '../../assets/dropdown48-2.png'


class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            daysWeekName: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datesCurWeek: [],
            curDate: moment(),
            curWeek: moment().week(),
            curMonth: moment(moment().month()).format("MMM"),
            fullMonth: false
        };
        this.getDatesCurWeek = this.getDatesCurWeek.bind(this);
    };

    render() {
        console.log("Calendar - render");
        return (
            <>
                <div className={"Calendar-main-container"}>

                    <div className={"Calendar-header-container"}>
                        <div className={"Calendar-prev"} onClick={() => this.onPrevNextClick("-")}>PREV</div>
                        <div className={"Calendar-current-week"}>
                            {this.getTitle()}
                            <div className={"Calendar-dropdown"}>
                                <img src={dropdown} alt="V" width={"12.73px"} height={"7.78px"}></img>
                            </div>
                        </div>
                        <div className={"Calendar-next"} onClick={() => this.onPrevNextClick("+")}>NEXT</div>
                    </div>

                    <div className={"Calendar-days-week-container"}>
                        {
                            this.state.daysWeekName.map((value, index) => (
                                <div className={"Calendar-day-of-week"} key={index}>{value}</div>))
                        }
                    </div>

                    <div className={"Calendar-date-week-container"}>
                        {this.renderDates()}
                    </div>

                </div>
            </>
        );
    };


    renderDates() {
        ////////Show only one week////////
        if (!this.state.fullMonth) {
            return (
                this.getDatesCurWeek().map((value, index) => (
                    <DatesWeek
                        className={moment(this.state.curDate).format("D") === moment(value).format("D") ? "DatesWeek-selected-date-week" : "DatesWeek-date-week"}
                        content={value}
                        key={index}
                        onClick={() => this.handleClick(index)}>{value}</DatesWeek>
                )));
        ////////Show all month////////
        //TODO for next homework
        } else {
            const allMonth = [];
            const monthName = moment(moment().month(this.curWeek)).format("MMM");

            for (let index = 0; index < allMonth.length; index++) {
                allMonth.push();
            }
            ;
        }
        ;
    };

    getDatesCurWeek() {
        const datesWeek = [];
        let dateCurWeek = undefined;
        for (let index = 1; index < 8; index++) {
            (index !== 7 ?
                    dateCurWeek = moment().day(index).week(this.state.curWeek) :
                    dateCurWeek = moment().day(0).week(this.state.curWeek + 1)
            );
            datesWeek.push(dateCurWeek);
        }
        ;
        return datesWeek;
    };

    getTitle() {
        const monthFirstDayWeek = moment(moment().day(1).week(this.state.curWeek)).format("MMM");
        const monthLastDayWeek = moment(moment().day(1).week(this.state.curWeek + 1)).format("MMM");

        return (monthFirstDayWeek === monthLastDayWeek ?
                moment(moment().day(1).week(this.state.curWeek)).format("MMM D") + " - " + moment(moment().day(0).week(this.state.curWeek + 1)).format("D") :
                moment(moment().day(1).week(this.state.curWeek)).format("MMM D") + " - " + moment(moment().day(0).week(this.state.curWeek + 1)).format("MMM D")
        );
    };

    handleClick(i) {
        this.setState({curDate: this.getDatesCurWeek()[i]});
    };

    onPrevNextClick(symbol) {
        this.setState({curWeek: (symbol === "+" ? (this.state.curWeek + 1) : (this.state.curWeek - 1))});
    };
};

export default Calendar;