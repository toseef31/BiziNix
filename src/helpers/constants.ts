const COUNTRIES = [
  "Slovensko",
  "Česká republika",
  "Afganistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia (Hrvatska)",
  "Cuba",
  "Cyprus",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "France, Metropolitan",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard and Mc Donald Islands",
  "Holy See (Vatican City State)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, Democratic People's Republic of",
  "Korea, Republic of",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libyan Arab Jamahiriya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia, The Former Yugoslav Republic of",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova, Republic of",
  "Monaco",
  "Mongolia",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint LUCIA",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "Spain",
  "Sri Lanka",
  "St. Helena",
  "St. Pierre and Miquelon",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen Islands",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna Islands",
  "Western Sahara",
  "Yemen",
  "Serbia",
  "Zambia",
  "Zimbabwe",
  "Montenegro",
  "St. Vincent and Grenadines",
  "Curaçao",
  "Jersey",
  "Guernsey",
  "South Sudan",
  "Kosovo",
  "Croatia",
];
const CURRENCIES = [
  { label: "€", value: "€" },
  { label: "Kč", value: "Kč" },
  { label: "USD", value: "USD" },
  { label: "£", value: "£" },
  { label: "HUF", value: "HUF" },
  { label: "PLN", value: "PLN" },
  { label: "CHF", value: "CHF" },
  { label: "RUB", value: "RUB" },
  { label: "¥", value: "¥" },
  { label: "SEK", value: "SEK" },
  { label: "AUD", value: "AUD" },
  { label: "NOK", value: "NOK" },
  { label: "CAD", value: "CAD" },
  { label: "RON", value: "RON" },
  { label: "LKR", value: "LKR" },
  { label: "DKK", value: "DKK" },
  { label: "JPY", value: "JPY" },
  { label: "HRK", value: "HRK" },
  { label: "RSD", value: "RSD" },
  { label: "BGN", value: "BGN" },
  { label: "MXN", value: "MXN" },
];
const UNITS = [
  { label: "ks.", value: "ks" },
  { label: "hod.", value: "hod" },
  { label: "m", value: "m" },
  { label: "km", value: "km" },
  { label: "bm", value: "bm" },
  { label: "m2", value: "m2" },
  { label: "m3", value: "m3" },
  { label: "kg", value: "kg" },
  { label: "mesiace", value: "mesiace" },
  { label: "osoba", value: "osoba" },
];
const PAYMENT_TYPES = [
  { label: "Bankový prevod", value: "bankovy_prevod" },
  { label: "Hotovosť", value: "hotovost" },
  { label: "Paypal", value: "paypal" },
  { label: "Trustpay", value: "trustpay" },
  { label: "Besteron", value: "besteron" },
  { label: "Kreditná karta", value: "kreditna_karta" },
  { label: "Debetná karta", value: "debetna_karta" },
  { label: "Dobierka", value: "dobierka" },
  { label: "Vzájomný zápočet", value: "vzajomny_zapocet" },
  { label: "GoPay", value: "gopay" },
  { label: "Viamo", value: "viamo" },
  { label: "Poštový poukaz", value: "postovy_poukaz" },
];
const DELIVERY_TYPES = [
  { label: "Osobný odber", value: "osobny" },
  { label: "Poštou", value: "posta" },
  { label: "Kuriérom", value: "kurier" },
  { label: "Nákladná doprava", value: "nakladna" },
  { label: "Odberné miesto", value: "odberne_miesto" },
];
const DUES = [
  { label: "14 dní", value: "14" },
  { label: "Dátum vystavenia", value: "datum_vystavenia" },
  { label: "1 deň", value: "1" },
  { label: "7 dní", value: "7" },
  { label: "30 dní", value: "30" },
  { label: "60 dní", value: "60" },
  { label: "Iné", value: "ine" },
];
const DOCUMENT_SUBTYPES = [
  { value: 1, label: "Faktúra" },
  { value: 2, label: "Zálohová faktúra" },
  { value: 3, label: "Dobropis" },
  { value: 4, label: "Cenová ponuka" },
  { value: 5, label: "Objednávka" },
];


export default {
  COUNTRIES: COUNTRIES,
  CURRENCIES: CURRENCIES,
  UNITS: UNITS,
  PAYMENT_TYPES: PAYMENT_TYPES,
  DELIVERY_TYPES: DELIVERY_TYPES,
  DUES: DUES,
  DOCUMENT_SUBTYPES: DOCUMENT_SUBTYPES  
}
