const ReactDOM = require('react-dom');
const React = require('react');

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
      <p><label>Post:</label>
      <input type="text" name="post"
         onChange={this.handleInputChanged}/></p>
       <p><label>Author:</label>
       <input type="text" name="author"
         onChange={this.handleInputChanged}/></p>
       <p><input type="submit" value="Post"/></p>
       </form>
  }
  render() {
    return <div>
           <ul>
           {this.state.posts.map(post =>
              <li>{post[0]}: {post[1]}</li>
            )}
           </ul>
           {this.getForm()}
           </div>
  }
  handleInputChanged(event) {
    this.setState({[event.target.name]:
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
