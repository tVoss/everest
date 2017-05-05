import * as React from 'react';

import TextField from 'material-ui/TextField';

import {BLACK, GREEN} from '../../core/colors';
import { Data, DataType, ListData, StringData } from '../../core/models'

interface Props {
    // List data to display
    data: StringData
    // Callback to add to the list
    mutateString: (data: StringData) => void
}

interface State {
    value: string
    editing: boolean
}

const InputStyle = {
    backgroundColor: BLACK,
    fontSize: '1em',
    color: GREEN,
    textDecoration: 'underline',
    border: 'none'
}

const SpanStyle = {
    fontSize: '1em',
    color: GREEN
}

export default class StringBuilder extends React.Component<Props, State> {

    private input;

    constructor(props: Props) {
        super(props)

        this.state = {
            value: props.data.value,
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
                    <span style={SpanStyle} className="clickable" onClick={this.onDataClick}>
                        "
                        {this.props.data.value}
                        "
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
            this.props.mutateString(new StringData(this.state.value));
        }
    }


}
