
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Select, Button} from './index';
import userImage from './Images/user.png'
import api from '../api';

function EditProfile() {
  const [profilePost, setProfilePost] = useState("");
  let userData = useSelector((state) => state.auth.userData);
  const { UserId } = useParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(profilePost.UserName);
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  const deletePost = async () => {
    await api.get("/api/v1/users/deleteAvatar").then((status) => {
         if (status === 200) {
             setProfilePost(profilePost.avatar = "")
         }
     }).catch((err) => {
        console.log(err.message ? err.message : "Failed to delete the post" )
     })
 };

  useEffect(() => {
    const fetchUserProfileImage = async() => {
        console.log("UserId in edit profile", UserId)
    if(UserId) {
   const response =  await api.post("/api/v1/users/getUserById", {
      userId: UserId
     })
     const userData = response.data
     console.log("userData response Data in edit profile", response.data);
     if(userData.data) {
      setProfilePost(userData.data)
     }else{
       navigate(`/profile/${UserId}`);
     }
    }
  }
  fetchUserProfileImage()

  }, [UserId])

  
  
  const {register, handleSubmit, setValue} = useForm({
    defaultValues: {
      avatar: profilePost?.avatar || "",
      username: profilePost?.username || "",
      bio: profilePost?.bio || "",
  },
  });


  useEffect(() => {
    setValue("username", profilePost.username);
    setValue("fullname", profilePost.fullname);
    setValue("bio", profilePost.bio);
  }, [profilePost, setValue]);

    const submit = async (data) => {
      const avatarFormData = new FormData()
      if(data.avatar[0]){ 
        avatarFormData.append("avatar", data.avatar[0])
        await api.patch("/api/v1/users/update-avatar", avatarFormData)
      }
     
      if(data.username && data.bio && data.fullname){
    const response = await api.post("/api/v1/users/update-account-details", {
        username: data?.username,
        email: profilePost?.email,
        fullname: data.fullname,
        bio: data.bio
    } );
    const userdata = response.data
    if(userdata) navigate(`/profile/${UserId}`);
      }
   }

  return (
    <form onSubmit={handleSubmit(submit)}  className='border-2 border-red-700 w-full h-screen'>
      <div className='border-2 border-black w-full p-2 h-full md:pt-5 md:w-1/2 md:ml-[15rem] lg:ml-[21rem] xl:ml-[24rem]'>
           {/* profile image cont */}
           <div className=' w-full mt-4'>
                {/* image cont */}
                <div className=' w-24 mx-auto lg:w-32  '>
                  {
                    profilePost.avatar ? <img src={profilePost.avatar} alt="" className='border border-black rounded-full object-contain' />
                    :
                    <img src={userImage} alt="" className='border border-black rounded-full object-contain' />
                  }
                </div>
                <div className='flex justify-end mt-2 '>
                        <div className="relative inline-flex mr-2">
                     <Input
                    type="file" 
                    accept="image/png, image/jpg, image/jpeg"
                     className="absolute inset-0 z-50 w-full h-full opacity-0"
                      id="fileInput"
                      
                      {...register("avatar", { required: !profilePost })}
                      />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 rounded">
                        {
                          profilePost.avatar ? "Change" : "Upload"
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
                        defaultValue={profilePost.username || ""}
                         className=" border-b-2 border-black focus:outline-none text-sm w-52 lg:text-lg"
                         {...register("username", { required: !profilePost.username})}
                         />
                        </div>
                        <div  className='mt-1 ml-1'>
                        <input
                         type="text"
                        label="Full Name"
                         defaultValue={profilePost.fullname || ""}
                         className=" border-b-2 border-black focus:outline-none text-sm w-52 lg:text-lg"
                         {...register("fullname", { required: !profilePost.username})}
                         />
                        </div>
                        <div className='mt-5 ml-1'>
                <Input
                 type="text"
                 placeholder='Bio'
                 defaultValue={profilePost.bio || ""}
                 className=" border-b-2 border-black focus:outline-none text-sm w-52 lg:text-lg"
                 {...register("bio", {required: !profilePost.bio})}
                 />
                </div>
                <h6 className='mt-5 ml-1 text-sm mb-1 lg:text-lg'>Gender : </h6>
                <div className='text-sm lg:text-lg'>
                <Select
                    options={["Male", "Female"]}
                    className="mb-4"
                    {...register("Gender")}
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
