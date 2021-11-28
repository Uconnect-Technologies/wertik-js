export interface useStorageProps {
  for: "dropbox" | "digitalocean";
  dropboxOptions?: {
    accessToken: string;
  };
  digitalOceanOptions?: {
    accessKeyId: string;
    secretAccessKey: string;
    spacesEndpoint: string;
  };
}
