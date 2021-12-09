import { IConfigurationEvents } from "../types/configuration"
export default function (events: IConfigurationEvents) {
  return function (name: string, args: any) {
    if (events.hasOwnProperty(name)) {
      events[name](args)
    }
  }
}
