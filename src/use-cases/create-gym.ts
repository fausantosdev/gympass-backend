import { GymsRepository, GymType } from '@/repositories/gyms-repository'

type Params = {
  title: string
  description?: string
  phone?: string
  latitude: number
  longitude: number
}

type CreateGymResponse = {
  gym: GymType
}

export class CreateGym {
  constructor(
    private gymsRepository: GymsRepository
  ) {}

  async execute({ title, description, phone, latitude, longitude }: Params): Promise<CreateGymResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    })

    return { gym }
  }
}

