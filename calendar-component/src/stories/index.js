import React from 'react';

import { storiesOf } from '@storybook/react';


storiesOf('Calendar', module)
    .add('Valid input', () => (
        <div className="mainContainer"
             style={{display: "flex",
            "flex-direction":"column",
            "width":"375px",
            "height":"108px"}}>

            <div className="header"
                 style={{display: "flex",
                " justify-content":"space-between",
                "width":"375px",
                "height":"40px",
                "align-items":"center",
                "background-image":"linear-gradient(0deg, #1B6090 0%, #0B3157 100%)"}}>

                <div className="prev"
                     style={{" color":"#48C1C2",
                         "width":"59px",
                         "font-family":"Montserrat",
                         "font-size":"12px",
                         "font-weight":"700",
                         "line-height":"14px",
                         "text-align":"left",
                         "margin-left":"16px"}}
                >PREV</div>
                <div className="currentWeek">Jan 14-20</div>
                <div className="next" onClick={() => this.onPrevNextClick("+")}>NEXT</div>
            </div>

            <div className="daysWeekContainer"></div>

            <div className="dateWeekContainer"></div>

        </div>
    ));

/*
  color: #48C1C2;
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    width: 59px;
    text-align: left;
    margin-left: 16px;
}
}*/
