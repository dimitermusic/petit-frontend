import PropTypes from 'prop-types';
import { getThemeProps } from "@mui/system"
import "./style.css";
import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import { Routes, Route, Link, Navigate } from "react-router-dom";

export default function PetGallery(props) {
    
    const [imageIds, setImageIds] = useState();
    // const uploadPetsButton = () => {
    //     <Navigate to="/uploadpets"/>
    // }
    const loadImages = async () => {
        try {
            const res = await fetch('/api/uploadpets');
            const data = await res.json();
            console.log(data)
            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        loadImages();
    }, []);
    
    return (
        <div>
            <h1 className="title">Pet Gallery</h1>
            <a href="/uploadpets">
            <button className="btn" type="button">Add Photos</button></a>
            <div className="gallery">
                {imageIds &&
                    imageIds.map((imageId, index) => (
                        <Image
                            key={index}
                            cloudName={"pet-it"}
                            publicId={imageId}
                            width="300"
                            crop="scale"
                        />
                    ))}
            </div>
        </div>
    );
}