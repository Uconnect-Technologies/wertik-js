export interface useStorageProps {
  for: "dropbox" | "digitalocean";
  name: string;
  dropboxOptions?: {
    accessToken: string;
  };
  digitalOceanOptions?: {
    accessKeyId: string;
    secretAccessKey: string;
    spacesEndpoint: string;
  };
}
