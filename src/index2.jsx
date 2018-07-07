const ReactDOM = require('react-dom');
const React = require('react');
import Button from
       '@material-ui/core/Button';
import TextField from
       '@material-ui/core/TextField';
import List from
       '@material-ui/core/List';
import ListItem from
       '@material-ui/core/ListItem';
import ListItemText from
       '@material-ui/core/ListItemText';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
    this.handleSubmit = 
      this.handleSubmit.bind(this)
    this.handleInputChanged =
      this.handleInputChanged.bind(this)
  }
  componentDidMount() {
    fetch("/posts").then(
      response => response.json()).then(
      response => this.setState({posts: response}))
  }
  getForm() {
    return <form onSubmit={this.handleSubmit}>
     <p><TextField inputProps={{id: "post"}}
         label="Post"
         onChange={this.handleInputChanged}/></p>
     <p><TextField inputProps={{id: "author"}}
         label="Author"
         onChange={this.handleInputChanged}/></p>
     <p><Button variant="contained"
         onClick={this.handleSubmit}>
         Post</Button></p>
       </form>
  }
  render() {
    return <div>
           <List>
           {this.state.posts.map(post =>
              <ListItem><ListItemText
                          primary={post[0]+
                                   ": " +
                                   post[1]}
              /></ListItem>
            )}
           </List>
           {this.getForm()}
           </div>
  }
  handleInputChanged(event) {
    this.setState({[event.target.id]:
                   event.target.value});
    event.preventDefault();
  }
  handleSubmit(event) {
    fetch("/posts",
    {
      headers: {"Content-Type":
                "application/json"},
      method: "POST",
      body: JSON.stringify(
              {author: this.state.author,
               content: this.state.post})
    }).then(fetch("/posts").then(
          response => response.json()).then(
          response =>
            this.setState({posts: response})));
    event.preventDefault();
  }
}
ReactDOM.render(
  <Posts/>,
  document.getElementById('content')
);
