import { inject, injectable } from "tsyringe";
import { IFasyankesRepository } from "../../repositories/fasyankesRepository/iFasyankes.repository";
import { NotFoundError } from "../../utils/errors/dynamicCustom.error";
import { IFasyankesService } from "./iFasyankes.service";

@injectable()
export class FasyankesService implements IFasyankesService {
  constructor(
    @inject("IFasyankesRepository")
    private iFasyankesRepository: IFasyankesRepository
  ) {}

  async getFasyankesByFasyankesCode(fasyankesCode: string) {
    const fasyankes = await this.iFasyankesRepository.getByFasyankesCode(
      fasyankesCode
    );

    if (fasyankes === null) {
      throw new NotFoundError("Fasyankes belum terdaftar pada vending machine");
    }

    return fasyankes;
  }
}
