import { Contract } from '../libs/contract';
import { IContract, IProvider, ISigner } from '../types';
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
  protected provider: IProvider;
  private contract: IContract;

  constructor(provider: IProvider, chainId: SupportedNetwork) {
    super('MultiStaticcall', chainId);
    this.provider = provider;
    this.contract = Contract(
      this.contractAddress,
      require('./abis/MultiStaticcall.json'),
      provider,
    );
  }

  async aggregate(calls: any[]): Promise<any> {
    return (this.contract.methods as any).multiStaticcall(calls).call();
  }
}
