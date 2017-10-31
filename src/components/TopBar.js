import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';


class TopBar extends React.Component {
    constructor() {
        super();
        this.state = {
            deleteDialogStatus: false,
            editDialogStatus: false
        };
    }

    handleDeleteDialogClose() {
        this.setState({deleteDialogStatus: false});
    }

    handleDeleteDialogOk() {
        this.props.deleteTask(this.props.currentTask.id).then(response => {
            if (response.value.status === 204) {
                this.handleDeleteDialogClose();
                this.props.history.push('/');
            }
        });
    }

    handleDeleteDialogOpen() {
        this.setState({deleteDialogStatus: true});
    }

    handleEditDialogOk() {
        this.props.updateTask(this.props.currentTask.id, this.taskNameInput.value).then(response => {
            if (response.value.status === 200) {
                this.handleEditDialogClose();
            }
        });
    }

    handleEditDialogOpen() {
        this.setState({editDialogStatus: true});
    }

    handleEditDialogClose() {
        this.setState({editDialogStatus: false});
    }

    render() {
        const {currentTask, errorResponse} = this.props;
        return (
            <Toolbar style={{justifyContent: 'space-between', paddingRight: '4px', paddingLeft: '33px'}}>
                <Typography type="title" color="inherit" noWrap>
                    {currentTask && currentTask.name || 'Select task list'}
                </Typography>
                {currentTask &&
                <div>
                    <IconButton aria-label="Edit" color="contrast" onClick={this.handleEditDialogOpen.bind(this)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton aria-label="Delete" color="contrast" onClick={this.handleDeleteDialogOpen.bind(this)}>
                        <DeleteIcon/>
                    </IconButton>
                    <Dialog open={this.state.deleteDialogStatus}
                            onRequestClose={this.handleDeleteDialogClose.bind(this)}>
                        <DialogTitle>Delete current task list?</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {currentTask.name}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleDeleteDialogClose.bind(this)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleDeleteDialogOk.bind(this)} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={this.state.editDialogStatus}
                            onRequestClose={this.handleEditDialogClose.bind(this)}>
                        <DialogTitle>Update current task list name?</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                defaultValue={currentTask.name}
                                margin="dense"
                                label="Name"
                                type="text"
                                fullWidth
                                inputRef={(input) => this.taskNameInput = input}
                                error={errorResponse.error}
                                helperText={errorResponse.error && errorResponse.response.name[0] || ' '}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleEditDialogClose.bind(this)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleEditDialogOk.bind(this)} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                }
            </Toolbar>
        );
    }
}

export default TopBar;