import * as React from 'react'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import MenuItem from 'material-ui/MenuItem'

interface Props {
    onBuilderSelected: (builder: BuilderType) => void
}

interface State {

}

export enum BuilderType {
    StringBuilder,
    NumberBuilder,
    ListBuilder,
    MapBuilder
}

export default class BuilderMenu extends React.Component<Props, State> {

    render() {
        return (
            <IconMenu
                iconButtonElement={<IconButton><AddCircleOutline /></IconButton>}
                onItemTouchTap={this.onItemSelected}>
                <MenuItem value={BuilderType.StringBuilder} primaryText="String" />
                <MenuItem value={BuilderType.NumberBuilder} primaryText="Number" />
                <MenuItem value={BuilderType.ListBuilder} primaryText="List" />
                <MenuItem value={BuilderType.MapBuilder} primaryText="Map" />
            </IconMenu>
        );
    }

    onItemSelected = (event, child) => {
        this.props.onBuilderSelected(child.props.value);
    }
}
