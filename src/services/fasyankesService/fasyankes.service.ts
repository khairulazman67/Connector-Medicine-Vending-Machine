import { inject, injectable } from "tsyringe";
import { IFasyankesRepository } from "../../repositories/fasyankesRepository/iFasyankes.repository";
import { IFasyankesService } from "./iFasyankes.service";

@injectable()
export class FasyankesService implements IFasyankesService {
  constructor(
    @inject("IFasyankesRepository")
    private iFasyankesRepository: IFasyankesRepository
  ) {}

  async getFasyankesByFasyankesCode(fasyankesCode: string) {
    return this.iFasyankesRepository.getByFasyankesCode(fasyankesCode);
  }
}
