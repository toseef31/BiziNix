export default interface Company {
  id: number
  name: string
  type: number
  status: number
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
  subjects_of_business:[{
    id: number | null | undefined,
    title: string | null | undefined,
    price: number | null | undefined,
    description:string | null | undefined,
    category_id: number | null | undefined
  }],
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
