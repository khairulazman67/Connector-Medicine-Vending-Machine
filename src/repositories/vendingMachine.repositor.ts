import { prisma } from "../db";
import { VendingMachinePayload } from "../utils/validations/VendingMachineValidation";

export const getAllVendingMachine = async () => {
  const data = await prisma.vendingMachine.findMany();
  return data;
};

export const getUniqueVendingMachine = async (vmId: number) => {
  const data = await prisma.vendingMachine.findUnique({
    where: {
      id: vmId,
    },
  });
  return data;
};

export const insertVendingMachine = async (data: VendingMachinePayload) => {
  const dataSave = data;

  const saveData = await prisma.vendingMachine.create({
    data: {
      name: dataSave.name,
      isPaperlessHospital: dataSave.is_paperless_hospital,
    },
  });

  if (!saveData) {
    return {
      message: "an error occurred in the system",
    };
  }

  return {
    message: "Vending machine added successfully",
    data: saveData,
  };
};

export const updateVendingMachine = async (vmId: number, data: any) => {
  const findData = await getUniqueVendingMachine(vmId);

  if (!findData) {
    return {
      message: "Vending machine not found",
    };
  }
  const dataSave = await prisma.vendingMachine.update({
    where: {
      id: vmId,
    },
    data: {
      name: data.name,
      isPaperlessHospital: data.is_paperless_hospital,
    },
  });

  return {
    message: "Vending machine updated successfully",
    data: dataSave,
  };
};

export const destroyVendingMachine = async (vmId: number) => {
  await prisma.vendingMachine.delete({
    where: {
      id: vmId,
    },
  });

  return {
    message: "Vending machine deleted successfully",
  };
};
