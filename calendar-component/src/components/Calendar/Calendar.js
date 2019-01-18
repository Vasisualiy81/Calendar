import React, {Component} from 'react';
import './Calendar.sass';
import * as moment from 'moment';

let  numberDayWeek =-1;
let  numberDateWeek =0;
let week = moment().week();   
let month =moment(moment().month()).format("MMM");
let nextMonth =moment(moment().month()).format("MMM");
let firstDay =  moment(moment().day(1).week(week)).format("D");
let lastDay =  moment(moment().day(0).week(week+1)).format("D");
let index =1;
let indexMonth = 0;

class Calendar extends Component {
    constructor(props) {
        super(props);
           
       
        this.state ={
            dayWeekName: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],//["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],
            curWeek: week,     
            curMonth: month,     
            firstDayWeek: moment(moment().day(1).week(week)).format("D")
        };
       
    }

    render() {
        console.log("curWeek >>> ",`${this.state.curWeek}`);
        console.log("firstDayWeek >>> ",`${this.state.firstDayWeek}`);
        return (
            <>
                <div className={"mainContainer"}>
                    <div className={"header"}>
                        <div className={"prev"} onClick={() => this.onPrevNextClick("-")}>PREV</div>
                        {this.renderTitle()}
                       
                        <div className={"next"} onClick={() => this.onPrevNextClick("+")}>NEXT</div>
                    </div>

                    <div className={"daysWeekContainer"}>                    
                        {this.renderDayWeekName()}
                        {this.renderDayWeekName()}
                        {this.renderDayWeekName()}
                        {this.renderDayWeekName()}
                        {this.renderDayWeekName()}
                        {this.renderDayWeekName()}
                        {this.renderDayWeekName()}
                    </div>

                    <div className={"dateWeekContainer"}>
                        {this.renderDateWeek()}
                        {this.renderDateWeek()}
                        {this.renderDateWeek()}
                        {this.renderDateWeek()}
                        {this.renderDateWeek()}
                        {this.renderDateWeek()}
                        {this.renderDateWeek()}
                        
                        
                    </div>
                </div>
            </>

        );
    }

    onPrevNextClick(symbol) {
        this.setState({curWeek: symbol === "+" ? this.state.curWeek + 1 : this.state.curWeek - 1});
       if( symbol === "+" ){week += 1;} else{ week -= 1};
       console.log("week >>> ",week);
        this.setState({ firstDayWeek: moment(moment().day("Monday").week(week)).format("D")});
        
        numberDayWeek =-1;
        numberDateWeek = 0;
        index = 1;
        if(Number.parseInt(firstDay) > Number.parseInt(lastDay)){month = nextMonth;}
       
    }
    renderDayWeekName() {
        
       
       if(numberDayWeek === 6){ numberDayWeek = 0; }
        else{ numberDayWeek += 1;};
        console.log("numberDayWeek >>> ",numberDayWeek);
       
        return   <div className={"dayOfWeek"}
                      style={{"color":"#FFFFFF",
                          "fontSize":"11px",
                          "fontWeight":"400",
                          "lineHheight":"13px",
                          "width":"40px",
                          "textAlign":"center"}}
        >{this.state.dayWeekName[numberDayWeek]} </div>;
    };

    renderDateWeek() {      

        
        console.log("index >>> ",index);
        if(index === 7){ numberDateWeek = moment(moment().day(0).week(week+1)).format("D");}
        else{numberDateWeek = moment(moment().day(index).week(week)).format("D");}

        index++;
      

        console.log("numberDateWeek >>> ",numberDateWeek);
       
        return   <div className={"dayOfWeek"}
                      style={{"color":"#0B3157",
                          "fontFamily":"Montserrat",
                          "fontSize":"16px",
                          "fontWeight":"400",
                          "letterSpacing":"-0.28px",
                          "width":"40px",
                          "height":"40px",
                          "textAlign":"center"}}
        >{numberDateWeek} </div>;
    };
     renderTitle() {
        console.log("renderTitle");
        firstDay =  moment(moment().day(1).week(week)).format("D");
        lastDay =  moment(moment().day(0).week(week+1)).format("D");
        // nextMonth =moment(moment().add(1,'months')).format("MMM");
    
        console.log("firstDay >>> ",firstDay);
        console.log("lastDay >>>",lastDay);
        //console.log("nextMonths >>> ",nextMonth);
    if(Number.parseInt(firstDay) > Number.parseInt(lastDay)){
    indexMonth += 1;
    nextMonth =moment(moment().add(indexMonth,'months')).format("MMM");
    console.log("nextMonths >>> ",nextMonth);
    return <div className={"currentWeek"}>
    {`${month} ${firstDay} - ${nextMonth} ${lastDay}`}
    </div>
    
    
}else{
    return <div className={"currentWeek"}>
    {`${month} ${firstDay} - ${lastDay}`}
    </div>
}
    };

}

export  default  Calendar;


