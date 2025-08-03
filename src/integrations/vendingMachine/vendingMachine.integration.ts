import axios from "axios";
import { baseAdapter } from "../../utils/adapter/axiosAdapter";
import { BadGateway } from "../../utils/errors/dynamicCustom.error";
import { IVendingMachineIntegration } from "./iVendingMachine.integration";

export class VendingMachineIntegration implements IVendingMachineIntegration {
  async sendRequest(message: string) {
    const axiosInstance = axios.create({
      adapter: baseAdapter,
    });

    await axiosInstance
      .post("http://192.168.1.3:8410/data", message)
      .then((response) => {
        console.log("Data:", response.data);
      })
      .catch((err) => {
        console.log('ini errornya ',err)
        throw new BadGateway("send request to vending machine");
      });
  }
}
