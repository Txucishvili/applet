export type EventConfigActions<Events extends { action: string, value: any }> = {
  [E in Events as E["value"]]: E["value"]
}
export type EventConfig<Events extends { action: string, value: any }> = {
  action: Events["action"]
  value: Events["value"]

}

export type EventConfigAction<Events extends { action: any, value: any}> = {
  actions: Events['action'];
  values: {
      [E in Events as E["action"]]: E['value'];
  };
}


export type EventMaper<C extends {actions: any, values: any}> = <T extends C['actions']>(action: T, value: C['values'][T]) => void;
export type EventMap<T extends {action: string, value: any}> = EventMaper<EventConfigAction<T>>;


export type RemoveField<Type, U> = {
  [Property in keyof Type as Exclude<Property, U>]: Type[Property]
};