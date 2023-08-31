import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
document.body.style.background = "#f5f5f5";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [add_dialog, setAddDialog] = useState(false);
  const [edit_dialog, setEditDialog] = useState(false);
  const [edit_id, setEditId] = useState(0);
  const [todo_text, setTodoText] = useState("");
  const [update_text, setUpdateText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const add_dialog_open = () => {
    setAddDialog(true);
  };

  const add_dialog_close = () => {
    setAddDialog(false);
  };

  const edit_dialog_open = (id) => {
    setEditDialog(true);
    setUpdateText(todos.find((todo) => todo.id === id).text);
    setEditId(id);
  };

  const edit_dialog_close = () => {
    setEditDialog(false);
  };

  function add_todo() {
    if (todo_text === "") {
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: todo_text,
      done: false,
    };
    setTodos([...todos, newTodo]);
    setTodoText("");
  }

  function edit_todo(id) {
    if (update_text === "") {
      return;
    }
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: update_text };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditDialog(false);
  }

  function delete_todo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  const checkbox_toggle = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Button
          onClick={add_dialog_open}
          variant="contained"
          sx={{ marginTop: "56px", marginBottom: "64px" }}
        >
          Add Todo
        </Button>
        <Card sx={{ minWidth: 390, maxWidth: 1000 }}>
          <TableContainer>
            <Table size="small">
              <TableBody>
                {todos.map((todo) => (
                  <TableRow key={todo.text}>
                    <TableCell>
                      <Checkbox
                        sx={{ marginRight: "-50px", marginBottom: "1px" }}
                        onChange={() => checkbox_toggle(todo.id)}
                        checked={todo.done}
                      />
                    </TableCell>
                    <TableCell>{todo.text}</TableCell>
                    <TableCell sx={{ width: "0px" }} align="right">
                      <IconButton
                        onClick={() => edit_dialog_open(todo.id)}
                        color="primary"
                      >
                        <EditNoteOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ width: "0px" }} align="right">
                      <IconButton
                        onClick={() => delete_todo(todo.id)}
                        color="primary"
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
      <Dialog open={add_dialog} onClose={add_dialog_close}>
        <Grid
          sx={{ width: "400px" }}
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <DialogTitle
            sx={{
              textAlign: "center",
              fontSize: "1.5rem",
              marginTop: "20px",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {"Add Todo"}
          </DialogTitle>
          <TextField
            sx={{ width: "344px", margin: "28px" }}
            value={todo_text}
            onChange={(e) => setTodoText(e.target.value)}
            variant="filled"
          />
        </Grid>
        <DialogActions>
          <Button onClick={add_todo}>Add</Button>
          <Button onClick={add_dialog_close} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={edit_dialog} onClose={edit_dialog_close}>
        <Grid
          sx={{ width: "400px" }}
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <DialogTitle
            sx={{
              textAlign: "center",
              fontSize: "1.5rem",
              marginTop: "20px",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {"Edit Todo"}
          </DialogTitle>
          <TextField
            sx={{ width: "344px", margin: "28px" }}
            value={update_text}
            onChange={(e) => setUpdateText(e.target.value)}
            variant="filled"
          />
        </Grid>
        <DialogActions>
          <Button onClick={() => edit_todo(edit_id)}>Edit</Button>
          <Button onClick={edit_dialog_close} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;