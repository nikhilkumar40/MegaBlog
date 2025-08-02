import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async signUp(email, password, name) {
        try {
            return await this.account.create(ID.unique(), email, password, name)
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
             await this.account.deleteSessions()
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
           return await this.account.get();
        } catch (error) {
            console.error(error)
        }
        return null;
    }

}

const authService = new AuthService();

export default authService;
