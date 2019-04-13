import React, { Component } from "react";
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import ResetIcon from '@material-ui/icons/History';
import DeleteIcon from '@material-ui/icons/Delete';


class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: ""
    };
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    let storedList = [];
    if (localStorage.hasOwnProperty('list')) {
      storedList = JSON.parse(localStorage.getItem('list'));
    }
    this.props.loadTodoFromStorage(storedList);
  }

  saveStateToLocalStorage() {
    localStorage.setItem('list', JSON.stringify(this.props.list));
  }

  updateInput(key, value) {
    this.setState({ [key]: value });
  }


  render() {
    return (
      <div className="Todo">
        <div
          style={{
            padding: 50,
            textAlign: "left",
            maxWidth: 500,
            margin: "auto"
          }}
        >
          Add an item to the list
          <br />
          <input
            type="text"
            placeholder="Type item here"
            value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}
          />
          
          <IconButton 
            title="Add"
            onClick={() => this.props.addTodo(this.state.newItem)}
            disabled={!this.state.newItem.length}
            color="primary"
          >
            <AddCircle />
          </IconButton>


          <IconButton 
            title="Reset"
            onClick={() => this.props.reset()}
            color="primary"
          >
            <ResetIcon />
          </IconButton>


          <br /> <br />
          <table>
          <tbody>
            {this.props.list.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.value}</td>
                  <td>
                  <IconButton 
                    title="Delete"
                    onClick={() => this.props.deleteTodo(item.id)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
          </table>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    list: state.todos
  }
}


const mapDispatchToProps = dispatch => {
  return {
    addTodo: (value = "") => dispatch({ type: 'ADDTODO' , payload:value}),
    deleteTodo: (id) => dispatch({ type: 'DELETETODO' , payload:id}),
    reset: () => dispatch({ type: 'RESET'}),
    loadTodoFromStorage: (list) => dispatch({ type: 'LOADTODO' , payload:list}),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Todo);