export default interface CompanyBankAccount {
  id: number
  name: string
  iban: string
  account_number: string
  swift: string
  bank_code: string
  is_main: boolean
  company_id: number
}
