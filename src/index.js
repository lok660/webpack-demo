import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './home.js';
// import _ from 'lodash';
// import $ from 'jquery';
// import { ui } from './jquery.ui.js'

// ui();
// console.log('---123---');
// const dom = $('<div>');
// dom.html(_.join(['Hello', 'darrell123'], ' '));
// $('body').append(dom);
// this.a = 111;

// console.log(this);
// console.log(this.a);

// console.log(this === window);



class App extends Component {
    render() {
        return (
            <div>
                <Home />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))