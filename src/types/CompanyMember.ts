export default interface CompanyMember {
  id: null
  company_id: number
  first_name: string
  last_name: string
  title_before: string
  title_after: string
  gender: string
  address_id: number
  typ_zakladatela: number
  vyska_vkladu: number
  podiel_v_spolocnosti: number
  rozsah_splatenia_vkladu: number
  je_spravca_vkladu: boolean
  je_zakladatel: boolean
  je_konatel: boolean
  typ_dokladu_totoznosti: string
  cislo_dokladu_totoznosti: string
}
