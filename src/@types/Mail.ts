export default interface Mail {
  id: number;
  type: number;
  status: number;
  scan: string;
  company_id: number;
  sender: string;
  distribution_date: string;
  name: string;
  updated_at: Date;
  scan_requested: boolean;
  forward_requested: boolean;
  shred_requested: boolean;
}
