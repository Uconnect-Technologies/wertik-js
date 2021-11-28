import { WertikApp, WertikConfiguration } from "../types";
import { useStorageProps } from "../types/storage";

const DIGITAL_OCEAN = "digitalocean";
const DROPBOX = "dropbox";

export const useStorage = (storageItem: useStorageProps) => {
  return ({
    configuration,
    wertikApp,
  }: {
    configuration: WertikConfiguration;
    wertikApp: WertikApp;
  }) => {
    if (storageItem.for === DIGITAL_OCEAN) {
      const digitalOceanSpacesDetails = storageItem.digitalOceanOptions;

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

      return {
        spacesEndpoint,
        s3,
      };
    } else if (storageItem.for === DROPBOX) {
      const dropdboxDetails = storageItem.dropboxOptions;
      const { Dropbox } = require("dropbox");
      const dropboxInstance = new Dropbox({
        accessToken: dropdboxDetails.accessToken,
      });

      return {
        dropbox: dropboxInstance,
      };
    }
  };
};

export default function (props, wertikApp) {
  Object.keys(props.storage).forEach((element) => {});
}
