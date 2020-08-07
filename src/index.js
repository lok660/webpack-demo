import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './home.js';
import axios from 'axios';
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

    componentDidMount() {
        axios.get('/movie/top250')
            .then((res) => {
                console.log(res);
            })
    }

    render() {
        return (
            <div>
                {/* <Home /> */}
                proxy转发
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))