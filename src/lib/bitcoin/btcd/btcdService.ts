import { BitcoinService } from 'types';

// ts-ignore
class BtcdService implements BitcoinService {
  async createDefaultWallet() {
    return '' as any;
  }

  async getBlockchainInfo() {
    return '' as any;
  }

  async getWalletInfo() {
    return '' as any;
  }

  async getNewAddress() {
    return '' as any;
  }

  async connectPeers() {
    return '' as any;
  }

  async sendFunds() {
    return '' as any;
  }

  async mine() {
    return '' as any;
  }

  async waitUntilOnline() {
    return '' as any;
  }

  private async mineUntilMaturity() {}

  private getBlocksToMine() {}
}

export default new BtcdService();
