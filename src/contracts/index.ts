import { getContractAddress } from './getContractAddresses';
import { ContractName, SupportedNetwork } from './types';

export default class ContractManager {
  public contractAddress: string;

  constructor(
    public contractName: ContractName,
    public chainId: SupportedNetwork,
  ) {
    this.contractName = contractName;
    this.chainId = chainId;
    this.contractAddress = (getContractAddress(contractName) || {})[chainId] || '';
    if (!this.contractAddress) {
      throw new Error(`No address for contract ${contractName}`);
    }
  }
}

export class MultiStaticcall extends ContractManager {
  constructor(chainId: SupportedNetwork) {
    super('MultiStaticcall', chainId);
  }
}
