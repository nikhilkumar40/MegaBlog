import { Client, Databases, ID, Query } from 'appwrite'
import config from '../config/config';

 class DbConfigService {
    client = new Client();
    databases = new Databases();

    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.databases(this.client)
    }

    async createPost(data) {
        try {
          return await this.databases.createPost(config.appwriteDatabaseId,
                config.appwriteCollectionID,
                ID.unique(),
                { ...data }
            )
        } catch (error) {
            console.log(error)
        }
    }

   async  updatePost(slug, data) {
      try {
        return await  this.databases.updateDocument(config.appwriteDatabaseId,
            config.appwriteCollectionID,
            slug,
            { ...data }
        )
      } catch (error) {
        console.log(error)
      }
    }

    async deletePost(slug){
        try {
          await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionID) 
          return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async getPost(slug){
        try {
          return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug)
        } catch (error) {
            console.log(error);
            
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]){
        try {
        return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries,
            50
        )
        } catch (error) {
            throw error;
            return false;
        }
    }
}

export default dbConfigService = new DbConfigService();