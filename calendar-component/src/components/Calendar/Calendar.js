import React, {Component} from 'react';
import './Calendar.sass';
import * as moment from 'moment';
import DatesWeek from '../DatesWeek/DatesWeek'
import dropdown from '../../assets/dropdown48-2.png'

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
            firstDayWeek: moment(moment().day(1).week(week)).format("D"),
            isClickedDate: false
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

                    <div className={"dateWeekContainer"} onClick={() => this.onDateClick()}>
                       
                        <DatesWeek content = {this.renderDateWeek()}></DatesWeek>
                        <DatesWeek content = {this.renderDateWeek()}></DatesWeek>
                        <DatesWeek content = {this.renderDateWeek()}></DatesWeek>
                        <DatesWeek content = {this.renderDateWeek()}></DatesWeek>
                        <DatesWeek content = {this.renderDateWeek()}></DatesWeek>
                        <DatesWeek content = {this.renderDateWeek()}></DatesWeek>
                        <DatesWeek content = {this.renderDateWeek()}></DatesWeek>
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
            nextMonth =moment(moment().week(week+1)).format("MMM");
        }  else{           
           
            month =moment(moment().week(week)).format("MMM");
            nextMonth =moment(moment().week(week+1)).format("MMM");
            

        }
        console.log("month",month);
        console.log("nextMonth",nextMonth);
        numberDayWeek =-1;
        numberDateWeek = 0;
        index = 1;       
    }

    renderDayWeekName() { 
       if(numberDayWeek === 6) { numberDayWeek = 0; }
       else{ numberDayWeek += 1; };       
       
        return   <div className={"dayOfWeek"}                  
        >{this.state.dayWeekName[numberDayWeek]} </div>;
    };

    renderDateWeek() {      
        if(index === 7){ numberDateWeek = moment(moment().day(0).week(week+1)).format("D");}
        else{numberDateWeek = moment(moment().day(index).week(week)).format("D");}

        index++;       
       return numberDateWeek;
  
    };

     renderTitle() {  
    if(Number.parseInt(firstDay) > Number.parseInt(lastDay)){  
       return <div className={"currentWeek"}>
       {`${month} ${firstDay} - ${nextMonth} ${lastDay}`}
       <div className={"dropDown"} >                       
                           <img src={dropdown} alt="V" width = {"12.73px"} height = {"7.78px"}></img>
                        </div>  
       </div>        
    }else{
       return <div className={"currentWeek"}>
       {`${month} ${firstDay} - ${lastDay}`}
       <div className={"dropDown"} >                       
                           <img src={dropdown} alt="V"  width = {"12.73px"} height = {"7.78px"}></img>
                        </div>  
       </div>
    }
    };
 onDateClick(props) {       
    index=1;
      this.setState({isClickedDate: true});      
 }
}

export  default  Calendar;


