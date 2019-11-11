export default function (configuration,WertikEventEmitter) {
  let allEvents = Object.keys(configuration.events);
  allEvents.forEach(element => {
    WertikEventEmitter.on(element,configuration.events[element]);
  });
}