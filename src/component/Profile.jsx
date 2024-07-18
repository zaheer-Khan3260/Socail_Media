import React, { useEffect, useState } from "react";
import userImage from "./Images/user.png";
import conent from "./Images/download.png";
import savedPostImage from "./Images/savedpost.webp";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner/LoadinSpinner.jsx";
import api from "../api.js";
import MessageInputNew from "./MessageInputNew.jsx";

function Profile() {
  const [activePost, setActivePost] = useState(true);
  const [activeSavedPost, setActiveSavedPost] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [messageContainer, setMessageContainer] = useState(false);
  const [profile, setProfile] = useState({});
  const [savedPost, setSavedPost] = useState([]);
  const [followerCount, setFollowerCount] = useState();
  const { UserId } = useParams();
  const UserData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isFollowedState, setIsFollowedState] = useState();

  const isAuthor = UserId && UserData && UserId === UserData._id ? true : false;

  const toggleMessageContainer = () => {
    setMessageContainer(!messageContainer);
  };

  const createFollow = async () => {
    await api
      .post("/api/v1/subscription/isSubscribed", {
        channelId: UserId,
      })
      .then((res) => {
        if (res.status === 200) {
          setIsFollowedState(!isFollowedState);
          if (isFollowedState) {
            setFollowerCount(followerCount - 1);
          } else {
            setFollowerCount(followerCount + 1);
          }
        }
      })
      .catch((err) => {
        console.log(
          err ? err.message : "An error occur while make Subscription"
        );
      });
  };

  useEffect(() => {
    if (UserId) {
      const fetchProfile = async () => {
        const response = await api.post(`/api/v1/users/getUserChannelProfile`, {
          userId: UserId,
        });
        const userData = response.data;
        if (userData) {
          setProfile(userData.data);
          setIsFollowedState(userData.data.isFollowed);
          setFollowerCount(userData.data.followerCount);
        }
      };

      const fetchPosts = async () => {
        const response = await api.post(`/api/v1/posts/getUserPost`, {
          userId: UserId,
        });
        const userPosts = response.data;
        if (userPosts) setPosts(userPosts.data);
        let count = 0;
        userPosts.data.forEach((element) => {
          if (element) count++;
        });
        setPostCount(count);
      };
      setLoading(true);
      fetchProfile();
      fetchPosts();
      setLoading(false);
    }
  }, [UserData, navigate, UserId]);

  return (
    <div className=" w-full h-screen md:flex md:justify-end min-[950px]:block text-white overflow-auto bg-[#0f171f] md:mt-10">
      <div
        className=" w-full h-full mx-auto md:w-[500px]
 "
      >
        {/* profile image and follower cont */}
        <div className=" h-auto mx-auto w-full xl:w-[500px] ">
          {/* profile image nad followers main cont */}
          <div className="flex w-full h-auto ">
            {/* image cont */}
            <div className="ml-2">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                <img
                  src={profile.avatar ? profile.avatar : userImage}
                  alt=""
                  className="w-full h-full object-fill rounded-full"
                />
              </div>
            </div>
            {/* followers cont */}
            <div className=" h-26 w-full p-1">
              <div>
                <div
                  className="flex text-[15px] 
                  min-[950px]:text-[22px] min-[950px]:mt-3
                  text-center justify-center h-full items-center"
                >
                  <div>
                    <div>Post</div>
                    <div>{postCount}</div>
                  </div>
                  <div className="mr-4 ml-4">
                    <div>Followers</div>
                    <div>{followerCount}</div>
                  </div>
                  <div>
                    <div>Following</div>
                    <div>{profile.followingCount}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* bio cont */}
          <div className="text-[14px] min-[950px]:text-[13px] w-36 md:w-48 pl-2 mt-1 h-16">
            <div>
              <p className=" text-[15px] ">
                {profile ? `${profile.username}` : null}
              </p>
            </div>
            <div>{<p>{profile ? `${profile.bio} ` : null}</p>}</div>
          </div>
          <div className=" w-full h-[2.8rem] flex justify-end items-center">
            {isAuthor ? (
              <div
                className=" bg-blue-700 w-16 text-center h-8 rounded-xl mr-5 py-1 font-semibold"
                onClick={() => navigate(`/profile/${UserId}/editprofile`)}
              >
                Edit
              </div>
            ) : (
              <div className="flex">
                <div
                  className={`${
                    !isFollowedState ? "bg-blue-700" : "bg-red-700"
                  } w-24 text-center h-8 rounded-xl mr-2 py-1`}
                  onClick={toggleMessageContainer}
                >
                  Message
                </div>

                <div
                  className={`${
                    isFollowedState ? "bg-blue-700" : "bg-red-700"
                  } w-24 text-center h-8 rounded-xl mr-5 py-1`}
                  onClick={createFollow}
                >
                  {isFollowedState ? "Followed" : "Follow"}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* post detail cont */}
        <div className=" w-full h-6 flex text-center text-[16px] mt-1">
          <div
            className={`w-1/2 font-semibold border-r-2 border-b-2 border-black ${
              activePost ? `bg-blue-600` : "bg-white text-black"
            } cursor-pointer`}
            onClick={() => {
              setActivePost(true);
              setActiveSavedPost(false);
            }}
          >
            Posts
          </div>
          <div
            className={`w-1/2 font-semibold  border-b-2 border-black ${
              savedPost ? `bg-blue-600` : "bg-white"
            } cursor-pointer`}
            onClick={() => {
              setActiveSavedPost(true);
              setActivePost(false);
            }}
          >
            {" "}
            Saved
          </div>
        </div>

        {/* post cont */}
        {activePost ? (
          <div className="h-auto w-full p-[2px]">
            <div className="flex flex-wrap justify-between">
              {posts ? (
                posts.map((post) => (
                  <div
                    key={post._id}
                    className="w-[calc(50%-0.30rem)] h-[15rem] bg-black"
                  >
                    <img
                      src={post.postFile}
                      alt=""
                      className="h-full object-contain"
                    />
                  </div>
                ))
              ) : (
                <div className=" text-blue-600 font-bold">
                  Don't Upload any posts
                </div>
              )}
            </div>
          </div>
        ) : null}
        {activeSavedPost ? (
          <div className="h-auto w-full p-[2px] min-[950px]:hidden">
            <div className="flex justify-between gap-1">
              <div className="w-full h-full">
                <img src={conent} alt="" className="" />
              </div>
              <div className="w-full h-full">
                <img src={conent} alt="" className="" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div
        className={`absolute flex h-screen backdrop-blur-lg  top-0 w-full ${
          loading ? "block" : "hidden"
        }`}
      >
        <LoadingSpinner />
      </div>

      <div
        className={`absolute flex h-screen w-full  md:w-[70%] backdrop-blur-lg top-0 justify-center items-center ${
          messageContainer ? "block" : "hidden"
        }`}
      >
        <div className="border-2 border-blue-400 rounded-3xl h-[18rem] w-[25rem] bg-[#0f171f]">
          <div className="h-[75%] flex flex-col items-center">
            <div className="w-28 h-28 mt-3 bg-blue-500 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105">
              {profile ? (
                <img
                  src={profile?.avatar ? profile?.avatar : userImage}
                  alt="userProfile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : null}
            </div>
            <div className="w-full text-center mt-6">
              <p className="text-blue-700 font-bold">Send a message to</p>
              <p className="text-lg font-bold">
                {profile ? profile.username : null}
              </p>
            </div>
          </div>

          <div>
            <MessageInputNew _id={UserId} redirect={"/messages"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
