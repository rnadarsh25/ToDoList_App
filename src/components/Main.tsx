import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  OutlinedInput,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
  mainContainer: {
    width: '500px',
    height: '500px',
    padding: '5px',
    position: 'absolute',
    left: '23em',
    top: '10em',
  },
  headingTypo: {
    textAlign: 'center',
    margin: '1em',
  },
  noTypo: {
    fontSize: '18px',
    margin: '1em',
  },
}));

function Main() {
  const [toDo, setToDo] = useState('');
  const [allToDo, setAllToDo] = useState<string[]>([]);

  const classes = useStyles();

  useEffect(() => {
    setAllToDo(JSON.parse(localStorage.getItem('tasks')!));
  }, []);

  const handleChange = (e: any) => {
    setToDo(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let allTasks: string[];
    if (localStorage.getItem('tasks') === null) {
      allTasks = [];
    } else {
      allTasks = JSON.parse(localStorage.getItem('tasks')!);
    }

    allTasks.push(toDo);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    setAllToDo(allTasks);
    console.log(toDo);
  };

  const handleDelete = (id: number) => {
    console.log(id);
    let allTasks: string[];
    if (localStorage.getItem('tasks') !== null) {
      allTasks = JSON.parse(localStorage.getItem('tasks')!);
      allTasks.forEach((task: string, index: number) => {
        if (index === id) {
          allTasks.splice(index, 1);
        }
      });
      localStorage.setItem('tasks', JSON.stringify(allTasks));
      setAllToDo(allTasks);
    }
  };

  return (
    <Grid container className={classes.mainContainer}>
      <Grid item xs={12}>
        <Paper variant="outlined" square>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="h3"
                className={classes.headingTypo}
              >
                To do List
              </Typography>
              <form onSubmit={handleSubmit}>
                <OutlinedInput
                  onChange={handleChange}
                  value={toDo}
                  fullWidth
                  type="text"
                  placeholder="add new todo..."
                  endAdornment={
                    <Button type="submit" variant="contained" color="primary">
                      Add
                    </Button>
                  }
                />
              </form>
            </Grid>
            <Grid item xs={12}>
              <List>
                {allToDo.length > 0 ? (
                  allToDo.map((task: string, index: number) => (
                    <ListItem button key={index}>
                      <ListItemText primary={task} />
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => handleDelete(index)}>
                          <CloseIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                ) : (
                  <Typography className={classes.noTypo}>
                    Add your first task:)
                  </Typography>
                )}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default Main;
