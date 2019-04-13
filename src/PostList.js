import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = theme => ({
  root: {
    //display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,

  },
  gridList: {
    //width: 1500,
    //height: 450,


  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  createButton:{
  	marginBottom:30,
  },
  gridListItem:{
  	marginBottom:20,
  }
});

 
class TitlebarGridList extends Component{
	
	constructor(props){
	    super(props);
	    this.state = {
	      	postList: [],
	      	editId:''
	    }

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
	    let storedPost = [];
	    if (localStorage.hasOwnProperty('posts')) {
	      storedPost = JSON.parse(localStorage.getItem('posts'));
	    }
	    this.props.loadPostFromStorage(storedPost);
  	}

  	saveStateToLocalStorage() {
	    localStorage.setItem('posts', JSON.stringify(this.props.posts));
	}

  	

  	handleEdit(id){
  		this.setState({'editId':id})
  	}

  	handleDelete(id){
  		this.props.deletePost(id);
  	}

	render() {
	  const { classes } = this.props;

	  	if (this.state.editId !== '') {
	      	return <Redirect to={`/post/${this.state.editId}/edit`} />
    	}

	  return (
	  	<div>
		  	
		  	<div className={classes.createButton}>
		    	<Link style={{ textDecoration: 'none' }} to='/post/create'><Button variant="contained" color="primary">Create Post</Button></Link>
		    </div>

	    <div className={classes.root}>
	    

	      <GridList cellHeight={500} className={classes.gridList}>
	        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
	          <ListSubheader component="div">Post List</ListSubheader>
	        </GridListTile>
	        {this.props.posts.map((tile,index) => (
	          <GridListTile key={index} className={classes.gridListItem}>
	            <img src={tile.file} alt={tile.title} />
	            <GridListTileBar
	              title={tile.title}
	              subtitle={<span>Description: {tile.description}</span>}
	              actionIcon={
	              	<div style={{width:"100px"}}>
	                <IconButton onClick={() => this.handleEdit(tile.id)} className={classes.icon}>
	                  <EditIcon  />
	                </IconButton>

	                <IconButton onClick={() => this.handleDelete(tile.id)} className={classes.icon}>
	                  <DeleteIcon  />
	                </IconButton>
	                </div>
	              }
	            />
	          </GridListTile>
	        ))}
	      </GridList>
	    </div>
	    </div>
	  );
	}	
} 



TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}


const mapDispatchToProps = dispatch => {
  return {
    deletePost: (id) => dispatch({ type: 'DELETEPOST' , payload:id}),
    reset: () => dispatch({ type: 'RESET'}),
    loadPostFromStorage: (posts) => dispatch({ type: 'LOADPOST' , payload:posts}),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TitlebarGridList));


//export default withStyles(styles)(TitlebarGridList);