import React from 'react';
import Typography from 'material-ui/Typography';

class AboutPage extends React.Component {
    render() {
        return (
            <div style={{padding: 16}}>
                <Typography type="headline">About</Typography>
                <p>This is about page</p>
            </div>
        )
    }
}

export default AboutPage;
