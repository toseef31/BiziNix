export default interface Doklad {
  id: number;
  type: number;
  subtype: number;
  company_id: number;
  odberatel: string;
  contact_person: string;
  address: string;
  psc: string;
  city: string;
  country: string;
  ico: string;
  dic: string;
  icdph: string;
  serial_number: string;
  variabilny: string;
  konstantny: string;
  specificky: string;
  note_above: string;
  items: Array<{
    name: string;
    description: string;
    quantity: number;
    unit: string;
    total: number;
    total_vat: number;
    vat: number;
    unit_price: number;
  }>;
  note_under: string;
  date_of_issue: string;
  due_by: string;
  due_by_date: string;
  delivery_method: string;
  delivery_date: string;
  payment_method: string;
  payment_date: string;
  currency: string;
  pdf: string;
  isIssued: boolean;
  paid: number;
  isPaid: boolean;
  reminder_sent: boolean;
  company_name: string;
  updated_at: Date;
  created_at: Date;
  overdue: string;
  total: number;
  total_vat: number;
  total_topay: number;
  bank_account_id: number;
}
