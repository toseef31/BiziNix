export default interface Company {
  id: number
  name: string
  type: string
  status: string
  ico: string
  dic: string
  icdph: string
  imanie_vyska: number
  imanie_splatene: number
  headquarters_id: number
  is_dph: boolean
  registration_date: string
  konecny_uzivatelia_vyhod: number
  sposob_konania_konatelov: number
  owner: number
  last_step: number
  first_name: string
  last_name: string
  subjects_of_business: string
  note: string
  updated_at: Date
  is_hq_virtual: boolean
  sidlo_zaplatene_do: string
  fakturacia_zaplatene_do: string
  doc_template_id: number
  logo: string
}
