type GymType = {
  id: string
  title: string
  description?: string
  phone?: string
  latitude: number | any
  longitude: number | any
  created_at: Date
  updated_at: Date
}

type CreateGymType = {
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
