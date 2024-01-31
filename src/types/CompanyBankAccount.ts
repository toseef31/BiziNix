export default interface CompanyBankAccount {
  id: number
  account_name: string
  bank_name: string
  iban: string
  account_number: string
  swift: string
  bank_code: string
  is_main: boolean
  company_id: number
}
