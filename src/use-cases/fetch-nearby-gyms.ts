import { GymsRepository, GymType } from '@/repositories/gyms-repository'

type FetchNearbyGymsRequest = {
  userLatitude: number
  userLongitude: number
}

type FetchNearbyGymsResponse = {
  gyms: GymType[]
}

export class FetchNearbyGyms {
  constructor(
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userLatitude,
    userLongitude
  }: FetchNearbyGymsRequest): Promise<FetchNearbyGymsResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    })

    return { gyms }
  }
}
