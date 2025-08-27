export interface IVendingMachineIntegration {
  sendRequest(vmUrl: string, message: string): Promise<void>;
}
