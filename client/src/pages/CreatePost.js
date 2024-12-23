import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(e) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    e.preventDefault();
    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form onSubmit={createNewPost}>
    {console.log("files hit", files)}
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={e => setTitle(e.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={e => setSummary(e.target.value)} />
      <div className="photo-upload">
          <label htmlFor="file-upload" className="custom-file-upload">
         Upload Photo
      </label>
      <input id="file-upload" type="file" accept="image/*" onChange={e => setFiles(e.target.files)} style={{ display: "none" }}/>
      </div>
      <Editor value={content} onChange={setContent} />
      <button style={{marginTop:'5px'}}>Create post</button>      
    </form>
    
  );
}