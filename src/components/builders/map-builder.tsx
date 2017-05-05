import * as React from 'react';

import BuilderMenu, { BuilderType } from './builder-menu';
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
                <span>{"{"}</span>
                    {this.props.map.keys.map(this.renderData)}
                    <BuilderMenu onBuilderSelected={this.onAddBuilder}/>
                <span>{"}"}</span>
            </div>
        )
    }

    renderData = (data: Data, index: number) => {
        let value;
        const dataVal = this.props.map.values[index];
        switch (dataVal.dataType) {
            case DataType.Number:
                value = <NumberBuilder data={dataVal as NumberData} mutateNumber={n => this.mutateValue(index, n)} />
                break;
            case DataType.String:
                value = <StringBuilder data={dataVal as StringData} mutateString={s => this.mutateValue(index, s)} />
                break;
            case DataType.List:
                value = <ListBuilder list={dataVal as ListData} mutateList={l => this.mutateValue(index, l)} />
                break;
            case DataType.Map:
                value = <MapBuilder map={dataVal as MapData} mutateMap={m => this.mutateValue(index, m)} />
        }

        return (
            <span>
                <StringBuilder
                    data={data as StringData}
                    mutateString={s => this.mutateKey(index, s)} />
                :{value}
            </span>
        )
    }

    mutateKey = (index: number, data: StringData) => {
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

    onAddBuilder = (builder: BuilderType) => {
        const {map} = this.props;
        let keyno = 0;
        while (map.keys.map(k => k.value).indexOf(`key${keyno}`) > -1) {
            keyno++;
        }
        map.keys.push(new StringData(`key${keyno}`));
        switch (builder) {
            case BuilderType.NumberBuilder:
                map.values.push(new NumberData(0));
                break;
            case BuilderType.StringBuilder:
                map.values.push(new StringData(""));
                break;
            case BuilderType.ListBuilder:
                map.values.push(new ListData([]));
                break;
            case BuilderType.MapBuilder:
                map.values.push(new MapData([], []));
        }
        this.props.mutateMap(map);
    }

}
