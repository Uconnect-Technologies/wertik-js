import { createClient } from 'redis';
import { useRedisOptions, WertikApp, WertikConfiguration } from '../types';


export const useRedis =  (props?: useRedisOptions) => {
    return  async ({configuration, wertikApp}: {
        configuration: WertikConfiguration
        wertikApp: WertikApp
    }) => {
        const client = createClient(props);
        await client.connect()
        client.on('error', (err) => console.log('Redis Client Error ', err));
        console.log(`[REDIS]`, `Initialized redis ${props.name}`)
        return client;
    }
}