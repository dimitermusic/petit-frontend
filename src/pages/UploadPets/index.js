import React, { useEffect, useState } from "react";
import UploadComp from '../../components/UploadComp/index.js';
import PropTypes from 'prop-types';
import { getThemeProps } from "@mui/system"
import Axios from "axios";

export default function Upload() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('whoops');
            setErrMsg('something went wrong!');
        };
    };

    // const [imageSelected, setImageSelected] = useState("")

    // const uploadImage = () => {
    //     const formData = new FormData() 
    //     formData.append("file", imageSelected)
    //     formData.append("upload_preset", "petit" )

    //     Axios.post("https://api.cloudinary.com/v2_2/pet-it/image/upload", formData).then((response) => {
    //         console.log(response);
    //     });
    // };

    const uploadImage = async (base64EncodedImage) => {
        try {
            await fetch('/api/uploadpets/', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            });
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };
    return (
        <div>
            <h1 className="title">Upload an Image</h1>
            <UploadComp msg={errMsg} type="danger" />
            <UploadComp msg={successMsg} type="success" />
            <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />

                {/* <input
                type="file"
                onChange={(event) => {
                    setImageSelected(event.target.files[0]);
                }}
                />


                <button onClick={uploadImage}> Submit</button> */}
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
        </div>
    );
}
