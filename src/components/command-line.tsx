import * as React from 'react';

import Paper from 'material-ui/Paper'
import { Data, StringData, NumberData, ListData, MapData } from '../core/models';

import BuilderMenu from './builders/builder-menu';
import { BuilderType } from './builders/builder-menu';
import ListBuilder from './builders/list-builder'
import NumberBuilder from './builders/number-builder'
import MapBuilder from './builders/map-builder'
import StringBuilder from './builders/string-builder'



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
    position: 'relative',
    backgroundColor: "#332B27"
}

const ResultStyle = {
    position: 'absolute',
    bottom: '5px',
    right: '5px'
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
                <BuilderMenu onBuilderSelected={this.addCommand} />
            </div>
        )
    }

    renderCommands = (index: string) => {
        const i = Number(index);

        let builder;
        switch (this.state.commands[i]) {
            case BuilderType.StringBuilder:
                builder = <StringBuilder
                            data={this.state.data[i] as StringData}
                            mutateString={s => this.mutateData(s, i)} />
                break;
            case BuilderType.NumberBuilder:
                builder = <NumberBuilder
                            data={this.state.data[i] as NumberData}
                            mutateNumber={n => this.mutateData(n, i)} />
                break;
            case BuilderType.ListBuilder:
                builder = <ListBuilder
                            list={this.state.data[i] as ListData}
                            mutateList={l => this.mutateData(l, i)} />
                break;
            case BuilderType.MapBuilder:
                builder = <MapBuilder
                            map={this.state.data[i] as MapData}
                            mutateMap={m => this.mutateData(m, i)} />;
                break;
        }

        return (
            <Paper key={index} style={LineStyle}>
                <span>{index}:</span>
                {builder}
                <div style={ResultStyle}>
                    {this.state.data[i].toString()}
                </div>
            </Paper>
        )
    }

    addCommand = (builder: BuilderType) => {
        const state = this.state;
        state.commands[state.index] = builder;
        switch (builder) {
            case BuilderType.StringBuilder:
                state.data[state.index] = new StringData("");
                break;
            case BuilderType.NumberBuilder:
                state.data[state.index] = new NumberData(0);
                break;
            case BuilderType.ListBuilder:
                state.data[state.index] = new ListData([]);
                break;
            case BuilderType.MapBuilder:
                state.data[state.index] = new MapData([], []);
                break;
        }
        state.index++;

        this.setState(state);
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
