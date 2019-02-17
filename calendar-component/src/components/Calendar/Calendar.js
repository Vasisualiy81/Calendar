import React, {Component} from 'react';
import './Calendar.sass';
import * as moment from 'moment';
import DatesWeek from '../DatesWeek/DatesWeek';
import dropdown from '../../assets/dropdown48-2.png';

// moment.locale('cs');

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            daysWeekName: ["S", "M", "T", "W", "T", "F", "S"],
            selectedDate: moment(),
            curWeek: moment().week(),
            curMonth: moment().month(),
            fullMonth: false,
            contentPrev: "PREV",
            contentNext: "NEXT"

        };
        this.getDatesCurWeek = this.getDatesCurWeek.bind(this);
    };

    componentDidMount() {
        this.setState({
            curMonth: moment().day(0).week(this.state.curWeek)
        })
    }

    render() {
        console.log("Calendar - render");
        const curMonth = moment(this.state.curMonth).format('MMM');
        const prevMonth = moment(moment().month(curMonth).subtract(1, 'month')).format('MMM');
        const nextMonth = moment(moment().month(curMonth).add(1, 'month')).format('MMM');
        return (
            <>
                <div className={"Calendar-main-container"}>

                    <div className={"Calendar-header-container"}>
                        <div className={"Calendar-prev"} onClick={() => this.onPrevNextClick(-1)}>
                            {(this.state.fullMonth ? prevMonth : "PREV")}
                        </div>
                        <div className={"Calendar-current-week"}>
                            {this.getTitle()}
                            <div className={"Calendar-dropdown"} onClick={() => this.onDropdownClick()}>
                                <img className={"Calendar-dropdown-img"} src={dropdown} alt="V"></img>
                            </div>
                        </div>
                        <div className={"Calendar-next"} onClick={() => this.onPrevNextClick(1)}>
                            {(this.state.fullMonth ? nextMonth : "NEXT")}
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
                <div key={i}>
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
                        className={moment(this.state.selectedDate).format("D MMM") === moment(value).format("D MMM") ? "DatesWeek-selected-date-week" :
                            (moment(this.state.curMonth).format("MMM") !== moment(value).format("MMM") ? "DatesWeek-date-other-month" : "DatesWeek-date-week")}
                        content={value}
                        key={i}
                        onClick={() => this.handleClick(indexWeek, i)}>{value}</DatesWeek>
                ))}
            </div>
        );
    };

    getWeeksMonth() {
        //определяем текущий месяц в нужном формате
        const curMonth = moment(this.state.curMonth).format("MMM");
        //console.log("getWeeksMonth curMonth >>> ", curMonth);
        //определяем первый и последний дни текущего месяца
        const startOfMonth = moment(moment().month(curMonth).clone().startOf('month')).format('D');
        const endOfMonth = moment(moment().month(curMonth).clone().endOf('month')).format('D');
        //определяем индекс первой и последней недели текущего месяца
        const indexWeek1 = moment().month(curMonth).date(startOfMonth).week();
        const indexWeek2 = (curMonth === "Dec" ? 53 : moment().month(curMonth).date(endOfMonth).week());

        // console.log("getWeeksMonth indexWeek1 >>> ", indexWeek1);
        // console.log("getWeeksMonth indexWeek2 >>> ", indexWeek2);
        const allWeekMonth = [];
        for (let i = indexWeek1; i < indexWeek2 + 1; i++) {
            allWeekMonth.push(i);
        }
        ;
        return allWeekMonth;
    };

    getDatesCurWeek(indexWeek) {
        const datesWeek = [];
        let dateCurWeek;
        for (let index = 0; index < 7; index++) {
            dateCurWeek = moment().day(index).week(indexWeek);
            datesWeek.push(dateCurWeek);
        }
        ;
        return datesWeek;
    };

    getTitle() {
        const curMonth = moment(this.state.curMonth).format("MMMM");
        const monthWithYearName = moment(this.state.curMonth).format((curMonth.length === 4 ? "MMMM YYYY" : "MMM YYYY"))
        const monthFirstDayWeek = moment(moment().day(0).week(this.state.curWeek)).format("MMMM");
        const monthLastDayWeek = moment(moment().day(6).week(this.state.curWeek)).format("MMMM");
        const firstDayWeek = moment(moment().day(0).week(this.state.curWeek)).format((monthFirstDayWeek.length === 4 ? "MMMM D" : "MMM D"));
        let lastDayWeek =
            (monthFirstDayWeek === monthLastDayWeek ?
                moment(moment().day(6).week(this.state.curWeek)).format("D") :
                moment(moment().day(6).week(this.state.curWeek)).format((monthLastDayWeek.length === 4 ? "MMMM D" : "MMM D")));

        return (this.state.fullMonth ? monthWithYearName : firstDayWeek + "-" + lastDayWeek)
    };

    handleClick(indexWeek, i) {
        const tempSelectedDate = this.getDatesCurWeek(indexWeek)[i];
        this.setState({
            selectedDate: tempSelectedDate,
            curWeek: indexWeek,
            curMonth: tempSelectedDate
        });
    };

    onPrevNextClick(digit) {
        const tempCurWeek = (this.state.fullMonth ? this.state.curWeek + digit * 4 : this.state.curWeek + digit);
        const tempCurMonth = moment().day(0).week(tempCurWeek);

        this.setState({curMonth: tempCurMonth, curWeek: tempCurWeek})
    };

    onDropdownClick() {
        let tempCurMonth = moment(this.state.curMonth).format("MMM");
        let tempCurWeek =
            (tempCurMonth === moment(this.state.selectedDate).format("MMM") ?
                moment(this.state.selectedDate).week() :
                moment().month(tempCurMonth).date(1).week());
        this.setState({
            fullMonth: !this.state.fullMonth,
            curWeek: tempCurWeek
        });
    }
};

export default Calendar;