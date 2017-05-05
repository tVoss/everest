import * as React from 'react';

import MapBuilder from './map-builder';
import StringBuilder from './string-builder';
import { Data, DataType, ListData, MapData, StringData, NumberData } from '../../core/models'

import BuilderMenu, {BuilderType} from './builder-menu';

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
                    <BuilderMenu onBuilderSelected={this.onAddBuilder} />
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

    onAddBuilder = (builder: BuilderType) => {
        const { list } = this.props;
        switch (builder) {
            case BuilderType.NumberBuilder:
                list.values.push(new NumberData(0));
                break;
            case BuilderType.StringBuilder:
                list.values.push(new StringData("String"));
                break;
            case BuilderType.ListBuilder:
                list.values.push(new ListData([]));
                break;
            case BuilderType.MapBuilder:
                list.values.push(new MapData([], []));
        }
        this.props.mutateList(list);
    }

}
