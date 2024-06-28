
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Select, Button} from './index';
import userImage from './Images/user.png'

function EditProfile() {
  const [profilePost, setProfilePost] = useState("");
  let userData = useSelector((state) => state.auth.userData);
  const { UserId } = useParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(profilePost.UserName);
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  useEffect(() => {
    if(UserId) {
      appwriteServices.getProfileImage(UserId).then((post) => {
        if(post) setProfilePost(post);
        else navigate(`/profile/${UserId}/editprofile`);
      })
    }
  }, [userData, navigate, inputValue])
  
  const {register, handleSubmit} = useForm({
    defaultValues: {
      image: profilePost?.UserImage || "",
      UserName: profilePost?.UserName || "",
      Bio: profilePost?.Bio || "",
      Gender: profilePost?.Gender || "",
      DateOfBirth: profilePost?.DateOfBirth || "",
  },
  });
    const submit = async (data) => {
     
      if(profilePost){
    const file = data.image[0] ? await appwriteServices.uploadUserProfileImage(data.image[0]) : null;

    if(file) {
      appwriteServices.deleteProfileImage(profilePost.UserImage);
    }
    const userDbPost = await appwriteServices.updateProfilePost(UserId, {
      ...data,
      UserImage: file ? file.$id : undefined,
    });
    if(userDbPost) navigate(`/profile/${UserId}`);
      }else{

    const file = data.image[0] ? await appwriteServices.uploadUserProfileImage(data.image[0]) : null;
  
    if(file) { 
      const fileId = file.$id;
      data.UserImage = fileId;
      const userId = userData.$id;
      const userDbPost = await appwriteServices.userData({...data, UserId:userId,} )
      if(userDbPost) navigate(`/profile/${UserId}`);
    }
     }
   }
   const deletePost = () => {
    appwriteServices.deleteProfilePost(profilePost.$id).then((status) => {
        if (status) {
          setProfilePost("");
            appwriteServices.deleteProfileImage(profilePost.UserImage);  
        }
    });
};

  return (
    <form onSubmit={handleSubmit(submit)}  className='border-2 border-red-700 w-full h-screen'>
      <div className='border-2 border-black w-full p-2 h-full md:pt-5 md:w-1/2 md:ml-[15rem] lg:ml-[21rem] xl:ml-[24rem]'>
           {/* profile image cont */}
           <div className=' w-full mt-4'>
                {/* image cont */}
                <div className=' w-24 mx-auto lg:w-32  '>
                  {
                    profilePost.UserImage ? <img src={appwriteServices.getUserImagePreview(profilePost.UserImage)} alt="" className='border border-black rounded-full' />
                    :
                    <img src={userImage} alt="" className='border border-black rounded-full' />
                  }
                </div>
                <div className='flex justify-end mt-2 '>
                        <div className="relative inline-flex mr-2">
                     <Input
                    type="file" 
                    accept="image/png, image/jpg, image/jpeg"
                     className="absolute inset-0 z-50 w-full h-full opacity-0"
                      id="fileInput"
                      
                      {...register("image", { required: !profilePost })}
                      />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 rounded">
                        {
                          profilePost.UserImage ? "Change" : "Upload"
                        }
                       </button>
                          </div>
                          <div className=''>
                          <button class="bg-red-500 hover:bg-red-700 text-white py-1 px-1 rounded"
                          onClick={() => deletePost()}
                          >
                        Remove
                       </button>
                          </div>
                          </div>
            </div>
            <div className='border-b-2 border-grey-900 pt-5 mx-3'></div>
            <div className='mt-2 w-full h-auto'>
            <label htmlFor="userName" className='text-sm'> Username</label>
                        <div  className='mt-1 ml-1'>
                        <input
                         type="text"
                        label="Username"
                         value={inputValue}
                         className=" border-b-2 border-black focus:outline-none text-sm w-52 lg:text-lg"
                         onChange={handleInputChange}
                        //  onClick={() => setInputValue('')}
                         {...register("UserName", { required: true})}
                         />
                        </div>
                        <div className='mt-5 ml-1'>
                <Input
                 type="text"
                 placeholder='Bio'
                 className=" border-b-2 border-black focus:outline-none text-sm w-52 lg:text-lg"
                 {...register("Bio", {required: true})}
                 />
                </div>
                <h6 className='mt-5 ml-1 text-sm mb-1 lg:text-lg'>Gender : </h6>
                <div className='text-sm lg:text-lg'>
                <Select
                    options={["Male", "Female"]}
                    className="mb-4"
                    {...register("Gender", { required: true })}
                />
               </div>
               <div className='flex justify-between text-sm mt-3 lg:text-lg lg:justify-normal'>
                <p>Date Of Birth:</p>
                <input
                 type="date"
                  name="dateOfBirth"
                   id="dateOfBirth"
                    className=' hover:outline-none border-b-2 border-black ml-3'
                    {...register("DateOfBirth", { required: true })}
                     />
               </div>
            </div>
            <Button type="submit" bgColor={profilePost ? "bg-green-500" : undefined} className="w-full">
                    {profilePost ? "Update" : "Submit"}
                </Button>
      </div>
    </form>
  )
}

export default EditProfile;
