import * as React from 'react'
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CommandLine from './command-line';

export default class App extends React.Component<void, void> {


    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div style={{backgroundColor: '#eee'}}>
                    <AppBar
                        title="everest"
                        showMenuIconButton={false}
                        zDepth={0} />
                    <CommandLine />
                </div>
            </MuiThemeProvider>
        );
    }
}
