import React, { Component, lazy } from 'react';
import { Route } from "react-router-dom";
import MyLoadingComponent from './MyLoadingComponent';


const AsyncPostForm = lazy(() => import('./PostForm.js'));
const AsyncPostList = lazy(() => import('./PostList.js'));

class Post extends Component {

  render() {
    return(
      <div>
        
        <div>
        	<Route path='/post/create' component={AsyncPostForm} />
          <Route path='/post/:postId/edit' component={AsyncPostForm} />
        	<Route exact path='/post' component={AsyncPostList} />
    	</div>
    </div>
    )
  }
}

export default Post;
