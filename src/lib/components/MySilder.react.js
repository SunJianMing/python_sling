import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../style/index.css';

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */

export default class MySilder extends Component {
    constructor(props) {
        super(props);
        this.img = React.createRef();
        this.mark = React.createRef();
        this.wrapImg = React.createRef();
        this.state = {
            stepInterval: 0,
        };
    }
    componentDidMount() {
        this.setSubscript();
        this.silderDrag(this.mark.current);
        this.silderDrag(this.wrapImg.current, true);
    }
    //设置下标位置
    setSubscript() {
        let {step} = this.props;
        let self = this;
        this.img.current.addEventListener('load', function () {
            self.setState({
                stepInterval: this.offsetWidth / step,
            });
            self.wrapImg.current.dataset.width = this.offsetWidth;
        });
    }

    //滑块
    silderDrag(obj, flag) {
        let disX, type, disW, disX1, disL;

        let wrapWidth = this.wrapImg.current.offsetWidth;
        let {stepInterval} = this.state;
        function move(ev) {
            if (type) {
                let w = ev.clientX - disX1;
                if (obj.offsetWidth > wrapWidth) {
                    obj.style.width = wrapWidth + 'px';
                    return;
                }
                if (obj.offsetWidth + obj.offsetLeft > wrapWidth) {
                    obj.style.width = wrapWidth - obj.offsetLeft + 'px';
                    return;
                }
                if (obj.offsetWidth < stepInterval) {
                    obj.style.width = stepInterval + 'px';
                }
                if (type == 'right') {
                    obj.style.width = w + disW + 'px';
                }
                if (type == 'left') {
                    if (disL + w <= 0) {
                        // obj.style.width
                        obj.style.left = 0;
                        return;
                    }
                    obj.style.width = disW - w + 'px';
                    obj.style.left = disL + w + 'px';
                }
                return;
            }
            let currentX = ev.clientX - disX;

            if (!flag) {
                if (currentX < 0) {
                    currentX = 0;
                }
                if (currentX > wrapWidth - obj.offsetWidth) {
                    currentX = wrapWidth - obj.offsetWidth;
                }
            } else {
                if (currentX > 0) {
                    currentX = 0;
                }
                if (currentX < wrapWidth - obj.dataset.width) {
                    currentX = wrapWidth - obj.dataset.width;
                }
            }
            obj.style.left = currentX + 'px';
        }

        obj.addEventListener('mousedown', (ev) => {
            if (!flag) {
                if (ev.offsetX < 10) {
                    type = 'left';
                    obj.style.cursor = 'w-resize';
                }
                if (ev.offsetX > obj.offsetWidth - 10) {
                    type = 'right';
                    obj.style.cursor = 'e-resize';
                }
            }
            disX1 = ev.clientX;
            disW = obj.offsetWidth;
            disL = obj.offsetLeft;
            disX = ev.clientX - obj.offsetLeft;
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', () => {
                let {stepInterval} = this.state;
                let {setProps} = this.props;
                document.removeEventListener('mousemove', move);
                type = undefined;
                obj.style.cursor = 'default';

                if (!flag) {
                    if (obj.offsetWidth + obj.offsetLeft > wrapWidth) {
                        obj.style.width = wrapWidth - obj.offsetLeft + 'px';
                        return;
                    }
                }
                let markTime = this.mark.current.offsetLeft / stepInterval;
                let wrapTime =
                    Math.abs(this.wrapImg.current.offsetLeft) / stepInterval;
                //开始时间
                let startTime = +(markTime + wrapTime).toFixed(2);
                //结束时间
                let endTime = +(
                    this.mark.current.offsetWidth / stepInterval +
                    (markTime + wrapTime)
                ).toFixed(2);
                setProps({
                    value: {
                        startTime,
                        endTime,
                    },
                });
            });

            ev.preventDefault();
            ev.stopPropagation();
        });
    }

    render() {
        let {id, picUrl, step} = this.props;
        let {stepInterval} = this.state;

        //下标
        const Subscript = [];
        for (let i = 0; i < step; i++) {
            Subscript.push(i);
        }
        return (
            <div id={id}>
                <div className="wrap">
                    <div className="wrapImg" ref={this.wrapImg}>
                        <img
                            ref={this.img}
                            src={picUrl}
                            className="img"
                            alt=""
                        />
                        {Subscript.map((item) => (
                            <div
                                key={item}
                                style={{
                                    position: 'absolute',
                                    left: stepInterval * item + 'px',
                                    fontSize: '12px',
                                    bottom: 0,
                                }}
                            >
                                <i
                                    style={{
                                        display: 'block',
                                        height: '5px',
                                        width: '1px',
                                        backgroundColor: '#999',
                                    }}
                                ></i>
                                <span style={{marginLeft: '-50%'}}>
                                    {item}min
                                </span>
                            </div>
                        ))}
                    </div>

                    <i
                        ref={this.mark}
                        className="mark"
                        style={{
                            width: stepInterval + 'px',
                        }}
                    ></i>
                </div>
            </div>
        );
    }
}

MySilder.defaultProps = {};

MySilder.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * A label that will be printed when this component is rendered.
     */

    /**
     * The value displayed in the input.
     */
    picUrl: PropTypes.string,
    /**
     * A label that will be printed when this component is rendered.
     */
    // label: PropTypes.string.isRequired,
    step: PropTypes.number,
    /**
     * The value displayed in the input.
     */
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.array,
    ]),

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,
};
