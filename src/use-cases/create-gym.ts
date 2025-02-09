import { GymsRepository, GymType } from '@/repositories/gyms-repository'

type Params = {
  user_id: string
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

  async execute({ user_id, title, description, phone, latitude, longitude }: Params): Promise<CreateGymResponse> {
    const gym = await this.gymsRepository.create({
      user_id,
      title,
      description,
      phone,
      latitude,
      longitude
    })

    return { gym }
  }
}

