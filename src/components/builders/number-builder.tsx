import * as React from 'react';

import {BLACK, ORANGE} from '../../core/colors';
import { Data, DataType, NumberData } from '../../core/models'

interface Props {
    // List data to display
    data: NumberData
    // Callback to add to the list
    mutateNumber: (data: NumberData) => void
}

interface State {
    value: string
    editing: boolean
}

const InputStyle = {
    backgroundColor: BLACK,
    fontSize: '1em',
    color: ORANGE,
    textDecoration: 'underline',
    border: 'none'
}

const SpanStyle = {
    color: ORANGE,
    fontSize: '1em'
}

export default class NumberBuilder extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            value: String(props.data.value),
            editing: false
        }
    }

    render() {
        if (this.state.editing) {
            const width = this.state.value.length * 10;
            const style = {
                ...InputStyle,
                width: `${width}px`
            }

            return (
                <div className="builder">
                    <input
                        style={style}
                        value={this.state.value}
                        ref={ref => ref && ref.focus()}
                        onChange={this.onDataEdit}
                        onKeyDown={this.onDataEnter} />
                </div>
            )
        } else {
            return (
                <div className="builder">
                    <span style={SpanStyle} className="clickable"
                        onClick={this.onDataClick}>
                        {this.props.data.value}
                    </span>
                </div>
            )
        }
    }

    onDataClick = () => {
        this.setState({
            ...this.state,
            editing: true
        });
    }

    onDataEdit = (e) => {
        if (isNaN(e.target.value)) {
            return;
        }

        this.setState({
            ...this.state,
            value: e.target.value
        })
    }

    onDataEnter = (e) => {
        // Enter
        if (e.keyCode === 13) {
            this.setState({
                ...this.state,
                editing: false
            });
            this.props.mutateNumber(new NumberData(Number(this.state.value)));
        }
    }


}
