import axios from 'axios';

class UserAPIs {
  public userState = {
    userName: null,
    email: null
  };

  signIn(email, password) {
    return new Promise(async r => {
      const userResp = axios.post('http://localhost:5000/auth/login', { email, password });
      r(userResp);
    })
  }

  signUp(userResp) {
    return new Promise(async r => {
      r(userResp);
    })
  }

  checkEmail(email: string) {
    return new Promise(async r => {
      const userResp = axios.post('http://localhost:5000/user/checkEmail', { email });
      r(userResp);
    })
  }

  validateToken(token) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:5000/auth/validate', {token})
      .then(r => {
        return resolve(r);
      })
      .catch(r => {
        return reject('error on request');
      });

    })
  }
}

const UserAPI = new UserAPIs();

export default UserAPI;