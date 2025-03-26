import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type Params = {
  userId: string
}

type GetUserMetricsResponse = {
  checkInsCount: number
}

export class GetUserMetrics {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({ userId }: Params): Promise<GetUserMetricsResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
