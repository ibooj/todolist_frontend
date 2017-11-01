import React from 'react';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Input from 'material-ui/Input';
import AddIcon from 'material-ui-icons/Add';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';


class SubTaskList extends React.Component {
    constructor() {
        super();
        this.state = {
            addDialogStatus: false,
            deleteDialogStatus: false,
            deletingObject: null,
            updatingObject: null,
            inputNameListStatus: [],
            snackbarStatus: false
        };
        this.inputNameList = [];
    }

    componentWillReceiveProps(nextProps) {
        const {sub_tasks: tasks = []} = nextProps.currentTask || [];
        tasks.forEach(o => {
            this.state.inputNameListStatus[o.id] = true;
        });
        if (this.state.deletingObject) {
            this.inputNameList[this.state.deletingObject.id].blur();
        }
    }

    handleTaskStatus(task, e) {
        this.props.updateSubTask({id: task.id, status: e.target.checked});
    }

    handleAddDialogOpen() {
        this.setState({addDialogStatus: true});
    }

    handleAddDialogClose() {
        this.setState({addDialogStatus: false});
        this.props.cleanErrorMessage();
    }

    handleDeleteDialogOpen(task) {
        this.setState({deletingObject: task});
        this.setState({deleteDialogStatus: true});
    }

    handleDeleteDialogClose() {
        this.setState({deleteDialogStatus: false});
    }

    handleDeleteDialogOk() {
        this.props.deleteSubTask(this.state.deletingObject).then(response => {
            if (response.value.status === 204) {
                this.handleDeleteDialogClose();
            }
        });
    }

    handleSaveNewSubTask() {
        this.props.addSubTask(this.subTaskNameInput.value, this.props.currentTask).then(response => {
            if (response.value.status === 201) {
                this.handleAddDialogClose();
            }
        });
    }

    handleEditSubTask(task) {
        const {inputNameListStatus} = this.state;
        inputNameListStatus[task.id] = false;
        this.setState({inputNameListStatus, deletingObject: task}, () => {
            this.inputNameList[task.id].focus();
        });
    }

    handleCancelEditSubTask(task) {
        const {inputNameListStatus} = this.state;
        inputNameListStatus[task.id] = true;
        this.setState({inputNameListStatus, deletingObject: null});
        this.inputNameList[task.id].value = task.name;
    }

    handleKeyPressEditSubTask(task, e) {
        e.persist();
        if (e.key === 'Enter' && e.target.value !== task.name) {
            this.props.updateSubTask({id: task.id, name: e.target.value}).then(response => {
                if (response.value.status === 200) {
                    e.target.blur();
                }
            }).catch(() => {
                this.setState({snackbarStatus: this.props.errorResponse.error});
            });
        }
        else if (e.key === 'Escape' || (e.key === 'Enter' && e.target.value === task.name)) {
            e.target.blur();
        }
    }

    handleRequestClose() {
        this.setState({snackbarStatus: false});
        this.props.cleanErrorMessage();
    }

    render() {
        const {errorResponse, currentTask} = this.props;
        const {sub_tasks: tasks = []} = currentTask || [];
        return (
            <div>
                {this.props.currentTask &&
                <div>
                    <List>
                        {tasks.map(task => (
                            <ListItem
                                key={task.id}
                                dense
                            >
                                <Checkbox
                                    checked={task.status}
                                    onClick={this.handleTaskStatus.bind(this, task)}
                                />
                                <Input
                                    defaultValue={task.name}
                                    type="text"
                                    disabled={this.state.inputNameListStatus[task.id]}
                                    style={{color: 'inherit'}}
                                    inputRef={o => this.inputNameList[task.id] = o}
                                    onBlur={this.handleCancelEditSubTask.bind(this, task)}
                                    onKeyUp={this.handleKeyPressEditSubTask.bind(this, task)}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Edit" onClick={this.handleEditSubTask.bind(this, task)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton aria-label="Delete"
                                                onClick={this.handleDeleteDialogOpen.bind(this, task)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                        <ListItem button key={'create_sub_task'} onClick={this.handleAddDialogOpen.bind(this)}>
                            <Avatar>
                                <AddIcon/>
                            </Avatar>
                            <ListItemText primary={'Create new sub task'}/>
                        </ListItem>
                    </List>
                    <Dialog open={this.state.addDialogStatus} onRequestClose={this.handleAddDialogClose.bind(this)}>
                        <DialogTitle>Add new sub task</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Type name sub task.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name"
                                type="text"
                                fullWidth
                                inputRef={(input) => this.subTaskNameInput = input}
                                error={errorResponse.error}
                                helperText={errorResponse.error && errorResponse.response.name[0] || ' '}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleAddDialogClose.bind(this)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleSaveNewSubTask.bind(this)} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={this.state.deleteDialogStatus}
                            onRequestClose={this.handleDeleteDialogClose.bind(this)}>
                        <DialogTitle>Delete selected sub task?</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {this.state.deletingObject && this.state.deletingObject.name}
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
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        open={this.state.snackbarStatus}
                        autoHideDuration={2500}
                        onRequestClose={this.handleRequestClose.bind(this)}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{errorResponse.error && errorResponse.response.name[0]}</span>}
                    />
                </div>
                }
            </div>
        );
    }
}

export default SubTaskList;