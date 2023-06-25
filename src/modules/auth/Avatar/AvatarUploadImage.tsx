/* eslint-disable @next/next/no-img-element */
// /* eslint-disable @next/next/no-img-element */

import uploadHandler from './UploadHandler';
import React from 'react';
import Loader from './Loader';
import ImageIcon from 'icons/ImageIcon';
import { toast } from 'react-toastify';
import Button from 'ui/Button';

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

    const defaultAvatar = props.defaultAvatar || '/images/user.png';

    this.state = {
      avatarPreviewUrl: this.props.avatar || defaultAvatar,
      avatarPreviewStyle: {},
      uploadPreview: null,
    };
  }
  setUploadPreview = (uploadPreview: any) => {
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
          toast.success('looking good!');
        } else {
          toast.error(response);
        }
      },

      afterRead: ({ result, fileInfo }) => {
        if (this.setUploadPreview) {
          this.setUploadPreview(Object.assign({ data: result }, fileInfo));
        }
        this.setState({
          avatarPreviewUrl: result,
        });
      },
    });
  };

  removeAvatar = () => {
    this.setState({
      avatarPreviewUrl: this.props.defaultAvatar || 'image/user.png',
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
      <div className="flex justify-center mt-8">
        <div className="rounded-lg  lg:w-1/2">
          <div className="m-4">
            <label className="inline-block text-md mb-2 text-gray-500">
              Зураг оруулах (jpg, png, svg, jpeg)
            </label>
            <div className="flex flex-col border-dashed border rounded items-center justify-center w-full  py-7 relative">
              <ImageIcon className="text-6xl text-gray-400" />
              <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                Зураг сонгох
              </p>
              <img
                src={avatarPreviewUrl || '/images/users.png'}
                alt="avatar"
                height={50}
                width={50}
              />

              <input
                type="file"
                className="opacity-0 absolute inset-0"
                onChange={this.handleImageChange}
              />
            </div>

            <div className="flex p-2 space-x-4">
              <Button
                className="px-4 py-2 text-white bg-red-500 rounded "
                onClick={this.removeAvatar}
              >
                Устгах
              </Button>
              <Button className="px-4 py-2 text-white bg-green-500 rounded ">
                Хадгалах
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AvatarUploadImage;
