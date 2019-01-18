import React, { Component } from 'react';
import './App.css';
import Calendar from '../src/components/Calendar/Calendar.js';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberWeek: 0
        };
    };

    render() {
        return (
            <div className="App">
                <Calendar>
                </Calendar>
            </div>
        );
    }

};

export default App;
