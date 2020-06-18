/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react';

import { MySilder } from '../lib';
import Img from '../img/channel03.png';

class App extends Component {

    constructor() {
        super();
        this.state = {
            value: '',
            picUrl: Img,
            step: 61.17,
        };
        this.setProps = this.setProps.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    render() {
        return (
            <div>
                <MySilder
                    setProps={this.setProps}
                    {...this.state}
                />
            </div>
        )
    }
}

export default App;
