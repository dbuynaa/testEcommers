/* eslint-disable @next/next/no-img-element */
import ImageIcon from 'icons/ImageIcon';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'ui/Button';

import { uploadHandler } from 'utils';

const AvatarUpload = () => {
 
  const [attachments, setAttachments] = useState([]);

 const [loading, setLoading] = useState(false);


  const handleFileInput = (e:any) => {
    uploadHandler({
      files: e.target.files,

      beforeUpload: () => {
        setLoading(true);
      },

      afterUpload: ({ status, response, fileInfo }) => {
        if (status !== 'ok') {
          toast.error(response.statusText);
          setLoading(false);
        } else {
          toast.info('Success');
         
          const attachment = { url: response, ...fileInfo };
          const updatedAttachments = [attachment, ...(attachments || [])];
         
          setLoading(false);
          setAttachments(updatedAttachments)
        }
      }
    });
     e.target.value =''
  };
   
 const removeAvatar =(index:number)=>{
   const attachment=[...attachments]
    attachments.splice(index,1)
     setAttachments(attachments)
   
 }


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
              src={attachments[0]||'/images/users.png'}
              alt=""
            
            />

            <input
              type="file"
              className="opacity-0 absolute inset-0"
              onChange={()=>handleFileInput}
            />
          </div>

          <div className="flex p-2 space-x-4">
            <Button
              className="px-4 py-2 text-white bg-red-500 rounded "
              onClick={()=>removeAvatar(0)}
            >
              Устгах
            </Button>
            <Button
              className="px-4 py-2 text-white bg-green-500 rounded "
              onClick={()=>setAttachments([])}
            >
              Хадгалах
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;
