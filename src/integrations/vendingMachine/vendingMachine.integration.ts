import axios from "axios";
import { inject, injectable } from "tsyringe";
import { IVendingMachineRepository } from "../../repositories/vendingMachineRepository/iVendingMachine.repository";
import { baseAdapter } from "../../utils/adapter/axiosAdapter";
import { BadGateway } from "../../utils/errors/dynamicCustom.error";
import { IVendingMachineIntegration } from "./iVendingMachine.integration";

@injectable()
export class VendingMachineIntegration implements IVendingMachineIntegration {
  constructor(
    @inject("IVendingMachineRepository")
    private vendingMachineRepository: IVendingMachineRepository
  ) {}
  async sendRequest(vmUrl: string, payload: string) {
    const axiosInstance = axios.create({
      adapter: baseAdapter,
    });

    vmUrl = vmUrl + "/data";

    await axiosInstance
      .post(vmUrl, payload)
      .then((response) => {
        console.log("Data:", response.data);
      })
      .catch((err) => {
        console.log("ini errornya ", err);
        throw new BadGateway("send request to vending machine");
      });
  }
}
