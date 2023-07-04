export default interface Order {
  id: number
  is_paid: boolean
  amount: number
  amount_vat: number
  description: string
  payment_date: string
  payment_method: string
  user_id: number
  company_id: number
  is_tos_accepted: boolean
  is_advocate_requested: boolean
  fakturacne_udaje_id: number
  fakturacne_udaje: [{
    first_name: string,
    last_name: string,
    name: string,
    ico: string,
    dic: string,
    ic_dph: string,
    address_id: number
  }],
  first_name: string
  last_name: string
  company_name: string
  updated_at: Date
  items: {
    price: number,
    price_vat: number,
    description: string
  }[],
}
