export default function Post(posts = [], action) {
  switch (action.type) {
    case 'ADDPOST':
      
    	const newPost = [
	        ...posts,
	        {
	          id: 1 + Math.random(),
	          title: action.payload.title,
	          description: action.payload.description,
	          file: action.payload.file,
	        }
	      ];
        return newPost;
    case 'DELETEPOST':
        return posts.filter((item) => item.id !== action.payload);
    case 'RESET':
        return [];
    case 'LOADPOST':
        return action.payload ;
    case 'UPDATEPOST':

    	const objIndex = posts.findIndex(obj => obj.id === action.payload.id);
		const updatedPost = { 
			...posts[objIndex], 
			title: action.payload.title,
          	description: action.payload.description
		};

		if(action.payload.file.length){
			updatedPost.file = action.payload.file;
		}

		const updatedPosts = [
		  ...posts.slice(0, objIndex),
		  updatedPost,
		  ...posts.slice(objIndex + 1),
		];

		return updatedPosts;
    default:
      return posts
  }
}