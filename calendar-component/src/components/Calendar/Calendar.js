import React, {Component} from 'react';
import './Calendar.sass';
import * as moment from 'moment';
import DatesWeek from '../DatesWeek/DatesWeek';
import dropdown from '../../assets/dropdown48-2.png';

// moment.locale('cs');
//import 'moment/locale/en-gb'  // without this line it didn't work
// moment.locale('en-gb')
moment.locale('', {
    week: {
        dow: 0
    }
});

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
            contentNext: "NEXT",
            isDropDown: false

        };
        this.getDatesCurWeek = this.getDatesCurWeek.bind(this);
    };

    componentWillMount() {

        //console.log("componentDidMount curMonth >>> ", moment().day(0).week(this.state.curWeek));

        this.setState({
            curMonth: moment().day(0).week(this.state.curWeek)
        })
    }

    render() {
        console.log("Calendar - render");
        // console.log("render curWeek >>> ", moment(this.state.curWeek).toDate());
        // console.log("render curMonth >>> ", moment(this.state.curMonth).toDate());
        const curMonth = moment(this.state.curMonth).format('MMM');
        const prevMonth = moment(moment().month(curMonth).subtract(1, 'month')).format('MMM');
        const nextMonth = moment(moment().month(curMonth).add(1, 'month')).format('MMM');
        return (
            <>
                <div className={"Calendar-main-container"}>
                    <div className={"Calendar-main-container2"}>
                        <div className={"Calendar-header-container"}>
                            <div className={"Calendar-prev"} onClick={() => this.onPrevNextClick(-1)}>
                                {(this.state.fullMonth ? prevMonth : "PREV")}
                            </div>
                            <div className={"Calendar-current-week"}>
                                {this.getTitle()}
                                <div className={"Calendar-dropdown"} onClick={() => this.onDropdownClick()}>
                                    <img
                                        className={this.state.isDropDown ? "Calendar-dropdown-img-rotate" : "Calendar-dropdown-img"}
                                        src={dropdown} alt="V"></img>
                                </div>
                            </div>
                            <div className={"Calendar-next"} onClick={() => this.onPrevNextClick(1)}>
                                {(this.state.fullMonth ? nextMonth : "NEXT")}
                            </div>
                        </div>
                        <div className={this.state.isDropDown ? "Calendar-menu-open" : "Calendar-menu-hidden"}>
                            <div className={"Calendar-week"}
                                 onClick={() => this.showMonth(false)}>This week
                            </div>
                            <div className={"Calendar-month"}
                                 onClick={() => this.showMonth(true)}>This month
                            </div>
                        </div>
                        <div className={"Calendar-days-week-container"}>
                            {
                                this.state.daysWeekName.map((value, index) => (
                                    <div className={"Calendar-day-of-week"} key={index}>{value}</div>))
                            }
                        </div>
                        <div className={"Calendar-month-container"}>
                            {this.state.fullMonth ? this.renderMonth() : this.renderWeek(null)}
                        </div>
                        <div className={"Calendar-selected-date"}>
                            {moment(this.state.selectedDate).format("dddd, D MMMM").toUpperCase()}
                        </div>
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
        if (!this.state.fullMonth) {

            console.log("renderWeek indexWeek beafor >>> ", indexWeek);
            indexWeek = moment().month(moment(this.state.curMonth).format('MMM')).week(this.state.curWeek).format("W");
        }
        // console.log("renderWeek indexWeek after >>> ", indexWeek);
        // console.log("renderWeek this.state.curWeek >>> ", this.state.curWeek);
        // console.log("renderWeek this.state.curMonth >>> ", this.state.curMonth);

        return (
            <div className={"Calendar-date-week-container"}>
                {this.getDatesCurWeek(indexWeek).map((value, i) => (

                    <DatesWeek
                        className={moment(this.state.selectedDate).format("D MMM YYYY") === moment(value).format("D MMM YYYY") ? "DatesWeek-selected-date-week" :
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
        //const curMonth =  moment(moment().day(0).week(this.state.curWeek)).format("MMM YYYY");
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
            // if(i===53){ allWeekMonth.push(1);break;}
            // console.log("getWeeksMonth i >>> ", moment().week(i));
            allWeekMonth.push(i);
        }
        return allWeekMonth;
    };

    getDatesCurWeek(indexWeek) {
        const datesWeek = [];
        let dateCurWeek;
        for (let index = 0; index < 7; index++) {

            //dateCurWeek = moment(moment().day(0).week(this.state.curWeek)).day(index).week(indexWeek);
            dateCurWeek = moment(this.state.curMonth).day(index).week(indexWeek);
            //console.log("getDatesCurWeek indexWeek >>> ", indexWeek);
            //console.log("getDatesCurWeek dateCurWeek >>> ", dateCurWeek.toDate());
            datesWeek.push(dateCurWeek);
        }
        ;
        return datesWeek;
    };

    getTitle() {
        const curMonth = moment(this.state.curMonth).format("MMMM YYYY");
        const monthWithYearName = moment(this.state.curMonth).format((curMonth.length === 9 ? "MMMM YYYY" : "MMM YYYY"));
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
        // console.log("handleClick - tempSelectedDate", tempSelectedDate);
        // console.log("handleClick - indexWeek", indexWeek);
        // console.log("handleClick - dif", moment(moment(tempSelectedDate).day(1).week('W')).diff(moment().day(1).week("W"), 'weeks'));
        // console.log("handleClick - selectedWeek", moment().week() + moment(moment(tempSelectedDate).day(0).week('W')).diff(moment().day(0).week("W"), 'weeks'));
        // console.log("handleClick - selectedWeek", tempSelectedDate);

        this.setState({
            selectedDate: tempSelectedDate,
            //curWeek: moment().week() + moment(moment(tempSelectedDate).day(0).week('W')).diff(moment().day(0).week("W"), 'weeks'),
            //curWeek: indexWeek,
            curMonth: tempSelectedDate
        });
    };


    onPrevNextClick(digit) {
        console.log("onPrevNextClick - this.state.curWeek >>> ", this.state.curWeek);
        // console.log("onPrevNextClick - moment().day(0).week >>> ", moment().month(moment(this.state.curMonth).month()).date(0).week());
        // console.log("onPrevNextClick - первое число мес >>> ", moment().month(moment(this.state.curMonth).format("MMM")).clone().startOf('month'));
        // console.log("onPrevNextClick - первое число мес >>> ", moment(moment().month(moment(this.state.curMonth).format("MMM")).clone().startOf('month')).date(2));
        // console.log("onPrevNextClick - разница между тек неделей и первой неделей сл.мес >>> ",moment(moment().month(moment(moment(this.state.curMonth).add(digit,"M").toDate()).format("MMM")).clone().startOf('month')).diff(moment(), 'weeks'));
        //console.log("onPrevNextClick - разница между тек неделей и первой неделей сл.мес >>> ", moment(moment(moment(this.state.curMonth).add(digit, "M").toDate()).date(1)).diff(moment(), 'weeks'));

        // let tempCurWeek = (this.state.fullMonth ? this.state.curWeek + digit * 4 : this.state.curWeek + digit);
        // let tempCurMonth = moment().day(0).week(tempCurWeek);
        let tempCurWeek = this.state.curWeek;
        let tempCurMonth = this.state.curMonth;
        if (this.state.fullMonth) {
            tempCurMonth = moment(this.state.curMonth).add(digit, "M").toDate();
            tempCurWeek = moment().week() + moment(tempCurMonth).diff(moment().month('month'), 'weeks');


        } else {
            tempCurWeek =this.state.curWeek+digit;
            tempCurMonth = moment().day(0).week(tempCurWeek);
        }

         console.log("onPrevNextClick - tempCurWeek", tempCurWeek);
        // console.log("onPrevNextClick - tempCurMonth", tempCurMonth);
        this.setState({curMonth: tempCurMonth, curWeek: tempCurWeek})
    };

    onDropdownClick() {
        this.setState({isDropDown: !this.state.isDropDown});
    }

    showMonth(isFullMonth) {
        this.setState({fullMonth: isFullMonth});
    }

};

export default Calendar;