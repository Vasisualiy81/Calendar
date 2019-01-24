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
            weeksMonth: [],
            curDate: moment(),
            curWeek: moment().week(),
            curMonth: moment(moment().month()).format("MMM"),
            fullMonth: false,
            contentPrev:"PREV",
            contentNext:"NEXT"

        };
        this.getDatesCurWeek = this.getDatesCurWeek.bind(this);
    };

    render() {
        console.log("Calendar - render");
        console.log("fullMonth >>> ", this.state.fullMonth);
        return (
            <>
                <div className={"Calendar-main-container"}>

                    <div className={"Calendar-header-container"}>
                        <div className={"Calendar-prev"} onClick={() => this.onPrevNextClick("-")}>{this.state.contentPrev}</div>
                        <div className={"Calendar-current-week"}>
                            {this.getTitle()}
                            <div className={"Calendar-dropdown"} onClick={() => this.onDropdownClick()}>
                                <img src={dropdown} alt="V" width={"12.73px"} height={"7.78px"}></img>
                            </div>
                        </div>
                        <div className={"Calendar-next"} onClick={() => this.onPrevNextClick("+")}>{this.state.contentNext}</div>
                    </div>

                    <div className={"Calendar-days-week-container"}>
                        {
                            this.state.daysWeekName.map((value, index) => (
                                <div className={"Calendar-day-of-week"} key={index}>{value}</div>))
                        }
                    </div>
                    <div className={"Calendar-month-container"}>
                        {this.state.fullMonth ? this.renderMonth() : this.renderWeek(this.state.curWeek)}
                    </div>
                </div>
            </>
        );
    };

    renderMonth() {
        console.log("renderMonth >>> ");
        return (
            this.getWeeksMonth().map((indexWeek, i) => (
                <div className={"Calendar-date-week-container"} key={i}>
                    {this.renderWeek(indexWeek)}
                </div>))
        );
    };

    renderWeek(indexWeek) {
        console.log("renderDates indexWeek >>> ", indexWeek);
        return (
            <div className={"Calendar-date-week-container"}>
                {this.getDatesCurWeek(indexWeek).map((value, i) => (
                    <DatesWeek
                        className={moment(this.state.curDate).format("D") === moment(value).format("D") ? "DatesWeek-selected-date-week" : "DatesWeek-date-week"}
                        content={value}
                        key={i}
                        onClick={() => this.handleClick(indexWeek, i)}>{value}</DatesWeek>
                ))}
            </div>
        );
    };

    getWeeksMonth() {
        //определяем текущий месяц по текущей неделе
        const curMonth = moment(moment().day(1).week(this.state.curWeek)).format('MMMM');
        //определяем первый и последний дни текущего месяца
        const startOfMonth = moment(moment().startOf('month').month(curMonth)).format('D');
        const endOfMonth = moment(moment().endOf('month').month(curMonth)).format('D');
        //определяем индекс первой и последней недели текущего месяца
        const indexWeek1 = moment().month(curMonth).date(startOfMonth).week();
        const indexWeek2 = moment().month(curMonth).date(endOfMonth).week();

        const allWeekMonth = [];
        for (let i = indexWeek1; i < indexWeek2 + 1; i++) {
            allWeekMonth.push(i);
        };
        return allWeekMonth;
    };

    getDatesCurWeek(indexWeek) {
        const datesWeek = [];
        let dateCurWeek = undefined;
        for (let index = 1; index < 8; index++) {
            (index !== 7 ?
                    dateCurWeek = moment().day(index).week(indexWeek) :
                    dateCurWeek = moment().day(0).week(indexWeek + 1)
            );
            datesWeek.push(dateCurWeek);
        }
        ;
        return datesWeek;
    };

    getTitle() {
        const monthFirstDayWeek = moment(moment().day(1).week(this.state.curWeek)).format("MMM");
        const monthLastDayWeek = moment(moment().day(1).week(this.state.curWeek + 1)).format("MMM");
        return (this.state.fullMonth ?
            moment(moment().day(1).week(this.state.curWeek)).format('MMMM') :
            (monthFirstDayWeek === monthLastDayWeek ?
                    moment(moment().day(1).week(this.state.curWeek)).format("MMM D") + " - " + moment(moment().day(0).week(this.state.curWeek + 1)).format("D") :
                    moment(moment().day(1).week(this.state.curWeek)).format("MMM D") + " - " + moment(moment().day(0).week(this.state.curWeek + 1)).format("MMM D")
            ));
    };

    handleClick(indexWeek, i) {
        this.setState({curDate: this.getDatesCurWeek(indexWeek)[i]});
    };

    onPrevNextClick(symbol) {
        this.setState({
            curWeek: (symbol === "+" ? (this.state.curWeek + 1) : (this.state.curWeek - 1))
        });
    };

    onDropdownClick() {
        console.log("onDropdownClick >>> ",this.state.fullMonth);
        let prev ="";
        let next ="";
        //TODO
        if(this.state.fullMonth ?(prev = moment(moment().month(this.state.curMonth)).format('MMM'), next = moment(moment().month(this.state.curMonth)).format('MMM')):(prev ="PREV", next = "NEXT") );
        this.setState({
            fullMonth: !this.state.fullMonth,
            curMonth: moment(moment().day(1).week(this.state.curWeek)).format('MMM'),
            contentPrev:prev,
            contentNext:next
        });
    }
};

export default Calendar;