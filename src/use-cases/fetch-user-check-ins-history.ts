import { CheckIn as CheckInModel } from '@prisma/client'

import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type Params = {
  userId: string
  page: number
}

type FetchUserCheckInsHistoryResponse = {
  checkIns: CheckInModel[]
}

export class FetchUserCheckInsHistory {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({ userId, page }: Params): Promise<FetchUserCheckInsHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    if(!checkIns) throw new ResourceNotFoundError()

    return { checkIns }
  }
}
