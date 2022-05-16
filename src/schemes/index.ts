export function ModuleTarget(constructor): any {
  return class extends constructor {
    namedValue = 'someValue';
    
    constructor(props) {
      super(props);
      // constructor.bind(this);
    }

    onInit(cb?) {
      super.onInit()
      if (cb instanceof Function) {
        cb();
      }
    }

    onDestroy(cb?) {
      super.onDestroy()

      if (cb instanceof Function) {
        cb();
      }
    }
  };
};


export default {};