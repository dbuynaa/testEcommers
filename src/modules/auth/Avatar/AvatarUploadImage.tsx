/* eslint-disable @next/next/no-img-element */
// /* eslint-disable @next/next/no-img-element */

import uploadHandler from './UploadHandler';
import React from 'react';
import Loader from './Loader';

import { readFile } from '../../../utils/index';
const Avatar = `
  width: 100px;
  height: 100px;
  position: relative;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 50%;

  label {
    color: white;
    transition: background 0.3s ease;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;

    i {
      visibility: hidden;
      opacity: 0;
      transition: all 0.3s ease;
    }

    &:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.4);

      i {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  input[type='file'] {
    display: none;
  }

  img {
    display: block;
    width: 100%;
  }
`;
type Props = {
  avatar?: string;
  defaultAvatar?: string;
  onAvatarUpload: (responses: any) => void;
};
type State = {
  avatarPreviewStyle: any;
  avatarPreviewUrl: string;
  uploadPreview: any;
};

class AvatarUploadImage extends React.Component<Props, State> {
  constructor(props, context) {
    super(props, context);

    const defaultAvatar = props.defaultAvatar ||  '/images/user.png' ;

    this.state = {
      avatarPreviewUrl: this.props.avatar || defaultAvatar,
      avatarPreviewStyle: {},
      uploadPreview: null
    };
  }
  setUploadPreview = (uploadPreview) => {
    this.setState({ uploadPreview });
  };
  handleImageChange = (e) => {
    const imageFile = e.target.files;

    uploadHandler({
      files: imageFile,
      beforeUpload: () => {
        this.setState({ avatarPreviewStyle: { opacite: '0.2' } });
      },
      afterUpload: ({ response, status }) => {
        this.setState({ avatarPreviewStyle: { opacity: '1' } });
        // call succes event
        this.props.onAvatarUpload(response);

        //  remove preview
        if (this.setUploadPreview) {
          this.setUploadPreview(null);
        }
        if (status === 'ok') {
          alert('looking good!');
        } else {
          alert(response);
        }
      },

      afterRead: ({ result, fileInfo }) => {
        if (this.setUploadPreview) {
          this.setUploadPreview(Object.assign({ data: result }, fileInfo));
        }
        this.setState({
          avatarPreviewUrl: result
        });
      }
    });
  };
  renderUploadLoader() {
    if (!this.state.uploadPreview) {
      return null;
    }
    return <Loader />;
  }
  render() {
    const { avatarPreviewStyle, avatarPreviewUrl } = this.state;
    return (
      <>
        <img
          alt="avatar"
          style={avatarPreviewStyle}
          src={readFile(avatarPreviewUrl)}
        />
        <label>
          <input type="file" onChange={this.handleImageChange} />
        </label>
        {this.renderUploadLoader()}
      </>
    );
  }
}
export default AvatarUploadImage;
