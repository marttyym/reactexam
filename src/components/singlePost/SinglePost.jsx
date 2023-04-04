import "./singlePost.css";

export default function SinglePost() {
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src="https://images.unsplash.com/photo-1597613261732-344e083d25e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
          alt=""
        />
      </div>
      <h1 className="singlePostTitle">
        Lorem ipsum dolor sit amet
        <div className="singlePostEdit">
          <i className="singlePostIcon fa-solid fa-pen-to-square"></i>
          <i className="singlePostIcon sfa-solid fa-trash"></i>
        </div>
      </h1>
      <div className="singlePostInfo">
        <span className="singlePostAuthor">
          Author: <b>Martin</b>
        </span>
        <span className="singlePostDate">1 hour ago</span>
      </div>
      <p className="singlePostDesc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, quasi
        laborum cumque repudiandae repellendus doloribus amet eaque earum
        placeat, voluptates obcaecati dignissimos iure ex fugiat explicabo quam
        ducimus quos unde.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, quasi
        laborum cumque repudiandae repellendus doloribus amet eaque earum
        placeat, voluptates obcaecati dignissimos iure ex fugiat explicabo quam
        ducimus quos unde.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, quasi
        laborum cumque repudiandae repellendus doloribus amet eaque earum
        placeat, voluptates obcaecati dignissimos iure ex fugiat explicabo quam
        ducimus quos unde.
      </p>
    </div>
  );
}
