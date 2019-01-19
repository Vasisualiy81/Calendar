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
let curDay =moment( moment()).format("D");
let index =1;

class Calendar extends Component {
    constructor(props) {
        super(props);
           
       
        this.state ={
            dayWeekName: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],//["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],
            curWeek: week,     
            curMonth: month, 
            curDate:  curDay,   
            firstDayWeek: moment(moment().day(1).week(week)).format("D")
        };
       
    }

    render() {
     
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
        this.setState({curWeek: symbol === "+" ? (this.state.curWeek + 1, week += 1) : (this.state.curWeek - 1, week -= 1)});
    
        this.setState({ firstDayWeek: moment(moment().day("Monday").week(week)).format("D")});
        firstDay =  moment(moment().day(1).week(week)).format("D");
        lastDay =  moment(moment().day(0).week(week+1)).format("D");
      
        if(Number.parseInt(firstDay) > Number.parseInt(lastDay) ){          
            month =moment(moment().week(week-1)).format("MMM");
            nextMonth =moment(moment().week(week)).format("MMM");
        }  else{
            month =moment(moment().week(week)).format("MMM");
            nextMonth =moment(moment().week(week+1)).format("MMM");
        }
      
        numberDayWeek =-1;
        numberDateWeek = 0;
        index = 1;       
    }

    renderDayWeekName() { 
       if(numberDayWeek === 6) { numberDayWeek = 0; }
       else{ numberDayWeek += 1; };       
       
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
        if(index === 7){ numberDateWeek = moment(moment().day(0).week(week+1)).format("D");}
        else{numberDateWeek = moment(moment().day(index).week(week)).format("D");}

        index++;       
       
       if(Number.parseInt(numberDateWeek) === Number.parseInt(curDay)){
        return   <div className={"dayOfWeek"}
        style={{display: "flex",
            "alignItems":"center",
            "justifyContent":"center",
            "color":"#FFFFFF",
            "background":"#0B3157",
            "borderRadius":"5px",
            "fontFamily":"Montserrat",
            "fontSize":"16px",
            "fontWeight":"400",
            "letterSpacing":"-0.28px",
            "width":"40px",
            "height":"40px",
            "textAlign":"center"
            }}
>{numberDateWeek} </div>;
       }else{
        return   <div className={"dayOfWeek"}
             onClick={() => this.onDateClick()}
             //text-content = "numberDateWeek"
                      style={{ display: "flex",
                          "alignItems":"center",
                          "justifyContent":"center",
                          "color":"#0B3157",
                          "background":"#FFFFFF",
                          "borderRadius":"5px",
                          "fontFamily":"Montserrat",
                          "fontSize":"16px",
                          "fontWeight":"400",
                          "letterSpacing":"-0.28px",
                          "width":"40px",
                          "height":"40px",
                          "textAlign":"center"
                         }}
        >{numberDateWeek} </div>;
    }
    };

     renderTitle() {        
       
      
    if(Number.parseInt(firstDay) > Number.parseInt(lastDay)){  
       return <div className={"currentWeek"}>
       {`${month} ${firstDay} - ${nextMonth} ${lastDay}`}
       </div>        
    }else{
       return <div className={"currentWeek"}>
       {`${month} ${firstDay} - ${lastDay}`}
       </div>
    }
    };
 onDateClick() {    
     console.log("onDateClick");
    curDay= this.props.content;
    this.setState({curDay: this.state.curDate});
 }
}

export  default  Calendar;


