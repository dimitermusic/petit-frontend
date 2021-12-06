import React, { useEffect, useState } from 'react';
import "./style.css";
import { Image } from 'cloudinary-react';


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
            <a href="/p">
            <button className="btn" type="button">Return to Profile</button></a>
            <br/>
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