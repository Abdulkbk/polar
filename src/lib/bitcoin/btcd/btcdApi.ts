import { debug } from 'electron-log';
import { httpRequest } from 'shared/utils';
import { snakeKeysToCamel } from 'utils/objects';
import { BitcoinNode, BtcdNode } from 'shared/types';
import { read } from 'utils/files';
import { join } from 'path';
import { networksPath } from 'utils/config';
import { btcdCredentials } from 'utils/constants';

interface ConfigOptions {
  url: string;
  headers: {
    username: string;
    password: string;
  };
}

const request = async <T>(
  node: BitcoinNode,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  bodyObj?: any,
): Promise<T> => {
  if (node.implementation !== 'btcd')
    throw new Error(`BtcdService cannot be used for '${node.implementation}' nodes`);

  const btcd = node as BtcdNode;
  const id = Math.round(Math.random() * Date.now());

  const config = await setupConfig(btcd);
  const url = config.url;

  // add id to body if it exists
  const body = bodyObj ? { ...bodyObj, id } : undefined;

  const bodyStr = body ? JSON.stringify(body) : undefined;
  debug(`btcd API: [request] ${btcd.name} ${id} "${url}" ${body || ''}`);

  const response = await httpRequest(url, {
    method,
    headers: config.headers,
    // ca: config.ca,
    body: bodyStr,
  });

  const json = JSON.parse(response);
  debug(`btcd API: [response] ${btcd.name} ${id} ${JSON.stringify(json, null, 2)}`);

  if (json.error) {
    throw new Error(json.error);
  }

  return snakeKeysToCamel(json) as T;
};

export const httpPost = async <T>(node: BitcoinNode, body?: any): Promise<T> => {
  return request<T>(node, 'POST', body);
};

const setupConfig = async (btcd: BtcdNode): Promise<ConfigOptions> => {
  const caPath = join(
    networksPath,
    btcd.networkId.toString(),
    'volumes',
    'btcwallet',
    `btcwallet-${btcd.name}`,
    'rpc.cert',
  );
  const ca = await read(caPath, 'utf-8');
  const config = {
    url: `http://127.0.0.1:${btcd.ports.grpc}`,
    headers: {
      username: btcdCredentials.user,
      password: btcdCredentials.pass,
      'Content-Type': 'application/json',
    },
    ca,
  };
  return config;
};
