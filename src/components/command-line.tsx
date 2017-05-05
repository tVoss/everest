import * as React from 'react';

import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'

import { Data, ListData } from '../core/models';

import ListBuilder from './builders/list-builder'

enum BuilderType {
    ListBuilder
}

interface Props {

}

interface State {
    data: { [id: number]: Data }
    commands: { [id: number]: BuilderType }
    index: number
}

const LineStyle = {
    margin: "5px",
    padding: "5px",
    backgroundColor: "#332B27"
}

export default class CommandLine extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            data: {},
            commands: {},
            index: 0
        }
    }

    render() {
        const { commands } = this.state;
        const br = this.state.index > 0;

        return (
            <div>
                { Object.keys(commands).map(this.renderCommands) }
                <SelectField floatingLabelText="+" autoWidth={true}>
                    <MenuItem value={BuilderType.ListBuilder} primaryText="String" />
                    <MenuItem value={BuilderType.ListBuilder} primaryText="Number" />
                    <MenuItem value={BuilderType.ListBuilder} primaryText="List" />
                    <MenuItem value={BuilderType.ListBuilder} primaryText="Map" />
                </SelectField>
            </div>
        )
    }

    renderCommands = (index: string) => {
        const i = Number(index);
        return (
            <Paper key={index} style={LineStyle}>
                <ListBuilder
                    list={this.state.data[i] as ListData}
                    mutateList={d => this.mutateData(d, i)} />
            </Paper>
        )
    }

    onAddClicked = () => {
        const data = new ListData([]);
        const index = this.state.index;
        const command  = BuilderType.ListBuilder;

        const state = this.state;
        state.data[index] = data;
        state.commands[index] = command;
        state.index++;

        this.setState(state);
    }

    mutateData = (data: Data, index: number) => {
        const state = this.state;
        state.data[index] = data;
        this.setState(state);
    }
}
