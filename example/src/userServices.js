import axios from "axios"

export const listUsers = async () => {
    return await axios.get("https://vuli-firebase-user.herokuapp.com/users").then(r => r.data.users);
}

export const changePassword = async (uid,password) => {
    return await axios.put("https://vuli-firebase-user.herokuapp.com/password",{uid:uid,newPassword:password}).then(r => r.data);
}

