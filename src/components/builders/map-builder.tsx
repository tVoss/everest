import * as React from 'react';

import ListBuilder from './list-builder'
import NumberBuilder from './number-builder'
import StringBuilder from './string-builder';
import { Data, DataType, MapData, StringData, NumberData, ListData } from '../../core/models'


interface Props {
    // List data to display
    map: MapData
    // Callback to add to the list
    mutateMap: (map: MapData) => void
}

interface State {

}

export default class MapBuilder extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

    }

    render() {

        return (
            <div className="builder">
                {"{"}
                    {this.props.map.keys.map(this.renderData)}
                    <span className="clickable" onClick={this.onAddClicked}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </span>
                {"}"}
            </div>
        )
    }

    renderData = (data: Data, index: number) => {
        const key = data.dataType === DataType.Number
            ? <NumberBuilder data={data as NumberData} mutateNumber={n => this.mutateKey(index, n)} />
            : <StringBuilder data={data as StringData} mutateString={s => this.mutateKey(index, s)} />

        let value;
        switch (this.props.map.values[index].dataType) {
            case DataType.Number:
                value = <NumberBuilder data={data as NumberData} mutateNumber={n => this.mutateValue(index, n)} />
                break;
            case DataType.String:
                value = <StringBuilder data={data as StringData} mutateString={s => this.mutateValue(index, s)} />
                break;
            case DataType.List:
                value = <ListBuilder list={data as ListData} mutateList={l => this.mutateValue(index, l)} />
                break;
            case DataType.Map:
                value = <MapBuilder map={data as MapData} mutateMap={m => this.mutateValue(index, m)} />
        }

        return (
            <span>
                {key}:{value}
            </span>
        )
    }

    mutateKey = (index: number, data: NumberData | StringData) => {
        // Does the key already exist?
        if (this.props.map.keys.map(k => k.value).indexOf(data.value) > -1) {
            return;
        }

        const {map} = this.props;
        map.keys[index] = data;
        this.props.mutateMap(map);
    }

    mutateValue = (index: number, data: Data) => {
        const {map} = this.props;
        map.values[index] = data;
        this.props.mutateMap(map);
    }

    onAddClicked = () => {

    }

}
