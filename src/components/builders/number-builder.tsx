import * as React from 'react';

import TextField from 'material-ui/TextField';
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
            let ref;
            const input = <TextField
                name="string-edit"
                style={{width: '50px'}}
                value={this.state.value}
                ref={input => input && input.focus()}
                onChange={this.onDataEdit}
                onKeyDown={this.onDataEnter} />

            return (
                <div className="builder">
                    {input}
                </div>
            )
        } else {
            return (
                <div className="builder">
                    <span className="clickable"
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
