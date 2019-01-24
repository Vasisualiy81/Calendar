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
            contentPrev: "PREV",
            contentNext: "NEXT"

        };
        this.getDatesCurWeek = this.getDatesCurWeek.bind(this);
    };

    render() {
        console.log("Calendar - render");
        // console.log("curDate >>> ", moment(this.state.curDate).format('D MMM'));
        // console.log("curWeek >>> ", moment(moment().week(this.state.curDate)).format("M"));
        // console.log("curWeek2 >>> ", moment().date(moment(this.state.curDate).format('D')).week());

        return (
            <>
                <div className={"Calendar-main-container"}>

                    <div className={"Calendar-header-container"}>
                        <div className={"Calendar-prev"} onClick={() => this.onPrevNextClick("-")}>
                            {(this.state.fullMonth ? moment(moment().month(this.state.curMonth).subtract(1, 'month')).format('MMM') : "PREV")}
                        </div>
                        <div className={"Calendar-current-week"}>
                            {this.getTitle()}
                            <div className={"Calendar-dropdown"} onClick={() => this.onDropdownClick()}>
                                <img src={dropdown} alt="V" width={"12.73px"} height={"7.78px"}></img>
                            </div>
                        </div>
                        <div className={"Calendar-next"} onClick={() => this.onPrevNextClick("+")}>
                            {(this.state.fullMonth ? moment(moment().month(this.state.curMonth).add(1, 'month')).format('MMM') : "NEXT")}
                        </div>
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
        //console.log("renderMonth >>> ");
        return (
            this.getWeeksMonth().map((indexWeek, i) => (
                <div className={"Calendar-date-week-container"} key={i}>
                    {this.renderWeek(indexWeek)}
                </div>))
        );
    };

    renderWeek(indexWeek) {
        // console.log("renderDates indexWeek >>> ", indexWeek);
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
        const curMonth = this.state.curMonth;
        //const curMonth = moment(moment().day(1).week(this.state.curWeek)).format('MMMM');
        //const curMonth =   moment(moment().date( moment(this.state.curDate).format('D')).month('month')).format('MMM');
        console.log("curMonth >>> ", curMonth);
        //определяем первый и последний дни текущего месяца
        const startOfMonth = moment(moment().startOf('month').month(curMonth)).format('D');
        const endOfMonth = moment(moment().endOf('month').month(curMonth)).format('D');
        //определяем индекс первой и последней недели текущего месяца
        const indexWeek1 = moment().month(curMonth).date(startOfMonth).isoWeek();
        const indexWeek2 = moment().month(curMonth).date(endOfMonth).isoWeek();

        const allWeekMonth = [];
        for (let i = indexWeek1; i < indexWeek2 + 1; i++) {
            allWeekMonth.push(i);
        }
        ;
        return allWeekMonth;
    };

    getDatesCurWeek(indexWeek) {
        const datesWeek = [];
        let dateCurWeek = undefined;
        for (let index = 1; index < 8; index++) {
            (
                dateCurWeek = moment().day(index).isoWeek(indexWeek)

            );
            datesWeek.push(dateCurWeek);
        }
        ;
        return datesWeek;
    };

    getTitle() {
        const monthFirstDayWeek = moment(moment().day(1).week(this.state.curWeek)).format("MMM");
        const monthLastDayWeek = moment(moment().day(0).week(this.state.curWeek + 1)).format("MMM");
        return (this.state.fullMonth ?
            moment(moment().month(this.state.curMonth)).format('MMMM') :
            (monthFirstDayWeek === monthLastDayWeek ?
                    moment(moment().day(1).week(this.state.curWeek)).format("MMM D") + " - " + moment(moment().day(0).week(this.state.curWeek + 1)).format("D") :
                    moment(moment().day(1).week(this.state.curWeek)).format("MMM D") + " - " + moment(moment().day(0).week(this.state.curWeek + 1)).format("MMM D")
            ));
    };

    handleClick(indexWeek, i) {
        let tempCurDay = this.getDatesCurWeek(indexWeek)[i];
        console.log("tempCurDay >>> ", moment(tempCurDay).format("D MMM"));
        console.log("indexWeek >>> ", indexWeek);
        console.log("curWeek >>> ", moment().date(moment(tempCurDay).format('D')).week('week'));
        this.setState({
            curDate: this.getDatesCurWeek(indexWeek)[i],
            curWeek: indexWeek
        });
    };

    onPrevNextClick(symbol) {

        let tempCurWeek = this.state.curWeek;
        let tempCurMonth = moment(moment().day(1).week(tempCurWeek)).format('MMM');
        if (this.state.fullMonth ?
            (symbol === "+" ?
                    (tempCurMonth = moment(moment().month(tempCurMonth).add(1, 'month')).format('MMM'), tempCurWeek += 4) :
                    (tempCurMonth = moment(moment().month(tempCurMonth).subtract(1, 'month')).format('MMM'), tempCurWeek -= 4)
            ) :
            (tempCurWeek = (symbol === "+" ? (this.state.curWeek + 1) : (this.state.curWeek - 1))),
            tempCurMonth = moment(moment().day(1).week(tempCurWeek)).format('MMM')
        ) ;
        this.setState({curMonth: tempCurMonth, curWeek: tempCurWeek});
    };

    onDropdownClick() {
        console.log("curDate >>> ", moment(this.state.curDate).format('D MMM'));
        console.log("curWeek >>> ", moment().date(moment(this.state.curDate).format('D')).week());
        this.setState({
            fullMonth: !this.state.fullMonth
        });
    }
};

export default Calendar;