import User from "../models/user_model";

class UserRepository {
    findAllUsers(): User[] {
        return [];
    }
}

export default new UserRepository();