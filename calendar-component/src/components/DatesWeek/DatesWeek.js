import React, {Component} from 'react';
import './DatesWeek.sass';
import * as moment from 'moment';



 

let curDay =moment( moment()).format("D");
let chekedDay =curDay;

class DatesWeek extends Component {
    constructor(props) {
        super(props);
           
       
        this.state ={
           content:"",
           isDateCheked: false
        };
       
    };
    render() {
       
           if(Number.parseInt(this.props.content) === Number.parseInt(chekedDay)){           
           return (
               <div>{this.isCheked(true)}</div>);
           } else{           
            return (                
                <div>{this.isCheked(false)}</div>);
           }          
    };

    isCheked(props){ 
              
if(props){   
    return   <div className={"chekedDateOfWeek"}  
    onClick={() => this.onDateClick()}   
>{this.props.content}</div>;
}else{      
    return   <div className={"dateOfWeek"}            
             onClick={() => this.onDateClick()}
>{this.props.content}</div>;
}
    }
    onDateClick(props) {   
       chekedDay = this.props.content;   
       this.setState({isDateCheked: true});
         
    }
};

export default DatesWeek;