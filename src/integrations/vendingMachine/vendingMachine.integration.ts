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
      .post("/data", message)
      .then((response) => {
        console.log("Data:", response.data);
      })
      .catch(() => {
        throw new BadGateway("send request to vending machine");
      });
  }
}
