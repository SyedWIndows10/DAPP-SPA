import { Injectable } from '@angular/core';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Subject, } from 'rxjs';
import { citizen_address, citizen_abi } from '../../abis.js'


@Injectable({
  providedIn: 'root'
})
export class ContractService {
  web3js: any;
  provider: any;
  accounts: any;
  citizen: any;
  citizensList:any;
  web3Modal

  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();

  constructor() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "INFURA_ID" // required
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });
  }

  async connectAccount():Promise<any> {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();
    return this.accounts;
  }

  async addCitizen(username, age, city, notes):Promise<any> {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();

    this.citizen = new this.web3js.eth.Contract(citizen_abi, citizen_address);

    const create = await this.citizen
      .methods.addCitizen(age, city, username, notes)
      .send({ from: this.accounts[0] });
    return create;
  }


  async getCitizenById(citizenID) {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();

    this.citizen = new this.web3js.eth.Contract(citizen_abi, citizen_address);

    const result = await this.citizen.methods.getCitizenById(citizenID).call({ from: this.accounts[0] });

    return result;
  }

  async getCitizens() {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();

    this.citizen = new this.web3js.eth.Contract(citizen_abi, citizen_address);

    return this.citizen.getPastEvents(
      'AllEvents',
      {
        fromBlock: 0,
        toBlock: 'latest'
      },
      (err, events) => {
        console.log(events);
        this.citizensList = events;
       }
    );

    // Commented this code since cloudfare worker cache available only in production. In Dev environment, Cache.match will always return undefined.
//     await fetch(new Request("https://my-worker.syed123098.workers.dev", {
//     method: "GET",
//     body: JSON.stringify({
//         "jsonrpc":"2.0",
//         "method":"eth_getBlockByNumber",
//         "params":["0x2244", true],
//         "id":64
//     }),
//     headers: {
//         "Content-Type": "application/json"
//     }
// })).then((resp) => {
//     return resp.json()
// });

  }

  async getNoteByCitizenId(orgID):Promise<string> {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();

    this.citizen = new this.web3js.eth.Contract(citizen_abi, citizen_address);

    const result = await this.citizen.methods.getNoteByCitizenId(orgID).call({ from: this.accounts[0] });

    return result;
// Commented this code since cloudfare worker cache available only in production. In Dev environment, Cache.match will always return undefined.
//     await fetch(new Request("https://my-worker.syed123098.workers.dev", {
//     method: "POST",
//     body: JSON.stringify({
//         "jsonrpc":"2.0",
//         "method":"eth_getBlockByNumber",
//         "params":["0x2244", true],
//         "id":64
//     }),
//     headers: {
//         "Content-Type": "application/json"
//     }
// })).then((resp) => {
//     return resp.json()
// });

  }

}

