<template>
  <div
    class="min-h-screen bg-cover bg-no-repeat bg-fixed bg-center"
    style="background-image: url('../src/assets/2.png')"
  >
    <div
      class="w-full min-h-screen flex justify-center"
      style="background-image: linear-gradient(to top,rgba(17, 24, 39, 0.85) 0%,rgba(17, 24, 39, 1) 100%);"
    >
      <form
        class=""
        enctype="multipart/form-data"
        action="#"
        method="post"
      >
        <section>
          <h3 class="text-3xl font-bold text-center py-20 text-white">
            Vystavte si faktúru zadarmo
          </h3>

          <div class="flex">
            <section class="flex basis-1/2 flex-col px-8">
              <div class="flex py-2 justify-between">
                <label for="supplier-name" class="flex basis-1/3 text-white"
                  >Vaša firma</label
                >
                <input
                  autocomplete="nope"
                  id="supplier-name"
                  name="data[MyData][company_name]"
                  class="flex w-full"
                  type="text"
                  placeholder="Meno alebo IČO vašej firmy …"
                />
              </div>

              <div class="flex flex-col">
                <div class="flex pb-2 justify-between">
                  <label
                    for="supplier-address"
                    class="flex basis-1/3 text-white"
                    >Adresa</label
                  >
                  <input
                    autocomplete="nope"
                    id="supplier-address"
                    name="data[MyData][address]"
                    class="flex w-full"
                    type="text"
                  />
                </div>
                <div class="flex pb-2 justify-between">
                  <label for="supplier-zip" class="text-white basis-1/3"
                    >PSČ</label
                  >
                  <input
                    autocomplete="nope"
                    id="supplier-zip"
                    name="data[MyData][zip]"
                    class="w-full"
                    type="text"
                  />
                </div>
                <div class="flex pb-2 justify-between">
                  <label for="supplier-city" class="text-white basis-1/3"
                    >Mesto</label
                  >
                  <input
                    autocomplete="nope"
                    id="supplier-city"
                    name="data[MyData][city]"
                    class="w-full"
                    type="text"
                  />
                </div>
                <div class="flex pb-2 justify-between">
                  <label for="supplier-country" class="text-white basis-1/3"
                    >Krajina</label
                  >
                  <select
                    id="supplier-country"
                    name="data[MyData][country_id]"
                    class="flex w-full"
                  >
                    <option value=""></option>
                    <option value="191">Slovensko</option>
                    <option value="57">Česká republika</option>
                    <option value="1">Afganistan</option>
                    <option value="2">Albania</option>
                    <option value="3">Algeria</option>
                    <option value="4">American Samoa</option>
                    <option value="5">Andorra</option>
                    <option value="6">Angola</option>
                    <option value="7">Anguilla</option>
                    <option value="8">Antarctica</option>
                    <option value="9">Antigua and Barbuda</option>
                    <option value="10">Argentina</option>
                    <option value="11">Armenia</option>
                    <option value="12">Aruba</option>
                    <option value="13">Australia</option>
                    <option value="14">Austria</option>
                    <option value="15">Azerbaijan</option>
                    <option value="16">Bahamas</option>
                    <option value="17">Bahrain</option>
                    <option value="18">Bangladesh</option>
                    <option value="19">Barbados</option>
                    <option value="20">Belarus</option>
                    <option value="21">Belgium</option>
                    <option value="22">Belize</option>
                    <option value="23">Benin</option>
                    <option value="24">Bermuda</option>
                    <option value="25">Bhutan</option>
                    <option value="26">Bolivia</option>
                    <option value="27">Bosnia and Herzegovina</option>
                    <option value="28">Botswana</option>
                    <option value="29">Bouvet Island</option>
                    <option value="30">Brazil</option>
                    <option value="31">British Indian Ocean Territory</option>
                    <option value="32">Brunei Darussalam</option>
                    <option value="33">Bulgaria</option>
                    <option value="34">Burkina Faso</option>
                    <option value="35">Burundi</option>
                    <option value="36">Cambodia</option>
                    <option value="37">Cameroon</option>
                    <option value="38">Canada</option>
                    <option value="39">Cape Verde</option>
                    <option value="40">Cayman Islands</option>
                    <option value="41">Central African Republic</option>
                    <option value="42">Chad</option>
                    <option value="43">Chile</option>
                    <option value="44">China</option>
                    <option value="45">Christmas Island</option>
                    <option value="46">Cocos (Keeling) Islands</option>
                    <option value="47">Colombia</option>
                    <option value="48">Comoros</option>
                    <option value="49">Congo</option>
                    <option value="50">
                      Congo, the Democratic Republic of the
                    </option>
                    <option value="51">Cook Islands</option>
                    <option value="52">Costa Rica</option>
                    <option value="53">Cote d'Ivoire</option>
                    <option value="54">Croatia (Hrvatska)</option>
                    <option value="55">Cuba</option>
                    <option value="56">Cyprus</option>
                    <option value="58">Denmark</option>
                    <option value="59">Djibouti</option>
                    <option value="60">Dominica</option>
                    <option value="61">Dominican Republic</option>
                    <option value="62">East Timor</option>
                    <option value="63">Ecuador</option>
                    <option value="64">Egypt</option>
                    <option value="65">El Salvador</option>
                    <option value="66">Equatorial Guinea</option>
                    <option value="67">Eritrea</option>
                    <option value="68">Estonia</option>
                    <option value="69">Ethiopia</option>
                    <option value="70">Falkland Islands (Malvinas)</option>
                    <option value="71">Faroe Islands</option>
                    <option value="72">Fiji</option>
                    <option value="73">Finland</option>
                    <option value="74">France</option>
                    <option value="75">France, Metropolitan</option>
                    <option value="76">French Guiana</option>
                    <option value="77">French Polynesia</option>
                    <option value="78">French Southern Territories</option>
                    <option value="79">Gabon</option>
                    <option value="80">Gambia</option>
                    <option value="81">Georgia</option>
                    <option value="82">Germany</option>
                    <option value="83">Ghana</option>
                    <option value="84">Gibraltar</option>
                    <option value="85">Greece</option>
                    <option value="86">Greenland</option>
                    <option value="87">Grenada</option>
                    <option value="88">Guadeloupe</option>
                    <option value="89">Guam</option>
                    <option value="90">Guatemala</option>
                    <option value="91">Guinea</option>
                    <option value="92">Guinea-Bissau</option>
                    <option value="93">Guyana</option>
                    <option value="94">Haiti</option>
                    <option value="95">Heard and Mc Donald Islands</option>
                    <option value="96">Holy See (Vatican City State)</option>
                    <option value="97">Honduras</option>
                    <option value="98">Hong Kong</option>
                    <option value="99">Hungary</option>
                    <option value="100">Iceland</option>
                    <option value="101">India</option>
                    <option value="102">Indonesia</option>
                    <option value="103">Iran (Islamic Republic of)</option>
                    <option value="104">Iraq</option>
                    <option value="105">Ireland</option>
                    <option value="106">Israel</option>
                    <option value="107">Italy</option>
                    <option value="108">Jamaica</option>
                    <option value="109">Japan</option>
                    <option value="110">Jordan</option>
                    <option value="111">Kazakhstan</option>
                    <option value="112">Kenya</option>
                    <option value="113">Kiribati</option>
                    <option value="114">
                      Korea, Democratic People's Republic of
                    </option>
                    <option value="115">Korea, Republic of</option>
                    <option value="116">Kuwait</option>
                    <option value="117">Kyrgyzstan</option>
                    <option value="118">
                      Lao People's Democratic Republic
                    </option>
                    <option value="119">Latvia</option>
                    <option value="120">Lebanon</option>
                    <option value="121">Lesotho</option>
                    <option value="122">Liberia</option>
                    <option value="123">Libyan Arab Jamahiriya</option>
                    <option value="124">Liechtenstein</option>
                    <option value="125">Lithuania</option>
                    <option value="126">Luxembourg</option>
                    <option value="127">Macau</option>
                    <option value="128">
                      Macedonia, The Former Yugoslav Republic of
                    </option>
                    <option value="129">Madagascar</option>
                    <option value="130">Malawi</option>
                    <option value="131">Malaysia</option>
                    <option value="132">Maldives</option>
                    <option value="133">Mali</option>
                    <option value="134">Malta</option>
                    <option value="135">Marshall Islands</option>
                    <option value="136">Martinique</option>
                    <option value="137">Mauritania</option>
                    <option value="138">Mauritius</option>
                    <option value="139">Mayotte</option>
                    <option value="140">Mexico</option>
                    <option value="141">Micronesia, Federated States of</option>
                    <option value="142">Moldova, Republic of</option>
                    <option value="143">Monaco</option>
                    <option value="144">Mongolia</option>
                    <option value="145">Montserrat</option>
                    <option value="146">Morocco</option>
                    <option value="147">Mozambique</option>
                    <option value="148">Myanmar</option>
                    <option value="149">Namibia</option>
                    <option value="150">Nauru</option>
                    <option value="151">Nepal</option>
                    <option value="152">Netherlands</option>
                    <option value="153">Netherlands Antilles</option>
                    <option value="154">New Caledonia</option>
                    <option value="155">New Zealand</option>
                    <option value="156">Nicaragua</option>
                    <option value="157">Niger</option>
                    <option value="158">Nigeria</option>
                    <option value="159">Niue</option>
                    <option value="160">Norfolk Island</option>
                    <option value="161">Northern Mariana Islands</option>
                    <option value="162">Norway</option>
                    <option value="163">Oman</option>
                    <option value="164">Pakistan</option>
                    <option value="165">Palau</option>
                    <option value="166">Panama</option>
                    <option value="167">Papua New Guinea</option>
                    <option value="168">Paraguay</option>
                    <option value="169">Peru</option>
                    <option value="170">Philippines</option>
                    <option value="171">Pitcairn</option>
                    <option value="172">Poland</option>
                    <option value="173">Portugal</option>
                    <option value="174">Puerto Rico</option>
                    <option value="175">Qatar</option>
                    <option value="176">Reunion</option>
                    <option value="177">Romania</option>
                    <option value="178">Russian Federation</option>
                    <option value="179">Rwanda</option>
                    <option value="180">Saint Kitts and Nevis</option>
                    <option value="181">Saint LUCIA</option>
                    <option value="182">
                      Saint Vincent and the Grenadines
                    </option>
                    <option value="183">Samoa</option>
                    <option value="184">San Marino</option>
                    <option value="185">Sao Tome and Principe</option>
                    <option value="186">Saudi Arabia</option>
                    <option value="187">Senegal</option>
                    <option value="188">Seychelles</option>
                    <option value="189">Sierra Leone</option>
                    <option value="190">Singapore</option>
                    <option value="192">Slovenia</option>
                    <option value="193">Solomon Islands</option>
                    <option value="194">Somalia</option>
                    <option value="195">South Africa</option>
                    <option value="196">
                      South Georgia and the South Sandwich Islands
                    </option>
                    <option value="197">Spain</option>
                    <option value="198">Sri Lanka</option>
                    <option value="199">St. Helena</option>
                    <option value="200">St. Pierre and Miquelon</option>
                    <option value="201">Sudan</option>
                    <option value="202">Suriname</option>
                    <option value="203">Svalbard and Jan Mayen Islands</option>
                    <option value="204">Swaziland</option>
                    <option value="205">Sweden</option>
                    <option value="206">Switzerland</option>
                    <option value="207">Syrian Arab Republic</option>
                    <option value="208">Taiwan</option>
                    <option value="209">Tajikistan</option>
                    <option value="210">Tanzania, United Republic of</option>
                    <option value="211">Thailand</option>
                    <option value="212">Togo</option>
                    <option value="213">Tokelau</option>
                    <option value="214">Tonga</option>
                    <option value="215">Trinidad and Tobago</option>
                    <option value="216">Tunisia</option>
                    <option value="217">Turkey</option>
                    <option value="218">Turkmenistan</option>
                    <option value="219">Turks and Caicos Islands</option>
                    <option value="220">Tuvalu</option>
                    <option value="221">Uganda</option>
                    <option value="222">Ukraine</option>
                    <option value="223">United Arab Emirates</option>
                    <option value="224">United Kingdom</option>
                    <option value="225">United States</option>
                    <option value="226">
                      United States Minor Outlying Islands
                    </option>
                    <option value="227">Uruguay</option>
                    <option value="228">Uzbekistan</option>
                    <option value="229">Vanuatu</option>
                    <option value="230">Venezuela</option>
                    <option value="231">Viet Nam</option>
                    <option value="232">Virgin Islands (British)</option>
                    <option value="233">Virgin Islands (U.S.)</option>
                    <option value="234">Wallis and Futuna Islands</option>
                    <option value="235">Western Sahara</option>
                    <option value="236">Yemen</option>
                    <option value="237">Serbia</option>
                    <option value="238">Zambia</option>
                    <option value="239">Zimbabwe</option>
                    <option value="240">Montenegro</option>
                    <option value="241">St. Vincent and Grenadines</option>
                    <option value="242">Curaçao</option>
                    <option value="243">Jersey</option>
                    <option value="244">Guernsey</option>
                    <option value="245">South Sudan</option>
                    <option value="246">Kosovo</option>
                    <option value="247">Croatia</option>
                  </select>
                </div>
                <div class="flex pb-2 justify-between">
                  <label for="supplier-ico" class="text-white basis-1/3"
                    >IČO</label
                  >
                  <input
                    autocomplete="nope"
                    id="supplier-ico"
                    name="data[MyData][ico]"
                    class="w-full"
                    type="text"
                  />
                </div>

                <div class="flex pb-2 justify-between">
                  <label for="supplier-dic" class="text-white basis-1/3"
                    >DIČ</label
                  >
                  <input
                    autocomplete="nope"
                    id="supplier-dic"
                    name="data[MyData][dic]"
                    class="w-full"
                    type="text"
                  />
                </div>

                <div class="flex justify-between">
                  <label for="supplier-icdph" class="text-white basis-1/3"
                    >IČ DPH</label
                  >
                  <input
                    autocomplete="nope"
                    id="supplier-icdph"
                    name="data[MyData][ic_dph]"
                    class="w-full"
                    type="text"
                  />
                </div>
              </div>
            </section>

            <section class="flex basis-1/2 flex-col">
              <div class="flex py-2 justify-between">
                <label for="client-name" class="flex text-white basis-1/3"
                  >Odberateľ</label
                >
                <input
                  autocomplete="nope"
                  id="client-name"
                  name="data[Client][name]"
                  class="flex w-full"
                  type="text"
                  placeholder="Meno alebo IČO odberateľa …"
                />
              </div>

              <div class="flex flex-col">
                <div class="flex pb-2 justify-between">
                  <label for="client-address" class="flex text-white basis-1/3"
                    >Adresa</label
                  >
                  <input
                    autocomplete="nope"
                    id="client-address"
                    name="data[Client][address]"
                    class="w-full"
                    type="text"
                  />
                </div>
                <div class="flex pb-2 justify-between">
                  <label for="client-zip" class="flex text-white basis-1/3"
                    >PSČ</label
                  >
                  <input
                    autocomplete="nope"
                    id="client-zip"
                    name="data[Client][zip]"
                    class="w-full"
                    type="text"
                  />
                </div>
                <div class="flex pb-2 justify-between">
                  <label for="client-city" class="flex text-white basis-1/3">Mesto</label>
                  <input
                    autocomplete="nope"
                    id="client-city"
                    name="data[Client][city]"
                    class="w-full"
                    type="text"
                  />
                </div>
                <div class="flex pb-2 justify-between">
                  <label for="client-country" class="flex text-white basis-1/3"
                    >Krajina</label
                  >
                  <select
                    id="client-country"
                    name="data[Client][country_id]"
                    class="flex w-full"
                  >
                    <option value=""></option>
                    <option value="191">Slovensko</option>
                    <option value="57">Česká republika</option>
                    <option value="1">Afganistan</option>
                    <option value="2">Albania</option>
                    <option value="3">Algeria</option>
                    <option value="4">American Samoa</option>
                    <option value="5">Andorra</option>
                    <option value="6">Angola</option>
                    <option value="7">Anguilla</option>
                    <option value="8">Antarctica</option>
                    <option value="9">Antigua and Barbuda</option>
                    <option value="10">Argentina</option>
                    <option value="11">Armenia</option>
                    <option value="12">Aruba</option>
                    <option value="13">Australia</option>
                    <option value="14">Austria</option>
                    <option value="15">Azerbaijan</option>
                    <option value="16">Bahamas</option>
                    <option value="17">Bahrain</option>
                    <option value="18">Bangladesh</option>
                    <option value="19">Barbados</option>
                    <option value="20">Belarus</option>
                    <option value="21">Belgium</option>
                    <option value="22">Belize</option>
                    <option value="23">Benin</option>
                    <option value="24">Bermuda</option>
                    <option value="25">Bhutan</option>
                    <option value="26">Bolivia</option>
                    <option value="27">Bosnia and Herzegovina</option>
                    <option value="28">Botswana</option>
                    <option value="29">Bouvet Island</option>
                    <option value="30">Brazil</option>
                    <option value="31">British Indian Ocean Territory</option>
                    <option value="32">Brunei Darussalam</option>
                    <option value="33">Bulgaria</option>
                    <option value="34">Burkina Faso</option>
                    <option value="35">Burundi</option>
                    <option value="36">Cambodia</option>
                    <option value="37">Cameroon</option>
                    <option value="38">Canada</option>
                    <option value="39">Cape Verde</option>
                    <option value="40">Cayman Islands</option>
                    <option value="41">Central African Republic</option>
                    <option value="42">Chad</option>
                    <option value="43">Chile</option>
                    <option value="44">China</option>
                    <option value="45">Christmas Island</option>
                    <option value="46">Cocos (Keeling) Islands</option>
                    <option value="47">Colombia</option>
                    <option value="48">Comoros</option>
                    <option value="49">Congo</option>
                    <option value="50">
                      Congo, the Democratic Republic of the
                    </option>
                    <option value="51">Cook Islands</option>
                    <option value="52">Costa Rica</option>
                    <option value="53">Cote d'Ivoire</option>
                    <option value="54">Croatia (Hrvatska)</option>
                    <option value="55">Cuba</option>
                    <option value="56">Cyprus</option>
                    <option value="58">Denmark</option>
                    <option value="59">Djibouti</option>
                    <option value="60">Dominica</option>
                    <option value="61">Dominican Republic</option>
                    <option value="62">East Timor</option>
                    <option value="63">Ecuador</option>
                    <option value="64">Egypt</option>
                    <option value="65">El Salvador</option>
                    <option value="66">Equatorial Guinea</option>
                    <option value="67">Eritrea</option>
                    <option value="68">Estonia</option>
                    <option value="69">Ethiopia</option>
                    <option value="70">Falkland Islands (Malvinas)</option>
                    <option value="71">Faroe Islands</option>
                    <option value="72">Fiji</option>
                    <option value="73">Finland</option>
                    <option value="74">France</option>
                    <option value="75">France, Metropolitan</option>
                    <option value="76">French Guiana</option>
                    <option value="77">French Polynesia</option>
                    <option value="78">French Southern Territories</option>
                    <option value="79">Gabon</option>
                    <option value="80">Gambia</option>
                    <option value="81">Georgia</option>
                    <option value="82">Germany</option>
                    <option value="83">Ghana</option>
                    <option value="84">Gibraltar</option>
                    <option value="85">Greece</option>
                    <option value="86">Greenland</option>
                    <option value="87">Grenada</option>
                    <option value="88">Guadeloupe</option>
                    <option value="89">Guam</option>
                    <option value="90">Guatemala</option>
                    <option value="91">Guinea</option>
                    <option value="92">Guinea-Bissau</option>
                    <option value="93">Guyana</option>
                    <option value="94">Haiti</option>
                    <option value="95">Heard and Mc Donald Islands</option>
                    <option value="96">Holy See (Vatican City State)</option>
                    <option value="97">Honduras</option>
                    <option value="98">Hong Kong</option>
                    <option value="99">Hungary</option>
                    <option value="100">Iceland</option>
                    <option value="101">India</option>
                    <option value="102">Indonesia</option>
                    <option value="103">Iran (Islamic Republic of)</option>
                    <option value="104">Iraq</option>
                    <option value="105">Ireland</option>
                    <option value="106">Israel</option>
                    <option value="107">Italy</option>
                    <option value="108">Jamaica</option>
                    <option value="109">Japan</option>
                    <option value="110">Jordan</option>
                    <option value="111">Kazakhstan</option>
                    <option value="112">Kenya</option>
                    <option value="113">Kiribati</option>
                    <option value="114">
                      Korea, Democratic People's Republic of
                    </option>
                    <option value="115">Korea, Republic of</option>
                    <option value="116">Kuwait</option>
                    <option value="117">Kyrgyzstan</option>
                    <option value="118">
                      Lao People's Democratic Republic
                    </option>
                    <option value="119">Latvia</option>
                    <option value="120">Lebanon</option>
                    <option value="121">Lesotho</option>
                    <option value="122">Liberia</option>
                    <option value="123">Libyan Arab Jamahiriya</option>
                    <option value="124">Liechtenstein</option>
                    <option value="125">Lithuania</option>
                    <option value="126">Luxembourg</option>
                    <option value="127">Macau</option>
                    <option value="128">
                      Macedonia, The Former Yugoslav Republic of
                    </option>
                    <option value="129">Madagascar</option>
                    <option value="130">Malawi</option>
                    <option value="131">Malaysia</option>
                    <option value="132">Maldives</option>
                    <option value="133">Mali</option>
                    <option value="134">Malta</option>
                    <option value="135">Marshall Islands</option>
                    <option value="136">Martinique</option>
                    <option value="137">Mauritania</option>
                    <option value="138">Mauritius</option>
                    <option value="139">Mayotte</option>
                    <option value="140">Mexico</option>
                    <option value="141">Micronesia, Federated States of</option>
                    <option value="142">Moldova, Republic of</option>
                    <option value="143">Monaco</option>
                    <option value="144">Mongolia</option>
                    <option value="145">Montserrat</option>
                    <option value="146">Morocco</option>
                    <option value="147">Mozambique</option>
                    <option value="148">Myanmar</option>
                    <option value="149">Namibia</option>
                    <option value="150">Nauru</option>
                    <option value="151">Nepal</option>
                    <option value="152">Netherlands</option>
                    <option value="153">Netherlands Antilles</option>
                    <option value="154">New Caledonia</option>
                    <option value="155">New Zealand</option>
                    <option value="156">Nicaragua</option>
                    <option value="157">Niger</option>
                    <option value="158">Nigeria</option>
                    <option value="159">Niue</option>
                    <option value="160">Norfolk Island</option>
                    <option value="161">Northern Mariana Islands</option>
                    <option value="162">Norway</option>
                    <option value="163">Oman</option>
                    <option value="164">Pakistan</option>
                    <option value="165">Palau</option>
                    <option value="166">Panama</option>
                    <option value="167">Papua New Guinea</option>
                    <option value="168">Paraguay</option>
                    <option value="169">Peru</option>
                    <option value="170">Philippines</option>
                    <option value="171">Pitcairn</option>
                    <option value="172">Poland</option>
                    <option value="173">Portugal</option>
                    <option value="174">Puerto Rico</option>
                    <option value="175">Qatar</option>
                    <option value="176">Reunion</option>
                    <option value="177">Romania</option>
                    <option value="178">Russian Federation</option>
                    <option value="179">Rwanda</option>
                    <option value="180">Saint Kitts and Nevis</option>
                    <option value="181">Saint LUCIA</option>
                    <option value="182">
                      Saint Vincent and the Grenadines
                    </option>
                    <option value="183">Samoa</option>
                    <option value="184">San Marino</option>
                    <option value="185">Sao Tome and Principe</option>
                    <option value="186">Saudi Arabia</option>
                    <option value="187">Senegal</option>
                    <option value="188">Seychelles</option>
                    <option value="189">Sierra Leone</option>
                    <option value="190">Singapore</option>
                    <option value="192">Slovenia</option>
                    <option value="193">Solomon Islands</option>
                    <option value="194">Somalia</option>
                    <option value="195">South Africa</option>
                    <option value="196">
                      South Georgia and the South Sandwich Islands
                    </option>
                    <option value="197">Spain</option>
                    <option value="198">Sri Lanka</option>
                    <option value="199">St. Helena</option>
                    <option value="200">St. Pierre and Miquelon</option>
                    <option value="201">Sudan</option>
                    <option value="202">Suriname</option>
                    <option value="203">Svalbard and Jan Mayen Islands</option>
                    <option value="204">Swaziland</option>
                    <option value="205">Sweden</option>
                    <option value="206">Switzerland</option>
                    <option value="207">Syrian Arab Republic</option>
                    <option value="208">Taiwan</option>
                    <option value="209">Tajikistan</option>
                    <option value="210">Tanzania, United Republic of</option>
                    <option value="211">Thailand</option>
                    <option value="212">Togo</option>
                    <option value="213">Tokelau</option>
                    <option value="214">Tonga</option>
                    <option value="215">Trinidad and Tobago</option>
                    <option value="216">Tunisia</option>
                    <option value="217">Turkey</option>
                    <option value="218">Turkmenistan</option>
                    <option value="219">Turks and Caicos Islands</option>
                    <option value="220">Tuvalu</option>
                    <option value="221">Uganda</option>
                    <option value="222">Ukraine</option>
                    <option value="223">United Arab Emirates</option>
                    <option value="224">United Kingdom</option>
                    <option value="225">United States</option>
                    <option value="226">
                      United States Minor Outlying Islands
                    </option>
                    <option value="227">Uruguay</option>
                    <option value="228">Uzbekistan</option>
                    <option value="229">Vanuatu</option>
                    <option value="230">Venezuela</option>
                    <option value="231">Viet Nam</option>
                    <option value="232">Virgin Islands (British)</option>
                    <option value="233">Virgin Islands (U.S.)</option>
                    <option value="234">Wallis and Futuna Islands</option>
                    <option value="235">Western Sahara</option>
                    <option value="236">Yemen</option>
                    <option value="237">Serbia</option>
                    <option value="238">Zambia</option>
                    <option value="239">Zimbabwe</option>
                    <option value="240">Montenegro</option>
                    <option value="241">St. Vincent and Grenadines</option>
                    <option value="242">Curaçao</option>
                    <option value="243">Jersey</option>
                    <option value="244">Guernsey</option>
                    <option value="245">South Sudan</option>
                    <option value="246">Kosovo</option>
                    <option value="247">Croatia</option>
                  </select>
                </div>
                <div class="flex pb-2 justify-between">
                  <label for="client-ico" class="flex text-white basis-1/3">IČO</label>
                  <input
                    autocomplete="nope"
                    id="client-ico"
                    name="data[Client][ico]"
                    class="w-full"
                    type="text"
                  />
                </div>

                <div class="flex pb-2 justify-between">
                  <label for="client-dic" class="flex text-white basis-1/3">DIČ</label>
                  <input
                    autocomplete="nope"
                    id="client-dic"
                    name="data[Client][dic]"
                    class="w-full"
                    type="text"
                  />
                </div>

                <div class="flex justify-between">
                  <label for="client-icdph" class="flex text-white basis-1/3"
                    >IČ DPH</label
                  >
                  <input
                    autocomplete="nope"
                    id="client-icdph"
                    name="data[Client][ic_dph]"
                    class="w-full"
                    type="text"
                  />
                </div>
              </div>
            </section>
          </div>

          <section class="flex justify-center py-8">
            <label class="text-white" for="">
              <input
                autocomplete="nope"
                type="hidden"
                name="data[MyData][tax_payer]"
                value="0"
              />
              <input
                autocomplete="nope"
                type="checkbox"
                id=""
                name="data[MyData][tax_payer]"
                value="1"
                class=""
              />
              Som platiteľ DPH
            </label>

            <label class="text-white">
              <input
                autocomplete="nope"
                type="hidden"
                name="data[Profile][company_type]"
                class=""
                value="unknown"
                id="invoice__company-type"
              />
            </label>
          </section>
        </section>
        <hr class="my-8 h-px bg-teal-500 border-0" />
        <section>
          <div class="flex flex-col">
            <div class="flex flex-row pb-8">
              <div
                class="flex flex-col basis-1/2 justify-between px-4"
                data-slot-target="invoice-number"
              >
                <label for="invoice__number" class="text-white pr-4"
                  >Číslo faktúry</label
                >
                <input
                  autocomplete="nope"
                  type="text"
                  id="invoice__number"
                  name="data[Invoice][invoice_no_formatted]"
                  class=""
                  placeholder="napr.: 2023001"
                />
              </div>
              <div
                class="flex flex-col basis-1/2 justify-between"
                data-slot="invoice-vs"
                data-slot-rule="non-mobile"
              >
                <label for="invoice__vs" class="text-white pr-4"
                  >Variabilný symbol</label
                >
                <input
                  autocomplete="nope"
                  type="text"
                  id="invoice__vs"
                  name="data[Invoice][variable]"
                  class=""
                />
              </div>
            </div>

            <div class="flex flex-row justify-between pb-8">
              <div class="flex basis-1/2 flex-col justify-between px-4">
                <label for="invoice__bank-name" class="text-white pr-4"
                  >Názov Vašej banky</label
                >
                <input
                  autocomplete="nope"
                  type="text"
                  id="invoice__bank-name"
                  name="data[MyData][BankAccount][0][bank_name]"
                  class=""
                />
              </div>

              <div class="flex basis-1/2 flex-col justify-between">
                <label for="invoice__bank-account" class="text-white pr-4"
                  >IBAN</label
                >
                <input
                  autocomplete="nope"
                  type="text"
                  id="invoice__bank-account"
                  name="data[MyData][BankAccount][0][iban]"
                  class=""
                />
                <input
                  autocomplete="nope"
                  type="hidden"
                  name="data[MyData][BankAccount][0][show_account]"
                  value="1"
                />
              </div>
            </div>

            <div class="flex flex-row">
              <div class="flex basis-1/2 flex-col justify-between px-4">
                <label for="invoice__bank-swift" class="text-white pr-4"
                  >SWIFT</label
                >
                <input
                  autocomplete="nope"
                  type="text"
                  id="invoice__bank-swift"
                  name="data[MyData][BankAccount][0][swift]"
                  class=""
                />
              </div>
            </div>
          </div>
          <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-300" />
          <div class="flex flex-col">
            <div class="flex flex-row">
              <div class="flex flex-col w-full justify-between px-4">
                <label for="comment__above" class="text-white"
                  >Poznámka nad položkami</label
                >
                <textarea
                  id="comment__above"
                  name="data[Invoice][header_comment]"
                ></textarea>
              </div>
            </div>
          </div>
          <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-300" />
          <div class="flex flex-col">
            <div class="text-white flex flex-row bg-gray-700 py-4 rounded-lg">
              <div class="text-white flex basis-3/12 pl-4">Názov položky</div>
              <div class="text-white flex basis-2/12">Počet</div>
              <div class="text-white flex basis-2/12">Jednotka</div>
              <div class="text-white flex basis-2/12">Cena €</div>
              <div class="text-white flex basis-2/12">DPH %</div>
              <div class="text-white flex basis-2/12 justify-end pr-4">Celkom €</div>
            </div>

            <ul class="py-2">
              <li>
                <div class="flex flex-row gap-1">
                    <div class="flex basis-3/12">
                        <input
                            autocomplete="nope"
                            class="flex"
                            name="data[InvoiceItem][0][name]"
                            id="item_0_name"
                            type="text"
                            placeholder="Zadajte názov položky"
                        />
                    </div>
                    <div class="flex basis-2/12">
                        <input
                            autocomplete="nope"
                            type="text"
                            id="item_0_quantity"
                            name="data[InvoiceItem][0][quantity]"
                            class="flex"
                            pattern="^([\d ]+([,.]\d+)?|[,.]?[\d ]+)$"
                            inputmode="decimal"
                        />
                    </div>
                    <div class="flex basis-2/12">
                        <select
                            class="flex"
                            id="item_0_unit"
                            name="data[InvoiceItem][0][unit]"
                        >
                            <option value=""></option>
                            <option value="ks.">ks.</option>
                            <option value="hod.">hod.</option>
                            <option value="m">m</option>
                            <option value="km">km</option>
                            <option value="bm">bm</option>
                            <option value="m2">m2</option>
                            <option value="m3">m3</option>
                            <option value="kg">kg</option>
                            <option value="mesiace">mesiace</option>
                            <option value="person">osoba</option>
                        </select>
                    </div>
                    <div class="flex basis-2/12">
                        <input
                            autocomplete="nope"
                            type="text"
                            name="data[InvoiceItem][0][unit_price]"
                            class="flex"
                            id="item_0_unit-price"
                            pattern="^-?(\d[\d ]*([,.]\d+)?|[,.]?\d[\d ]*)$"
                            inputmode="decimal"
                        />
                    </div>
                    <div class="flex basis-2/12">
                        <input
                            autocomplete="nope"
                            type="text"
                            name="data[InvoiceItem][0][tax]"
                            class="flex"
                            id="item_0_vat"
                            pattern="^(\d[\d ]*([,.]\d+)?|[,.]?\d[\d ]*)$"
                            inputmode="decimal"
                        />
                    </div>
                    <div class="flex basis-2/12">
                        <input
                            autocomplete="nope"
                            type="text"
                            class="flex"
                            id="item_0_total"
                            pattern="^-?(\d[\d ]*([,.]\d+)?|[,.]?\d[\d ]*)$"
                            inputmode="decimal"
                        />
                    </div>
                </div>

                <div class="flex flex-row py-4">
                    <div class="flex basis-3/4">
                        <textarea
                            name="data[InvoiceItem][0][description]"
                            class="w-full"
                            id="item_0_desc"
                            placeholder="Detailný popis položky…"
                        ></textarea>
                    </div>
                    <div class="flex basis-1/4 justify-end">
                        <button
                            type="button"
                            class="hover:bg-red-400 text-red-700 font-bold px-4 rounded-lg"
                            title="Vymazať položku"
                            value=""
                        >
                        Vymazať položku
                        </button>
                    </div>
                </div>
                <hr class="my-1 h-px bg-gray-500 border-0" />
              </li>
            </ul>
            
            

            <div class="flex flex-row pt-4">
              <button type="button" class="shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2">
                Pridať ďalšiu položku
              </button>
            </div>
          </div>
          <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-300" />
          <div class="flex flex-col">
            <div class="flex flex-row gap-8">
                <div class="flex basis-2/3 flex-col">
                    <label for="invoice__comment" class="text-white pb-2"
                      >Poznámka pod položkami</label
                    >
                    <textarea
                      id="invoice__comment"
                      name="data[Invoice][comment]"
                      class="w-full"
                    ></textarea>
                </div>

                <div class="flex basis-1/3 flex-col justify-center">
                    <div class="bg-gray-800 w-full p-8 border-teal-500 border">
                        <table class="w-full">
                            <tbody>
                            <tr class="text-teal-500">
                                <th class="text-left pl-2">Celkom</th>
                                <th class="text-right pr-2">0,00&nbsp;€</th>
                            </tr>
                            <tr class="text-teal-500">
                                <th class="text-left pl-2">DPH</th>
                                <th class="text-right pr-2">0,00&nbsp;€</th>
                            </tr>
                            <tr class="text-teal-500">
                                <th class="text-left pl-2">Celková suma</th>
                                <th class="text-right pr-2">0,00&nbsp;€</th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
          </div>
          <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-300" />
          <div class="flex flex-col">

            <div class="flex flex-row gap-3">
                <div class="flex flex-col basis-1/3">
                    <label for="invoice__issue-date" class="text-white"
                  >Dátum vystavenia</label
                >
                <input
                  type="text"
                  id="invoice__issue-date"
                  name="data[Invoice][created]"
                  class=""
                  />
                </div>
                <div class="flex flex-col basis-1/3">
                    <label for="invoice__due-in" class="text-white"
                  >Splatné do</label
                >
                <select
                  id="invoice__due-in"
                  name="data[Invoice][due_in]"
                  class=""
                >
                  <option value="0">Dátum vystavenia</option>
                  <option value="1">1 deň</option>
                  <option value="7">7 dní</option>
                  <option value="14">14 dní</option>
                  <option value="30">30 dní</option>
                  <option value="60">60 dní</option>
                  <option value="-1">Iné</option>
                </select>
                </div>
                <div class="flex flex-col basis-1/3">
                    <label for="invoice__delivery-date" class="text-white"
                        >Dátum dodania</label
                      >
                      <input
                        type="text"
                        id="invoice__delivery-date"
                        name="data[Invoice][delivery]"
                        class=""
                      />
                </div>
            </div>
            <div class="flex flex-row gap-3 py-8">
                <div class="flex flex-col basis-1/4">
                    <label for="invoice__delivery-type" class="text-white"
                    >Spôsob dodania</label
                  >
                  <select
                    id="invoice__delivery-type"
                    name="data[Invoice][delivery_type]"
                    class=""
                  >
                    <option value=""></option>
                    <option value="mail">Poštou</option>
                    <option value="courier">Kuriérom</option>
                    <option value="personal">Osobný odber</option>
                    <option value="haulage">Nákladná doprava</option>
                    <option value="pickup_point">Odberné miesto</option>
                  </select>
                </div>
                <div class="flex flex-col basis-1/4">
                    <label for="invoice__payment-type" class="text-white"
                    >Forma úhrady</label
                  >
                  <select
                    id="invoice__payment-type"
                    name="data[Invoice][payment_type]"
                    class=""
                  >
                    <option value=""></option>
                    <option value="transfer">Bankový prevod</option>
                    <option value="cash">Hotovosť</option>
                    <option value="paypal">Paypal</option>
                    <option value="trustpay">Trustpay</option>
                    <option value="besteron">Besteron</option>
                    <option value="credit">Kreditná karta</option>
                    <option value="debit">Debetná karta</option>
                    <option value="cod">Dobierka</option>
                    <option value="accreditation">Vzájomný zápočet</option>
                    <option value="gopay">GoPay</option>
                    <option value="viamo">Viamo</option>
                    <option value="postal_order">Poštový poukaz</option>
                  </select>
                </div>
                <div class="flex flex-col basis-1/4">
                    <label for="invoice__constant-symbol" class="text-white"
                    >Konštantný symbol</label
                  >
                  <input
                    autocomplete="nope"
                    type="text"
                    id="invoice__constant-symbol"
                    name="data[Invoice][constant]"
                    class=""
                  />
                </div>
                <div class="flex flex-col basis-1/4">
                    <label for="invoice__specific-symbol" class="text-white"
                    >Špecifický symbol</label
                  >
                  <input
                    autocomplete="nope"
                    type="text"
                    id="invoice__specific-symbol"
                    name="data[Invoice][specific]"
                    class=""
                  />
                </div>
            </div>
            <div class="flex flex-row">
                <div class="flex flex-col basis-1/3">
                    <label for="invoice__currency" class="text-white"
                    >Fakturačná mena</label
                  >
                  <select
                    id="invoice__currency"
                    name="data[Invoice][invoice_currency]"
                    class=""
                  >
                    <option
                      value="EUR"
                      class=""
                      data-abbr="eu"
                    >
                      €
                    </option>
                    <option value="CZK" class="" data-abbr="cz">Kč</option>
                    <option value="USD" class="" data-abbr="us">USD</option>
                    <option value="GBP" class="" data-abbr="gb">£</option>
                    <option value="HUF" class="" data-abbr="hu">HUF</option>
                    <option value="PLN" class="" data-abbr="pl">PLN</option>
                    <option value="CHF" class="" data-abbr="ch">CHF</option>
                    <option value="RUB" class="" data-abbr="ru">RUB</option>
                    <option value="CNY" class="" data-abbr="cn">¥</option>
                    <option value="SEK" class="" data-abbr="se">SEK</option>
                    <option value="AUD" class="" data-abbr="au">AUD</option>
                    <option value="NOK" class="" data-abbr="no">NOK</option>
                    <option value="CAD" class="" data-abbr="ca">CAD</option>
                    <option value="RON" class="" data-abbr="ro">RON</option>
                    <option value="LKR" class="" data-abbr="lk">LKR</option>
                    <option value="DKK" class="" data-abbr="dk">DKK</option>
                    <option value="JPY" class="" data-abbr="jp">JPY</option>
                    <option value="HRK" class="" data-abbr="hr">HRK</option>
                    <option value="RSD" class="" data-abbr="rs">RSD</option>
                    <option value="BGN" class="" data-abbr="bg">BGN</option>
                    <option value="MXN" class="" data-abbr="mx">MXN</option>
                  </select>
                </div>
            </div>
          </div>
        </section>
        <hr class="mt-8 h-px bg-teal-500 border-0" />
        <div class="flex justify-center py-20">
          <button
            class="shadow flex justify-between border items-center py-2 px-4 rounded-lg bg-teal-500 border-teal-500 text-gray-700 hover:text-teal-500 hover:cursor-pointer hover:bg-gray-800 space-x-2"
            type="submit"
          >
            Vytvoriť faktúru
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
