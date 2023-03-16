export default interface Doklad {
  id: number;
  type: number;
  subtype: number;
  company_id: number;
  odberatel: string;
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
  items: string;
  note_under: string;
  date_of_issue: string;
  due_by: string;
  delivery_method: string;
  delivery_date: string;
  payment_method: string;
  currency: string;
  pdf: string;
  isIssued: boolean;
  isPaid: boolean;
  company_name: string;
  updated_at: Date;
}
