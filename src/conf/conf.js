
const conf = {

    appwriteUrl: String(process.env.REACT_APP_APPWRITE_URL),
    appwirteProjectId: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(process.env.REACT_APP_APPWRITE_BUCKET_ID),
    appwriteUserProfileImageBucketId: String(process.env.REACT_APP_APPWRITE_USERPROFILEIMAGE_BUCKET_ID),
    appwriteUserDataCollectionId: String(process.env.REACT_APP_APPWRITE_USERDATA_COLLECTION_ID),
}

export default conf;