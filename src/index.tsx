// 
// booting app
// 
import { bootConfig } from "./boot/boot";

const _bootstrapApp = async () => {
  const appConfig: any = await bootConfig();

  await import('./boot/app-boot').then((m) => {
    m.default(appConfig);
  })
 
  console.log("[Setting app config]");

};

_bootstrapApp();


export { _bootstrapApp };