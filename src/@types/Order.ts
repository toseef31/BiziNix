export default interface Order {
  id: number
  is_paid: boolean
  amount: number
  description: string
  payment_date: string
  payment_method: string
  user_id: number
  company_id: number
  is_tos_accepted: boolean
  is_advocate_requested: boolean
  fakturacne_udaje_id: number
  first_name: string
  last_name: string
  company_name: string
  updated_at: Date
}
