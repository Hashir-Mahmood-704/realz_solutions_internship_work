import {useState} from 'react';

function UploadFileForm() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState('');

    function onFileChange(e) {
        console.log('File changed');
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            });
            console.log(response);
            if (response.ok) {
                alert('File uploaded successfully');
                console.log('File uploading successful!');
            } else throw new Error('Something went wrong, Failed to upload file.');
        } catch (error) {
            console.error('Error in uploading file!');
            if (error instanceof Error) console.error(error.message);
            else console.error(error);
        }

    }

    return <section className="form-container">
        <h1>Upload CSV File</h1>
        <form onSubmit={async function (e) {await handleSubmit(e);}}>
            <input onChange={function (e) {onFileChange(e);}} accept=".csv" type="file" id="uploadFile"/>
            <label htmlFor="uploadFile">Upload File</label>
            <span>{fileName}</span>
            <button disabled={!file} type="submit">Submit</button>
        </form>
    </section>;
}

export default UploadFileForm;