import React from 'react';
import Calendar from '../src/components/Calendar/Calendar.js';
import { storiesOf } from '@storybook/react';


storiesOf('Calendar', module)
    .add('only one week', () => (
       <Calendar/>
    ));

