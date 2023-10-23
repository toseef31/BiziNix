export default interface User {
  id?: number
  type: number
  email: string
  phone: string
  first_name: string
  last_name: string
  title_before?: string
  title_after?: string
  status: number
  gender?: string
  password: string
  password_confirmation: string
  date_of_birth?: string
  rodne_cislo?: string
  address_id?: number
  typ_baliku: number
  created_at: string
  updated_at: string
  email_verified_at: string
  deleted_at: null
  zaplatene_do: string
}

