import AxiosClient from "./axios-config"

export const SignInUser = async (data) => {
  try{
    const response = await AxiosClient.post("/login", data);
    return response.data
  } catch (error){
    return console.log(error)
  }
}

export const DataUser = async (token, data) => {
  try{
    const config = {
      headers: {
        "Authorization": "Bearer " + token
      }
    };
    const response = await AxiosClient.post('/profile', data, config);
    return response.data
  } catch (error){
    return console.log(error)
  }
}

export const updateUserProfile = async (token, data) => {
  try{
    const config = {
      headers: {
        'Authorization': "Bearer " + token
      }
    };
    const response = await AxiosClient.put('/profile', data, config);
    return response.data
  } catch(error){
    return console.log(error)
  }
}