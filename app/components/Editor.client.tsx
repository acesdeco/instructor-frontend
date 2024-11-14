import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor({value, setValue}:{value:string; setValue:()=> void}) {
    return (
        <ReactQuill theme="snow" value={value} onChange={setValue} />)
}

export default Editor;
