import * as React from 'react';

import MapBuilder from './map-builder';
import StringBuilder from './string-builder';
import { Data, DataType, ListData, MapData, StringData } from '../../core/models'


interface Props {
    // List data to display
    list: ListData
    // Callback to add to the list
    mutateList: (list: ListData) => void
}

interface State {

}

export default class ListBuilder extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

    }

    render() {
        return (
            <div className="builder">
                [
                    {this.props.list.values.map(this.renderData)}
                    <span className="clickable" onClick={this.onAddClicked}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </span>
                ]
            </div>
        )
    }

    renderData = (data: Data, index: number) => {
        switch (data.dataType) {
            case DataType.String:
                return <StringBuilder
                            key={index}
                            data={data as StringData}
                            mutateString={s => this.mutateData(index, s)} />
            case DataType.List:
                return <ListBuilder
                            key={index}
                            list={data as ListData}
                            mutateList={l => this.mutateData(index, l)} />
            case DataType.Map:
                return <MapBuilder
                            key={index}
                            map={data as MapData}
                            mutateMap={m => this.mutateData(index, m)} />
            default:
                return data.toString();
        }
    }

    mutateData = (index: number, data: Data) => {
        const list = this.props.list;
        list.values[index] = data;
        this.props.mutateList(list);
    }

    onAddClicked = () => {
        const list = this.props.list;
        const input = prompt("Enter Value", "Blah");
        if (input === "list") {
            list.values.push(new ListData([]));
        } else if (input === "map") {
            list.values.push(new MapData([], []));
        } else {
            list.values.push(new StringData(input));
        }
        this.props.mutateList(list);
    }

}
