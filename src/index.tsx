// 
// booting app
// 
import { bootConfig, checkUser } from "./boot/boot";

const _bootstrapApp = async () => {
  const appConfig: any = bootConfig();

  const bootStrap = import( /* webpackChunkName: "appboot" */'./boot/app-boot');
  let user;

  if (!!appConfig.userToken) {
    user = checkUser(appConfig.userToken);
  }

  await Promise.all([bootStrap, user]).then((resp) => {
    const [boot, user] = resp;

    if (!!user) {
      Object.assign(appConfig, { theme: { theme: user.data.theme }, user: user.data });
    }

    boot.default(appConfig);
  })

};

_bootstrapApp();


export { _bootstrapApp };