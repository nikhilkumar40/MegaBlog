import {Client, Storage, ID} from 'appwrite'
import config from '../config/config';

export class FileService{
     client = new Client();
    bucket = new Storage();

    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.bucket(this.client)
    }

    async uploadFile(file){
        try {
          return await this.bucket.createFile(config.appwriteBucketId,
                ID.unique(),
                file
             )
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(config.appwriteBucketId, fileId)
    }
}

export default fileService = new FileService();