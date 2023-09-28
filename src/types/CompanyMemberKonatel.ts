export default interface CompanyMemberKonatel {
  id?: number | null | string
  company_id: number | null
  first_name: string
  last_name: string
  title_before: string
  title_after: string
  gender: string
  rodne_cislo: string
  date_of_birth: string
  street: string
  street_number: string
  street_number2: string
  country: string
  city: string
  psc: string
  je_konatel: boolean
  addedFromZakladatelia: boolean
}
