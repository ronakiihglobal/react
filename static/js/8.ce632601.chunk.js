(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{313:function(t,e,i){"use strict";i.r(e);var a=i(41),n=i(42),s=i(45),r=i(43),o=i(44),l=i(26),d=i(0),c=i.n(d),u=i(70),p=i(25),h=i(54),m=i(254),f=i.n(m),g=i(264),v=function(t){function e(t){var i;return Object(a.a)(this,e),(i=Object(s.a)(this,Object(r.a)(e).call(this,t))).getBase64=function(t){return new Promise(function(e,i){var a=new FileReader;a.onload=function(){return e(a.result)},a.onerror=function(t){return i(t)},a.readAsDataURL(t)})},i.handleselectedFile=function(t){var e=t.target.files[0];i.getBase64(e).then(function(t){i.setState({selectedFile:t,loaded:0})})},i.state={title:"",description:"",image:"",mode:"create",editId:"",submitButtonText:"Submit",redirect_:!1,selectedFile:""},i.handleSubmit=i.handleSubmit.bind(Object(l.a)(Object(l.a)(i))),i}return Object(o.a)(e,t),Object(n.a)(e,[{key:"componentDidMount",value:function(){var t=this.props.match.params.postId;if(console.log(t),t){console.log(this.props);var e=this.props.posts.filter(function(e){return e.id==t})[0];console.log(e),this.props.editPost(t),this.setState({mode:"update",editId:e.id,title:e.title,description:e.description})}}},{key:"handleSubmit",value:function(){"update"===this.state.mode?(console.log("update"),this.props.updatePost({id:this.state.editId,title:this.state.title,description:this.state.description,file:this.state.selectedFile})):this.props.addPost({title:this.state.title,description:this.state.description,file:this.state.selectedFile}),this.saveStateToLocalStorage(),this.setState({redirect_:!0})}},{key:"saveStateToLocalStorage",value:function(){localStorage.setItem("posts",JSON.stringify(this.props.posts))}},{key:"handleChange",value:function(t,e){"description"===t?this.setState({description:e}):"title"===t&&this.setState({title:e})}},{key:"render",value:function(){var t=this;if(!0===this.state.redirect_)return c.a.createElement(p.a,{to:"/post"});var e=this.props.classes;return c.a.createElement("div",null,c.a.createElement(g.ValidatorForm,{ref:"form",onSubmit:this.handleSubmit,onError:function(t){return console.log(t)}},c.a.createElement("div",null,c.a.createElement(g.TextValidator,{label:"Title",className:e.textField,value:this.state.title,onChange:function(e){t.handleChange("title",e.target.value)},margin:"normal",validators:["required"],errorMessages:["this field is required","email is not valid"]})),c.a.createElement("div",null,c.a.createElement(g.TextValidator,{label:"Description",className:e.textField,value:this.state.description,onChange:function(e){t.handleChange("description",e.target.value)},margin:"normal",rows:4,rowsMax:10,multiline:!0,validators:["required"],errorMessages:["this field is required"]})),c.a.createElement("div",null,c.a.createElement("input",{accept:"image/*",className:e.fileInput,id:"raised-button-file",multiple:!0,type:"file",onChange:this.handleselectedFile})),c.a.createElement(f.a,{variant:"contained",color:"primary",type:"submit"},"Submit")))}}]),e}(d.Component);e.default=Object(u.b)(function(t){return{editItem:t.editItem,posts:t.posts}},function(t){return{addPost:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return t({type:"ADDPOST",payload:e})},updatePost:function(e){return t({type:"UPDATEPOST",payload:e})},editPost:function(e){return t({type:"EDITPOST",payload:e})}}})(Object(h.withStyles)(function(t){return{table:{minWidth:700,maxHeight:500},container:{display:"flex",flexWrap:"wrap"},textField:{marginLeft:t.spacing.unit,marginRight:t.spacing.unit,width:500},fileInput:{marginBottom:2*t.spacing.unit,marginTop:t.spacing.unit},dense:{marginTop:19},menu:{width:200},root:{width:"100%",marginTop:3*t.spacing.unit,overflowX:"auto",height:500},actionButton:{cursor:"pointer"}}})(v))}}]);
//# sourceMappingURL=8.ce632601.chunk.js.map