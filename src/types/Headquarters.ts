export default interface Headquarters {
  id?: string | number
  name: string
  price: number
  description: string
  registry: boolean
  forwarding: boolean
  scanning: boolean
  shredding: boolean
  is_virtual: boolean
  img: string
  owner_name: string
  headquarters_type: number
  address_id: number
}
