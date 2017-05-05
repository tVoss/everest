import * as React from 'react';

import TextField from 'material-ui/TextField';
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

export default class StringBuilder extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            value: props.data.value,
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
