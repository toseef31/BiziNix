export default interface CompanyMemberSpolocnik {
  id?: number | null | string
  company_id: number | null
  first_name: string
  last_name: string
  title_before: string
  title_after: string
  gender: string
  rodne_cislo: string
  date_of_birth: string
  ico?: string
  street: string
  street_number: string
  street_number2: string
  country: string
  city: string
  psc: string
  nationality: string
  typ_zakladatela?: number | null | string
  obchodne_meno: string
  vyska_vkladu?: number | null
  podiel_v_spolocnosti?: number | null
  rozsah_splatenia_vkladu?: number | null
  je_spravca_vkladu?: boolean
  je_zakladatel: true
  je_konatel?: boolean
  typ_dokladu_totoznosti?: string
  cislo_dokladu_totoznosti?: string,
  has_change?: boolean,
  zastupitel?: {
    first_name: string,
    last_name: string,
    date_of_birth: string,
    rodne_cislo: string
    je_zastupitel: true
  }
}
