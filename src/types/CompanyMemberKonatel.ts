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
  obchodne_meno: string,
  nationality: string,
  city: string
  psc: string
  je_konatel: true
  added_from_zakladatelia?: boolean,
  has_change?: boolean, // edit company
  should_be_canceled?: boolean, // edit company  
  cancel_from_date?: string // edit company
  new_konatel_date_from?: string // edit company
}
