// 
// booting app
// 
import { bootConfig } from "./boot/boot";
import AuthAPI from "@/services/API/AuthAPI";
import { AuthService } from "./services/AuthService";

const _bootstrapApp = async () => {
  const appConfig: any = bootConfig();

  let userReq;

  if (appConfig.userToken) {
    userReq = AuthAPI.validateToken(appConfig.userToken)
    .then(r => {
      return r;
    }).catch(e => {
      Object.assign(appConfig, {
        errors: { user: true },
      });
      return 'error';
    });
  }

  const bootStrap = import( /* webpackChunkName: "appboot" */ './boot/app-boot')

  await Promise.all([bootStrap, userReq]).then(async (resp) => {
    const [boot, userResp] = resp;

    if (userResp && userResp.data) {
      Object.assign(appConfig, {
        theme: userResp.data.theme,
        user: userResp.data,
        token: appConfig.userToken
      });
    }

    boot.default(appConfig);
  })

};

_bootstrapApp();


export { _bootstrapApp };