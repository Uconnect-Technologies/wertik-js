export const useStorage = (obj) => obj;

const DIGITAL_OCEAN = "digitalocean";
const DROPBOX = "dropbox";

export default function (props, wertikApp) {
  Object.keys(props.storage).forEach((element) => {
    const storageItem = props.storage[element];

    if (storageItem.for === DIGITAL_OCEAN) {
      const digitalOceanSpacesDetails = storageItem.options;

      const aws = require("aws-sdk");

      aws.config.update({
        accessKeyId: digitalOceanSpacesDetails.accessKeyId,
        secretAccessKey: digitalOceanSpacesDetails.secretAccessKey,
      });

      const spacesEndpoint: any = new aws.Endpoint(
        digitalOceanSpacesDetails.spacesEndpoint
      );

      const s3 = new aws.S3({
        endpoint: spacesEndpoint,
      });

      props.storage[element] = wertikApp.storage[element] = {
        spacesEndpoint,
        s3,
      };
    } else if (storageItem.for === DROPBOX) {
      const dropdboxDetails = storageItem.options;
      const { Dropbox } = require("dropbox");
      const dropboxInstance = new Dropbox({
        accessToken: dropdboxDetails.accessToken,
      });

      props.storage[element] = wertikApp.storage[element] = {
        dropbox: dropboxInstance,
      };
    }
  });
}
