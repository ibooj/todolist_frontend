import React from 'react';
import Folder from 'material-ui-icons/Folder';
import Add from 'material-ui-icons/Add';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog';
import Moment from 'moment';


class TaskList extends React.Component {
    constructor() {
        super();
        this.state = {addDialogStatus: false};
    }

    componentWillMount() {
        this.props.loadTasks();
    }

    handleAddDialogOpen() {
        this.setState({addDialogStatus: true});
    }

    handleAddDialogClose() {
        this.setState({addDialogStatus: false});
        this.props.cleanErrorMessage();
    }

    handleSaveNewTaskList() {
        this.props.addTask(this.taskNameInput.value).then(response => {
            if (response.value.status === 201) {
                this.handleAddDialogClose();
                this.props.history.push(`/task/${response.value.data.id}`);
            }
        });
    }

    render() {
        const {tasks, history, errorResponse} = this.props;
        return (
            <div>
                <List>
                    {tasks.map(task => {
                        return (
                            <ListItem button key={task.id} onClick={() => {
                                history.push(`/task/${task.id}`)
                            }}>
                                <ListItemIcon>
                                    <Folder/>
                                </ListItemIcon>
                                <ListItemText primary={task.name} secondary={Moment(task.date_create).format('LL')}/>
                            </ListItem>
                        )
                    })}
                    <ListItem button key={'create_new_list'} onClick={this.handleAddDialogOpen.bind(this)}>
                        <ListItemIcon>
                            <Add/>
                        </ListItemIcon>
                        <ListItemText primary={'Create new list'}/>
                    </ListItem>
                </List>
                <Dialog open={this.state.addDialogStatus} onRequestClose={this.handleAddDialogClose.bind(this)}>
                    <DialogTitle>Add new List</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Type name new task.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            inputRef={(input) => this.taskNameInput = input}
                            error={errorResponse.error}
                            helperText={errorResponse.error && errorResponse.response.name[0] || ' '}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAddDialogClose.bind(this)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSaveNewTaskList.bind(this)} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default TaskList;