type GymType = {
  id: string
  user_id: string
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
  created_at: Date
  updated_at: Date
}

type CreateGymType = {
  user_id: string
  title: string
  description?: string
  phone?: string
  latitude: number
  longitude: number
}

type FindManyNearbyParams = {
  latitude: number
  longitude: number
}

interface GymsRepository {
  create(data: CreateGymType): Promise<GymType>
  findById(id: string): Promise<GymType | null>
  searchMany(query: string, page: number): Promise<GymType[]>
  findManyNearby({ latitude, longitude }: FindManyNearbyParams): Promise<GymType[]>
}

export {
  GymsRepository,
  GymType,
  CreateGymType,
  FindManyNearbyParams
}
