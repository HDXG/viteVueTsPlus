
import { PostService } from "../apiExtend";
import { loginUserRequest,loginUserDto} from "./model/loginUser";

enum apiType{
    GetUsersList='User/GetLoginUser'
}
export default class HomeService{
    GetLoginUser(data:loginUserDto){
        return PostService<loginUserRequest>(apiType.GetUsersList,data);
    }
}