import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';



const styles = theme => ({
  table: {
    minWidth: 700,
    maxHeight: 500
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  fileInput:{
  	marginBottom:theme.spacing.unit * 2,
  	marginTop:theme.spacing.unit,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    height: 500
  },
  actionButton:{
    cursor:"pointer"
  }
});



class PostForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      title:'',
      description:'',
      image:'',
      mode: 'create',
      editId: '',
      submitButtonText:'Submit',
      redirect_:false,
      selectedFile:''
    };


    this.handleSubmit = this.handleSubmit.bind(this);

  }


  componentDidMount(){

    const { postId } = this.props.match.params;
    if(postId){
        let editItem = this.props.posts.filter((item) => item.id == postId)[0];
        this.props.editPost(postId)
        this.setState({"mode":"update","editId":editItem.id,"title":editItem.title,"description":editItem.description})
    }
  }

  handleSubmit() {

    
    if(this.state.mode === "update"){
      this.props.updatePost({"id":this.state.editId, "title":this.state.title, "description": this.state.description, "file": this.state.selectedFile })
    }else{
      this.props.addPost({"title":this.state.title, "description": this.state.description, "file": this.state.selectedFile })
    }

    this.saveStateToLocalStorage();
    this.setState({redirect_:true});

  }

  saveStateToLocalStorage() {
      localStorage.setItem('posts', JSON.stringify(this.props.posts));
  }

  handleChange(attr,val) {
    
    if(attr === 'description'){
    	this.setState({
	      description: val
	    })	
    }else if(attr === 'title'){
    	this.setState({
	      title: val
	    })	
    }

    
  }

  getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
  }

  handleselectedFile = event => {

    const file = event.target.files[0];
    this.getBase64(file).then(base64 => {
      
      this.setState({
        selectedFile: base64,
        loaded: 0,
      })

    });

    
  }
  
  

  render() {

  	if (this.state.redirect_ === true) {
      return <Redirect to='/post' />
    }

    const { classes } = this.props;

    return(
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
        <div>
        <TextValidator
          label="Title"
          className={classes.textField}
          value={this.state.title}
          onChange={(e) => { this.handleChange('title',e.target.value)} }
          margin="normal"
          validators={['required']} //, 'isEmail'
          errorMessages={['this field is required', 'email is not valid']}

        />
        </div>

        <div>
        <TextValidator
          label="Description"
          className={classes.textField}
          value={this.state.description}
          onChange={(e) => { this.handleChange('description',e.target.value)} }
          margin="normal"
          rows={4}
          rowsMax={10}
          multiline={true}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        </div>

        <div>
        <input
		  accept="image/*"
		  className={classes.fileInput}
		  id="raised-button-file"
		  multiple
		  type="file"
		  onChange={this.handleselectedFile} 
		/>
		</div>

        {/*
        <div>
          <Button variant="contained" color="primary" onClick={() => { this.handleSubmit()} } > { this.state.submitButtonText } </Button>
        </div>
      */}
        <Button variant="contained" color="primary" type="submit">Submit</Button>
    </ValidatorForm>
    </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    editItem: state.editItem,
    posts: state.posts
  }
}


const mapDispatchToProps = dispatch => {
  return {
    addPost: (post = "") => dispatch({ type: 'ADDPOST' , payload:post}),
    updatePost: (post) => dispatch({ type: 'UPDATEPOST' , payload:post}),
    editPost: (postId) => dispatch({ type: 'EDITPOST' , payload:postId}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostForm));
//export default withStyles(styles)(PostForm);