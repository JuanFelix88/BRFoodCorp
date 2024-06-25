import { AutoGenerateds } from "@/core/shared/entities/AutoGenerateds"
import { UUID } from "@/core/shared/entities/UUID"
import { Company } from "../entities/Company/Company"

export namespace CompanyRepository {
  export interface AddAuthorizedUserPayload {
    companyId: number
    userId: UUID
    authorId: UUID
  }

  export interface UpdatePayload {
    name: string
    ownerUserId: UUID
  }
}

export abstract class CompanyRepository {
  public abstract add(payload: Omit<Company, keyof AutoGenerateds>): Promise<Company>
  public abstract get(id: number): Promise<Company>
  public abstract getByAuthorizedUserId(userId: UUID): Promise<Company[]>
  public abstract update(
    companyId: number,
    payload: CompanyRepository.UpdatePayload,
  ): Promise<Company>
  public abstract addAuthorizedUsers(
    authorizes: CompanyRepository.AddAuthorizedUserPayload[],
  ): Promise<void>
  public abstract isUserAuthorized(companyId: number, userId: UUID): Promise<boolean>
  public abstract save(company: Company): Promise<void>
}