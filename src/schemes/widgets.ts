// import init1 from "@/modules/Widgets/Widget1";
// import init2 from "@/modules/Widgets/Widget2";

const WidgetSchema = {
  Widget: {
    name: "Widget 1",
    load: (widgets) => {
      widgets.forEach((w) => {
        console.log("---w", w)
        switch (w) {
          case 'Widget1':
          import(
              /* webpackChunkName: "widgets-[request]" */
              /* webpackMode: "lazy" */
              `../modules/Widgets/${w}/${w}`
            ).then((r) => {
              console.log("r")
            })
            break;
          case 'Widget2':
            console.log("2")
            import(
              /* webpackChunkName: "widgets-[request]" */ 
              /* webpackMode: "lazy" */
              `../modules/Widgets/${w}/${w}`
            ).then((r) => {
              console.log("r")
            })
            break;

          default:
            break;
        }
      })
    }
  }
}

export default {}