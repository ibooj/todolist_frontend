import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ExitToApp from 'material-ui-icons/ExitToApp';
import Description from 'material-ui-icons/Description';
import {withStyles} from 'material-ui/styles';
import {styles} from './AppStyles';
import {
    addSubTask,
    addTask,
    deleteSubTask,
    deleteTask,
    loadTasks,
    updateSubTask,
    updateTask,
    cleanErrorMessage
} from '../actions/task';
import {logoutUser} from '../actions/user';
import TaskList from "../components/TaskList";
import TopBar from "../components/TopBar";
import SubTaskList from "../components/SubTaskList";


class App extends React.Component {
    render() {
        const {classes, history, logoutUser} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classes.appBar}>
                        <TopBar {...this.props}/>
                    </AppBar>
                    <Drawer
                        type="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader} style={{
                            justifyContent: 'center', paddingLeft: 16,
                            alignItems: 'flex-start', display: 'flex', flexDirection: 'column'
                        }}>
                            <Typography type="headline">Task List</Typography>
                        </div>
                        <Divider/>

                        <TaskList {...this.props}/>

                        <Divider/>
                        <List>
                            <ListItem button onClick={() => {
                                history.push('/about');
                            }}>
                                <ListItemIcon>
                                    <Description/>
                                </ListItemIcon>
                                <ListItemText primary="About"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                logoutUser();
                                history.push('/');
                            }}>
                                <ListItemIcon>
                                    <ExitToApp/>
                                </ListItemIcon>
                                <ListItemText primary="Log out"/>
                            </ListItem>
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <SubTaskList {...this.props}/>
                    </main>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {tasks, response, error} = state.taskReducer;
    const {id} = ownProps.match.params;
    return {
        tasks,
        currentTask: tasks.find(task => task.id === Number(id)),
        errorResponse: {response, error}
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTasks: bindActionCreators(loadTasks, dispatch),
        addTask: bindActionCreators(addTask, dispatch),
        deleteTask: bindActionCreators(deleteTask, dispatch),
        updateTask: bindActionCreators(updateTask, dispatch),
        addSubTask: bindActionCreators(addSubTask, dispatch),
        deleteSubTask: bindActionCreators(deleteSubTask, dispatch),
        updateSubTask: bindActionCreators(updateSubTask, dispatch),
        cleanErrorMessage: bindActionCreators(cleanErrorMessage, dispatch),
        logoutUser: bindActionCreators(logoutUser, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));