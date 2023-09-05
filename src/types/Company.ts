export default interface Company {
  id: number
  name: string
  type: number
  status: number
  sub_status: number
  ico: string
  dic: string
  icdph: string
  imanie_vyska: number
  imanie_splatene: number
  headquarters_id: number
  is_dph: boolean
  zaciatok_opravnenia: string
  konecny_uzivatelia_vyhod: number
  sposob_konania_konatelov: number
  owner: number
  last_step: number
  subjects_of_business: Array<{
    id: number | null,
    title: string | null,
    price: number | null,
    description:string | null,
    category_id: number | null
  }>,
  note: string
  updated_at: Date
  is_hq_virtual: boolean
  sidlo_zaplatene_do: string
  sidlo_typ_balika: string
  fakturacia_zaplatene_do: string
  doc_template_id: number
  doc_sncounters_id: number
  logo: string
}
