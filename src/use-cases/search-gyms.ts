import { GymsRepository, GymType } from '@/repositories/gyms-repository'

type Params = {
  query: string
  page: number
}

type SearchGymsResponse = {
  gyms: GymType[]
}

export class SearchGyms {
  constructor(
    private gymsRepository: GymsRepository
  ) {}

  async execute({ query, page }: Params): Promise<SearchGymsResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
