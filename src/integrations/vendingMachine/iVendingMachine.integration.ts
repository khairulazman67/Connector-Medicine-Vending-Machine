export interface IVendingMachineIntegration {
  sendRequest(message: string): Promise<void>;
}
