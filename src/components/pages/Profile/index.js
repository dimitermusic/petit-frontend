import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";import API from '../../../utils/api.js';
import "./style.css";
import { Image } from 'cloudinary-react';
import './style.css';
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';
import { useSelector } from "react-redux";
import generateSignature from '../../../utils/generateSignature';

function Profile(props) {
  const myUser = useSelector(state => state.globalUser);
  const myVotes = useSelector(state => state.globalVotes);

  const handleProPicSubmit = taco => {
    console.log("event is triggered")
    console.log(props.token)
    API.userSettings({
      profilePic: taco.info.secure_url
    }, props.token)
      .then(res => {
        console.log("response receieved")
        console.log(res)
        API.getProfile(props.token)
          .then(res => {
            console.log(res)
            props.setUserState(res.data)
            window.location.reload(true)
          })
      }).catch(err => {
        console.log("whoops")
      })
  }

  const myWidget = (
    sources,
    sourceKeys,
    resourceType,
    cloudName,
    uploadPreset,
    folder,
    cropping,
    generateSignatureUrl,
    onSuccess,
    onFailure,
    logging,
    customPublicId,
    eager,
    apiKey,
    accepts,
    contentType,
    withCredentials,
    use_filename,
    unique_filename,
    googleDriveClientId,
    multiple
  ) => {
    const widget =
      !!window.cloudinary &&
      window.cloudinary.createUploadWidget(
        {
          // showCompletedButton: true,
          multiple: multiple,
          singleUploadAutoClose: true,
          showAdvancedOptions: true,
          showPoweredBy: false,
          googleDriveClientId: googleDriveClientId,
          sources: sources,
          ...(sourceKeys && sourceKeys),
          cloudName: cloudName,
          uploadPreset: uploadPreset,
          folder: folder,
          cropping: cropping,
          resourceType: resourceType,
          ...(generateSignatureUrl && { use_filename: use_filename }),
          ...(generateSignatureUrl && { unique_filename: unique_filename }),
          ...(generateSignatureUrl && {
            prepareUploadParams: async (cb, params) =>
              await generateSignature(
                cb,
                params,
                {
                  generateSignatureUrl,
                  accepts,
                  contentType,
                  withCredentials,
                  customPublicId,
                  eager,
                  apiKey,
                  resourceType
                },
                logging
              )
          })
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            logging && console.log('Done! Here is the image info: ', result.info);

            logging && console.log(result)
            !!onSuccess && onSuccess(result)
            console.log(result)
          } else if (!!error) {
            !!onFailure
              ? onFailure({ error: error, result: result })
              : logging && console.log({ error: error, result: result })
          } else if (!!resourceType && result.info === 'shown') {
            console.log('setting resourceType')

            // document.querySelector(
            // '.cloudinary_fileupload'
            // ).accept = `${resourceType}`

          } else {
            logging && console.log(result)
          }
        }
      )

    widget.open()

  }

  return (
    <div>
      <h3 className="uk-text-bold uk-flex uk-flex-center welcome">Welcome @{myUser.username}!</h3>

      {/* Badge conditionally rendered based on contribution count */}
      {myVotes <= 24 &&
        <span className="uk-badge uk-flex uk-flex-center pup-badge">
          <p>Puppy</p>
        </span>}
      {myVotes >= 25 && myVotes <= 99 &&
        <span className="uk-badge uk-flex uk-flex-center best-friend-badge">
          <p>Best Friend</p>
        </span>}
      {myVotes >= 100 &&
        <span className="uk-badge uk-flex uk-flex-center whisperer-badge">
          Whisperer
        </span>}

      <img src={myUser.profilePic} width="300" alt="avatar" className="uk-img uk-placeholder uk-align-center"></img>
      <p uk-margin="true">
        <div className="uk-flex uk-flex-center">
          <WidgetLoader />
          <Widget
            sources={['local', 'cloudinary']}
            sourceKeys={null}
            resourceType={'image'}
            cloudName={'pet-it'}
            uploadPreset={'petit-preset'}
            buttonText={'Upload'}
            style={{
              color: 'white',
              border: 'none',
              width: '100px',
              backgroundColor: 'rgb(74, 155, 74)',
              borderRadius: '6px',
              height: '33px',
              cursor: 'pointer'
            }}
            folder={'petit-profile'}
            cropping={true}
            onSuccess={handleProPicSubmit}
            onFailure={null}
            logging={false}
            customPublicId={null}
            eager={false}
            accepts={null}
            contentType={null}
            withCredentials={null}
            use_filename={true}
            unique_filename={false}
            googleDriveClientId={null}
            multiple={false}
            buttonType={'button'}
          />
        </div>
      </p>
      <p className="uk-text-bold uk-text-small uk-flex uk-flex-center ">Contributions: {myVotes}</p>
    </div >
  )
}

export default Profile;
