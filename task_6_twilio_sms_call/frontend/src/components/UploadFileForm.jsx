import { useState } from 'react';

function UploadFileForm() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState('');
    const [enableOperations, setenableOperations] = useState(false);

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
            if (response.ok) {
                alert('File uploaded successfully');
                setenableOperations(true);
            } else throw new Error('Something went wrong, Failed to upload file.');
        } catch (error) {
            console.error('Error in uploading file!');
            if (error instanceof Error) console.error(error.message);
            else console.error(error);
        }

    }

    async function handleCalls() {
        try {
            const response = await fetch('http://localhost:4000/call', { method: 'GET' });
            if (response.ok) {
                alert('Calls sent successfully');
                setenableOperations(false);
            } else throw new Error('Something went wrong, Failed to make calls');
        } catch (error) {
            console.error('Error in making calls!');
            if (error instanceof Error) console.error(error.message);
            else console.error(error);
        }
    }
    async function handleSMS() {
        try {
            const response = await fetch('http://localhost:4000/sms', { method: 'GET' });
            if (response.ok) {
                alert('SMS sent successfully');
                setenableOperations(false);
            } else throw new Error('Something went wrong, Failed to send sms');
        } catch (error) {
            console.error('Error in sending sms!');
            if (error instanceof Error) console.error(error.message);
            else console.error(error);
        }
    }

    return <section className="form-container">
        <h1>Upload CSV File</h1>
        <form onSubmit={async function (e) { await handleSubmit(e); }}>
            <input onChange={function (e) { onFileChange(e); }} accept=".csv" type="file" id="uploadFile" />
            <label htmlFor="uploadFile">Upload File</label>
            <span>{fileName}</span>
            <button disabled={!file} type="submit">Submit</button>
        </form>
        <div className="">
            <button onClick={handleCalls} disabled={!enableOperations} className='btn'>Call</button>
            <button onClick={handleSMS} disabled={!enableOperations} className='btn'>SMS</button>
        </div>
    </section>;
}

export default UploadFileForm;