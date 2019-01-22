import React, {Component} from 'react';
import './Calendar.sass';
import * as moment from 'moment';
import DatesWeek from '../DatesWeek/DatesWeek'
import dropdown from '../../assets/dropdown48-2.png'


class Calendar extends Component {
    constructor(props) {
        super(props);
        let showWeek = true;
        let showMonth = false;
        this.state = {
            daysWeekName: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            curWeek: moment().week(),
            datesCurWeek: [],
            curMonth: moment(moment().month()).format("MMM"),
            curDate: moment(moment()).format("D"),
            firstDayWeek: moment(moment().day(1).week(moment().week())).format("D"),
            isClickedDate: false
        };
        this.onDateClick = this.onDateClick.bind(this);
        this.getDatesCurWeek = this.getDatesCurWeek.bind(this);

    }

    componentWillMount() {
        console.log("componentWillMount");
        this.setState({datesCurWeek: this.getDatesCurWeek(),});

    }

    render() {
        console.log("render");

        return (<>
                <div className={"mainContainer"}>
                    <div className={"header"}>
                        <div className={"prev"} onClick={() => this.onPrevNextClick("-")}>PREV</div>
                        {/*{this.renderTitle()}*/}
                        <div className={"currentWeek"}>
                            {this.getTitle()}
                            <div className={"dropDown"}>
                                <img src={dropdown} alt="V" width={"12.73px"} height={"7.78px"}></img>
                            </div>
                        </div>
                        <div className={"next"} onClick={() => this.onPrevNextClick("+")}>NEXT</div>
                    </div>

                    <div className={"daysWeekContainer"}>
                        {
                            this.state.daysWeekName.map((value, index) => (
                                <div className={"dayOfWeek"} key={index}>{value}</div>))
                        }
                    </div>

                    <div className={"dateWeekContainer"} onClick={() => this.onDateClick()}>
                        {this.renderDates()}
                    </div>

                </div>
            </>

        );
    }

    // renderTitle() {
    //     return <div className={"currentWeek"}>{this.getTitle()}
    //         <div className={"dropDown"}>
    //             <img src={dropdown} alt="V" width={"12.73px"} height={"7.78px"}></img>
    //         </div>
    //     </div>
    // };
    renderDates() {

        if (this.showWeek) {
            return <div>{this.getDatesCurWeek().map((value, index) => (
                <DatesWeek content={value} key={index}>{value}</DatesWeek>))}</div>
        } else {
            //TODO
            const allMonth = [];
            const monthName = moment(moment().month(this.curWeek)).format("MMM");

            for (let index = 0; index < allMonth.length; index++) {
                allMonth.push();
            }

            return <div className={"dateWeekContainer"} >
                {
                    this.getDatesCurWeek().map((value, index) => (<DatesWeek content={value} key={index}></DatesWeek>))
                }</div>
        }


    }

    onPrevNextClick(symbol) {
        //console.log("onPrevNextClick");
        this.setState({
            curWeek: (symbol === "+" ? (this.state.curWeek + 1) : (this.state.curWeek - 1)),
            firstDayWeek: moment(moment().day("Monday").week(this.state.curWeek)).format("D")
        });
    }  ;


    onDateClick(props) {

        this.setState({isClickedDate: true});
    };

    getDatesCurWeek() {
        // console.log("getDatesCurWeek");
        const datesWeek = [];
        let dateCurWeek = undefined;
        for (let index = 1; index < 8; index++) {
            if (index !== 7 ?
                dateCurWeek = moment().day(index).week(this.state.curWeek) :
                dateCurWeek = moment().day(0).week(this.state.curWeek + 1)
            ) ;
            datesWeek.push(dateCurWeek);
        }
        ;

        return datesWeek;
    };

    getTitle() {
        //console.log("getTitle");
        let title = "";
        const monthFirstDayWeek = moment(moment().day(1).week(this.state.curWeek)).format("MMM");
        const monthLastDayWeek = moment(moment().day(1).week(this.state.curWeek + 1)).format("MMM");

        if (monthFirstDayWeek === monthLastDayWeek ?
            title = moment(moment().day(1).week(this.state.curWeek)).format("MMM D") + " - " + moment(moment().day(0).week(this.state.curWeek + 1)).format("D") :
            title = moment(moment().day(1).week(this.state.curWeek)).format("MMM D") + " - " + moment(moment().day(0).week(this.state.curWeek + 1)).format("MMM D")
        ) ;
        return title;
    };
};

export default Calendar;