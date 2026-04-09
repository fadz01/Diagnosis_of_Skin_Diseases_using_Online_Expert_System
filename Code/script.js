const sections = document.querySelectorAll('.section');
const mainMenu = document.getElementById('main-menu');
const diseaseSelection = document.getElementById('disease-selection');
const questionsSection = document.getElementById('questions-section');
const resultSection = document.getElementById('result-section');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const submitButton = document.getElementById('submit-button');
const finishButton = document.getElementById('finish-button');
const diagnosisResult = document.getElementById('diagnosis-result');
const questionsContainer = document.getElementById('questions-container');
const treatmentOptions = document.getElementById('treatment-options');
/*// Select relevant DOM elements
const sections = document.querySelectorAll('.section');
const mainMenu = document.getElementById('main-menu');
const diseaseSelection = document.getElementById('disease-selection');
const questionsSection = document.getElementById('questions-section');
const resultSection = document.getElementById('result-section');
const treatmentSection = document.getElementById('treatment-section');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const submitButton = document.getElementById('submit-button');
const prevTreatmentButton = document.getElementById('prev-treatment-button');
const nextTreatmentButton = document.getElementById('next-treatment-button');
const submitTreatmentButton = document.getElementById('submit-treatment-button');
const finishButton = document.getElementById('finish-button');
const diagnosisResult = document.getElementById('diagnosis-result');
const questionsContainer = document.getElementById('questions-container');
const treatmentQuestionsContainer = document.getElementById('treatment-questions-container');*/


let currentSection = 0;
let currentDisease = '';
let answers = {};
let diagnosis = '';
let mode = ''; 
/*
let currentSection = 0;
let currentDisease = '';
let answers = {};
let treatmentAnswers = {};
let diagnosis = '';
let mode = ''; */


const questions = {
  'skin-condition': [
    { question: 'Do you have spots?', key: 'spot' },
    { question: 'What color are the spots?', key: 'color', options: ['black', 'white'] },
    { question: 'Do you have small bumps', key: 'small_bumps' },
    { question: 'Do you have dark spot?', key: 'dark_spot'},
    { question: 'Do you have light spot?', key: 'light_spot'},
    { question: 'Do you inflamed skin? (Yes/No)', key: 'inflamed_skin', options: ['yes', 'no']},
    { question: 'Do you have redness skin?', key: 'redness_skin', options:  ['yes','no']},
    { question: 'Do you have solid bumps?', key: 'solid_bumps'},
    { question: "Is the bumps filled with white fluid?", key: 'white_fluid'},
    { question: "Is the bumps filled with yellow fluid?", key:'yellow_fluid'},
    { question: "Do you have swelling?", key:'sweeling'},
    { question: "Is there heat in affected area?", key:'heat_area'},
    { question: "Pain upon touch?", key:'pain_touch', options: ['yes', 'no']},
    { question: "Is there large bumps?", key:'large_bumps'},
    { question: "Is there firm, raised lesions in skin?", key: 'firm_lesion'},
    { question: "Is it a deeper lesions?", key:'deeper_lesion'},
    { question: "Do the lesions feel solid?", key: 'solid_lesion'},
    //rule9
    { question: "Is there lump?", key:'lump'},
    { question: "Is the lump size is large?", key:'large_lump'},
    { question: "Is the lump with fluid-filled sacs?", key: 'fluid_sacs'},
    { question: "Do the lesions feel tender?", key: 'tender_lesion' },
    { question: "Does it develop more than a week?", key:'week'},
    { question: "Do you have a family history?", key: 'family_history'}
  ],
  'acne': [
    { question: 'Do you have blackheads?', key: 'blackheads' },
    { question: 'Do you have papules?', key: 'papules' },
    { question: 'Do you have whiteheads?', key: 'whiteheads' },
    { question: 'Do you have pustules?', key: 'pustules'},
    { question: 'Do you have redness skin?', key: 'redness_skin' },
    { question: 'Do you have inflammation skin?', key: 'inflammation_skin' },
    //
    { question: 'Do you have multiple inflamed blemishes', key:'multiple_blemishes'},
    { question: 'Do you have nodules?', key: 'nodules' },
    { question: 'Do you have cysts?', key: 'cysts' },
    //
    { question: 'Do you have inflamed blemished', key:'inflamed_blemishes'},
    { question: 'Do you have fever?', key:'fever'},
    { question: 'Do you have joint inflammation?', key:'joint_inflammation'},
    { question: 'Do you have bumpy rash', key:'bumpy_rash'},
    { question: 'Do you have blisters?', key:'blisters'},
    { question: 'Is there a presence of pustules after UV radiation exposure?', key:'pustule_UV'},
    { question: 'Do ypu have small bumps?', key:'small_bumps'},
    { question: 'Is the bump feel rough?', key:'rough_bumps'},
    { question: 'Have you used comodigenic cosmetics?', key: 'comodogenic_cosmetic'},
    { question: 'Is there any presence of exacerbation of mild acne symptoms due to constant scratching', key:'exacerbation_scratching'},
    { question: 'Is there any presence of exacerbation of mild acne symptoms due to constant squeezing', key:'exacerbation_squeezing'},
    { question: 'Is there any presence of exacerbation of mild acne symptoms due to picking of blemishes', key:'exacerbation_blemishes'},
   // { question: 'Are the nodules painful?', key: 'painful_nodules' },
    { question: 'Do you have high number of sweat glands?', key:'sweat_glands'},
    { question: 'Do you pimples in areas of the body in contact with tight clothing', key:'pimples_body'},
    //{ question: 'Are the pustules painful when you touch?', key:'painful_pustules'},
    { question: 'Do you use medication that contains barbiturates?', key:'barbiturate'},
    { question: 'Do you use medication that contains lithium?', key:'lithium'},
    { question: 'Do you use medication that contains corticosteroids?', key:'corticosteroids'},
    { question: 'Do you have external contact with chemicals like pomades or cosmetics or oils?', key:'contact', options: ['pomades', 'cosmetics', 'oils']}
    /*{ question: 'Do you have external contact with chemicals like pomades?', key:'pomades'},
    { question: 'Do you have external contact with chemicals like cosmetics?', key:'cosmetics'},
    { question: 'Do you have external contact with chemicals like oils', key:'oils'}*/
  ],
  'eczema': [
    //rule21
    { question: 'Is there any presence of redness skin?', key:'redness_skin'},
    { question: 'Do you have itching skin?', key:'itching_skin'},
    { question: 'Do you have dry skin?', key:'dry_skin'},
    { question: 'Is there presence of scaly skin?', key:'scaly_skin'},
    { question: 'Do you have history of allergies?', key:'history_allergies'},
    { question: 'Do you have asthma?', key:'asthma'},
    //rule22
    { question: 'Do you have fever?', key:'fever'},
    { question: 'Do you have family history?', key:'family_history'},
    //rule23
    { question: 'Do you have have contact with an irritant (such as soap, cosmetics, or certain fabrics)?', key:'contact_irritant'},
    { question: 'Do rash appears only in areas that came into contact with the offending substance?', key:'rash_substances'},
    //rule24
    { question: 'Do you have round, coin-shaped patches?', key:'coinshaped_patches'},
    { question: 'Is there any presence of rashes?',key: 'rashes'},
    { question: 'Is rashes apprears on arms or legs or torso?', key:'location _rashes', options:['arms','legs', 'torso']},
    /*{ question: 'Do rash appears on arms?', key:'rash_arms'},
    { question: 'Do rash appears on legs?', key: 'rash_legs'},
    { question: 'Do rash appears on torso?', key: 'rash_torso'},*/
    //rule25
    { question : 'Is there presence of greasy?', key:'greasy'},
    { question : 'Is there any presence of scaly patches of skin?', key:'scaly_pathces'},
    { question : 'Is scaly patches often appears on the scalp or on face (paricularly around the nose and eyebrows) or on chest?', key:'location_scalypatches', options: ['scalp', 'face', 'chest']},
    /*{ question : 'Is there presence of scaly patches of skin often on the scalp?', key:'scalypatches_scalp'},
    { question : 'is there presence of scaly patches of skin often on chest?'},
    { question : 'is there presence of rash?'},
    { question : 'is there presence of dandruff?'},*/
    { question : 'Is there presence of dandruff?', key: 'dandruff'}, 
    { question : 'Is there presence of cradle cap in infants?', key:'cradle_cap'},
    { question : 'Do you have blisters?', key:'blisters'},
    { question : 'Is itching located on the palms of hands or on sides of fingers or at soles of feet?', key: 'itching_located', options: ['palms', 'fingers', 'feet']},
    { question : 'Is there presence of redness blister?', key: 'redness_blister'},
    { question : 'Is there any presence of swelling?', key: 'swelling'},
    { question : 'Is there any presence cracking?', key: 'cracking'}
  ],
  'psoriasis': [
   //rule27
    { question : 'Is there presence raised, red patches of skin covered by silvery-white scales?', key:'patches'},
    { question : 'Is patches appear symmetrically on the scalp or trunk or limbs  or elbows or knees?', key: 'patches_area', options: ['scalp', 'trunk', 'limbs', 'elbows', 'knees']},
    /*{question : 'patches appear symmetrically on the scalp?'},
    {question : 'patches appear symmetrically on the trunk?'},
    {question : 'patches appear symmetrically on the limbs?'},
    {question : 'patches appear symmetrically on the elbows?'},
    {question : 'patches appear symmetrically on the knees?'}, */

    //rule28
    { question: 'Is there presence of small, red dots on the torso?', key: 'torso' },
    { question: 'Is there presence of small, red dots on the limbs?', key: 'limbs' },
    { question: 'Is outbreaks are often triggered by an upper respiratory tract infection?', key: 'outbreak' },

    //rule29
    { question: 'Is there presence of pustules?', key: 'pustules' },
    { question: 'Is there presence of redness skin?', key: 'redness_skin'},
    { question: 'Does pustules appear primarily on the hands and feet?', key: 'pustules_hand' },
    { question: 'Does pustules appear cover most of the body?', key: 'pustules_body'},

    //rules30
    { question: 'Is there presence of smooth, red patches in folds of skin?', key: 'patches_folds'},
    { question: 'Is it located beneath the breasts?', key: 'breast'},
    { question: 'Is it located in the groin?', key: 'groin' },
    { question: 'Is it located barounf the armpits?', key: 'armpit' },
    { question: 'Does the symptoms worsen with rubbing?', key:'rubbing' },
    { question: 'Does the symptoms worsen with sweating?' , key: 'sweating'},

    //rule31
    { question: 'Is there presence of red, scaly skin covering most of the body?', key: 'scaly' },
    { question: 'Triggered by sunburn?', key: 'sunburn' },
    { question: 'Triggered by certain medications?', key:'medication'}
  ]
};

/*
// Treatment questions data for each disease
const treatmentQuestions = {
  'skin-condition': [
    { question: 'Have you tried topical treatments such as benzoyl peroxide?', key: 'benzoyl_peroxide', options: ['yes', 'no'] },
    { question: 'Are you currently using any oral antibiotics?', key: 'oral_antibiotics', options: ['yes', 'no'] },
    { question: 'Have you considered hormonal treatments?', key: 'hormonal_treatments', options: ['yes', 'no'] },
    { question: 'Do you use any non-comedogenic skin care products?', key: 'non_comedogenic', options: ['yes', 'no'] },
  ],
  'acne': [
    { question: 'Are you using moisturizing creams?', key: 'moisturizing_creams', options: ['yes', 'no'] },
    { question: 'Have you tried topical corticosteroids?', key: 'topical_corticosteroids', options: ['yes', 'no'] },
    { question: 'Do you avoid known irritants?', key: 'avoid_irritants', options: ['yes', 'no'] },
    { question: 'Do you take antihistamines for itching?', key: 'antihistamines', options: ['yes', 'no'] },
  ],
  'eczema': [
    { question: 'Are you using topical treatments such as corticosteroids?', key: 'topical_corticosteroids', options: ['yes', 'no'] },
    { question: 'Have you tried light therapy?', key: 'light_therapy', options: ['yes', 'no'] },
    { question: 'Are you taking any oral medications like methotrexate?', key: 'oral_medications', options: ['yes', 'no'] },
    { question: 'Do you use moisturizing lotions?', key: 'moisturizing_lotions', options: ['yes', 'no'] },
  ],
  'psoriasis': [
    { question: 'Are you using topical treatments such as corticosteroids?', key: 'topical_corticosteroids', options: ['yes', 'no'] },
    { question: 'Have you tried light therapy?', key: 'light_therapy', options: ['yes', 'no'] },
    { question: 'Are you taking any oral medications like methotrexate?', key: 'oral_medications', options: ['yes', 'no'] },
    { question: 'Do you use moisturizing lotions?', key: 'moisturizing_lotions', options: ['yes', 'no'] },
  ]
};  */

function showSection(index) {
  sections.forEach((section, i) => {
    section.classList.toggle('hidden', i !== index);
  });
  if (index === 1) {
    prevButton.classList.add('hidden');
    nextButton.classList.remove('hidden');
    submitButton.classList.add('hidden');
    finishButton.classList.add('hidden');
  } else if (index === 2) {
    prevButton.classList.remove('hidden');
    nextButton.classList.add('hidden');
    submitButton.classList.remove('hidden');
    finishButton.classList.add('hidden');
  } else if (index === 3) {
    prevButton.classList.add('hidden');
    nextButton.classList.add('hidden');
    submitButton.classList.add('hidden');
    finishButton.classList.remove('hidden');
  }
}

function generateQuestions(disease) {
  questionsContainer.innerHTML = '';
  const diseaseQuestions = questions[disease];
  diseaseQuestions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `<label>${q.question}</label>`;

    if (q.options) {
      q.options.forEach(option => {
        questionDiv.innerHTML += `<label><input type="radio" name="question-${index}" value="${option}"> ${option}</label>`;
      });
    } else {
      questionDiv.innerHTML += `<input type="text" name="question-${index}">`;
    }
    questionsContainer.appendChild(questionDiv);
  });
}

function collectAnswers() {
  const questionDivs = questionsContainer.querySelectorAll('.question');
  questionDivs.forEach((div, index) => {
    const key = questions[currentDisease][index].key;
    const input = div.querySelector('input:checked') || div.querySelector('input[type="text"]');
    answers[key] = input ? input.value : null;
  });
}

function forwardChaining() {
  diagnosis = '';
  // Apply the forward chaining algorithm using the rules defined above
  
  //rule 1 // rule 3
  if (currentDisease === 'skin-condition') {
    if (answers.spot && answers.color === 'black') {
      diagnosis = 'Presence of dark spot';
    } else if (answers.spot && answers.color === 'white') {
      diagnosis = 'Presence of white spot';
    }
      //rule 2
   if (answers.small_bumps && answers.dark_spot){
        diagnosis = 'Presence of blackhead';
      }
      //rule 4
   if (answers.small_bumps && answers.light_spot && answers.inflamed_skin === 'no' && answers.redness_skin === 'no') {
        diagnosis = 'Presence of whitehead';
      }
      //rule 5
   if (answers.small_bumps && answers.solid_bumps && answers.inflamed_skin === 'yes' && answers.redness_skin === 'yes'){
        diagnosis = 'Presence of papules';
      }
      //rule 6 
   if (answers.small_bumps && answers.white_fluid || answers.yellow_fluid === 'yes'){
        diagnosis = 'Presence of pustules';
      }
      //rule 7
   if (answers.redness_skin && answers.swelling && answers.heat_area || answers.pain_touch === 'yes'){
        diagnosis = 'Presence of inflamed skin'; 
      }
      //rule 8 
   if (answers.large_bumps && answers.firm_lesion && answers.deeper_lesion || answers.solid_lesion || answers.pain_touch === 'no'){
        diagnosis = 'Has Nodules';
      }
      //rule 9
   if (answers.lump && answers.large_lump && answers.fluid_sacs || answers.tender_lesion || answers.pain_touch === 'yes' && answers.week && answers.family_history){
        diagnosis = 'Have Cysts';
      
    }
    // Add more conditions for skin conditions

  } else if (currentDisease === 'acne') {

    //rule 10
    if (answers.blackheads === 'yes' && answers.papules === 'yes' || answers.whiteheads === 'yes') {
      diagnosis = 'Diagnose as Acne Comedonica (Mild acne)';
    }
    //rule 11
    if (answers.papules === 'yes' && answers.pustules === 'yes' && answers.redness_skin == 'yes' || answers.inflammation_skin === 'yes'){
      diagnosis = 'Diagnose as Acne Papulopustulosa (Moderate Acne)'
    }
    //rule 12
    if (answers.multuple_blemishes === 'yes' && answers.papules === 'yes' && answers.pustules === 'yes' && answers.nodules === 'yes' || answers.cysts === 'yes') {
      diagnosis = 'Diagnose as Acne Conglobata (Severe Acne)';
    }
    //rule 13
    if (answers.inflamed_blemishes === 'yes' && answers.fever === 'yes' && answers.joint_inflammation === 'yes') {
      diagnosis = 'Diagnose as Acne Fulminans (Acute Febrile Ulcerative Acne)';
    } 
    //rule 14
    if (answers.bumpy_rash === 'yes' && answers.redness_skin === 'yes' || answers.blisters == 'yes' || answers.pustule_UV) {
      diagnosis = 'Diagnose as Acne Aetivalis (Mallorca Acne)';
    } 
    //rule 15 
   if (answers.small_bumps === 'yes' && answers.rough === 'yes' && answers.comodogenic === 'yes') {
      diagnosis = 'Diagnose as Acne Cosmetica (Cosmetic Acne)';
    } 
    //rule 16
   if (answers.exacerbation_scratching === 'yes' || answers.exacerbation_squeezing === 'yes' || answers.exacerbation_blemishes === 'yes') {
      diagnosis = 'Diagnose as Acne Excoriee (Pickers Acne)';
    } 
    //rule 17
   if (answers.inflammation_skin === 'yes' && answers.nodules === 'yes' && answers.pain_touch === 'yes' && answers.sweat_glands === 'yes' ) {
      diagnosis = 'Diagnose as Acne Inversa (Apocrine Acne)';
    } 
    //rule 18
   if (answers.blackheads === 'yes' && answers.whiteheads && answers.pimples_body === 'yes') {
      diagnosis = 'Diagnose as Acne Mechanica (Sports Acne)';
    } 
    //rule 19
   if (answers.nodules === 'yes' && answers.pustules === 'yes' && answers.pain_touch === 'yes' && answers.barbiturates === 'yes' || answers.lithium === 'yes' || answers.corticosteroids === 'yes') {
      diagnosis = 'Diagnose as Acne Medicamentosa (Medicinal Acne )';
    } 
    //rule 20
   if (answers.nodules === 'yes' && answers.pain_touch === 'yes' && answers.pustules === 'yes' && answers.contact === 'pomades' || answers.contact === 'cosmetics' || answers.contact === 'oils' ) {
      diagnosis = 'Diagnose as Acne Vanenata';
    }
    // Add more conditions for acne
  } else if (currentDisease === 'eczema') {
    //rule 21
    if (answers.redness_skin === 'yes' && answers.itching === 'yes' && answers.dry_skin === 'yes' && answers.scaly_skin === 'yes' && answers.history_allergies === 'yes' || answers.asthma === 'yes') {
      diagnosis = 'Diagnose as Eczema';
    } 
    //rule 22
    if (answers.redness_skin === 'yes' && answers.itching === 'yes' && answers.history_allergies === 'yes' || answer.asthma === 'yes' || answers.fever === 'yes' || answers.family_history === 'yes') {
      diagnosis = 'Diagnose as Atopic Dermatitis (a common form of eczema)';
    }
    //rule 23
    if (answers.redness_skin === 'yes' && answers.itching === 'yes' && answers.contact_irritant === 'yes' && answer.rash_substances === 'yes') {
      diagnosis = 'Diagnose with Contact Dermatitis (a type of dermatitis)';
    }
    //rule24
    if (answers.redness_skin === 'yes' && answers.itching === 'yes' && answers.history_allergies === 'yes' || answer.asthma === 'yes' || answers.fever === 'yes' || answers.family_history === 'yes') {
      diagnosis = 'Diagnose as Atopic Dermatitis (a common form of eczema)';
    }
    //rule 25
    if (answers.redness_skin === 'yes' && answers.itching === 'yes' && answers.history_allergies === 'yes' || answer.asthma === 'yes' || answers.fever === 'yes' || answers.family_history === 'yes') {
      diagnosis = 'Diagnose as Atopic Dermatitis (a common form of eczema)';
    }
    //rule 26
    if (answers.redness_skin === 'yes' && answers.itching === 'yes' && answers.history_allergies === 'yes' || answer.asthma === 'yes' || answers.fever === 'yes' || answers.family_history === 'yes') {
      diagnosis = 'Diagnose as Atopic Dermatitis (a common form of eczema)';
    }
    // Add more conditions for eczema
  } else if (currentDisease === 'psoriasis') {
    //rule 27
    if (answers.patches === 'yes' || answers.patches_area === 'scalp' || answers.patches_area === 'trunk' || answers.patches_area === 'limbs' || answers.patches_area === 'elbows' || answers.patches_area === 'knees') {
      diagnosis = 'Diagnosed with Plaque Psoriasis';
    }
    //rule 28
    if (answers.torso === 'yes' || answers.limbs === 'yes' && answers.outbreak === 'yes') {
      diagnosis = 'Diagnosed as Guttate Psoriasis';
    }
    //rule 29
    if (answers.pustules === 'yes' && answers.redness_skin === 'yes' && answers.pustules_hand === 'yes' || answers.pustules_body === 'yes' ) {
      diagnosis = 'Diagnosed with Pustular Psoriasis';
    }
    //rule 30
    if (answers.patches_folds === 'yes' && answers.breast === 'yes' || answers.groin === 'yes' || answers.armpit === 'yes' && answers.rubbing === 'yes' || answers.sweating === 'yes') {
      diagnosis = 'Diagnosed with Inverse Psoriasis';
    }
    //rule 30
    if (answers.scaly === 'yes' && answers.sunburn === 'yes' || answers.medication === 'yes' ) {
      diagnosis = 'Diagnosed with Erythrodermic Psoriasis';
    }
    // Add more conditions for psoriasis
  }
}

function showTreatmentOptions() {
  treatmentOptions.innerHTML = '';
  if (diagnosis) {
    if (currentDisease === 'skin-condition') {
      if (diagnosis.includes('dark spot') && diagnosis.includes('increasing size') && diagnosis.includes('irregular border') && diagnosis.includes('bleeding lesions')) {
        treatmentOptions.innerHTML = 'Patients need to see a dermatologist.';
      } else if (diagnosis.includes('dark spot')) {
        treatmentOptions.innerHTML = 'Patients need to use products that contain titanium dioxide or zinc oxide and avoid using comedogenic products. Apply sunscreen which is SPF 30 or higher.';
      }
    } else if (currentDisease === 'acne') {
      if (diagnosis.includes('blackheads') && (diagnosis.includes('severe redness') || diagnosis.includes('severe inflammation'))) {
        treatmentOptions.innerHTML = 'Patients need to set an appointment with a dermatologist.';
      } else if (diagnosis.includes('blackheads')) {
        treatmentOptions.innerHTML = 'Patients need to look for skincare products with salicylic acid and avoid using comedogenic products.';
      } else if (diagnosis.includes('whiteheads') && diagnosis.includes('yellowish bumps') && diagnosis.includes('tenderness')) {
        treatmentOptions.innerHTML = 'Patients need to set an appointment with a dermatologist.';
      } else if (diagnosis.includes('whiteheads')) {
        treatmentOptions.innerHTML = 'Patients need to use skincare that contain beta hydroxy acid (BHA), alpha hydroxy acid (AHA), and benzoyl peroxide or retinoids.';
      } else if (diagnosis.includes('papules') && diagnosis.includes('inflammation') && diagnosis.includes('pain')) {
        treatmentOptions.innerHTML = 'Patients need to set an appointment with a dermatologist.';
      } else if (diagnosis.includes('papules')) {
        treatmentOptions.innerHTML = 'Patients need to wash their face with an acne product that contains benzoyl peroxide or salicylic acid. Resist the temptation to pop these.';
      } else if (diagnosis.includes('nodules') && diagnosis.includes('painful') && (diagnosis.includes('long') || diagnosis.includes('inflammation'))) {
        treatmentOptions.innerHTML = 'Patients need to set an appointment with a dermatologist.';
      } else if (diagnosis.includes('nodules')) {
        treatmentOptions.innerHTML = 'Patients need to wash their face with an acne product that contains benzoyl peroxide or salicylic acid. Patients may use retinoid cream.';
      } else if (diagnosis.includes('cysts') && diagnosis.includes('oozing pus') && diagnosis.includes('hard') && diagnosis.includes('painful bumps')) {
        treatmentOptions.innerHTML = 'Patients need to set an appointment with a dermatologist.';
      } else if (diagnosis.includes('cysts')) {
        treatmentOptions.innerHTML = 'Patients need to wash their face with an acne product that contains benzoyl peroxide or salicylic acid. Patients may use retinoid cream.';
      }
    } else if (currentDisease === 'eczema') {
      if (diagnosis.includes('atopic dermatitis')) {
        treatmentOptions.innerHTML = 'Patients need to avoid wearing fabric that will irritate their skin and stick to soft, fine-weave clothing or natural material such as cotton and silk. Take oral allergy or anti-itch medication.';
      } else if (diagnosis.includes('contact dermatitis')) {
        treatmentOptions.innerHTML = 'Patients need to avoid wearing fabric that will irritate their skin and stick to soft, fine-weave clothing or natural material such as cotton and silk. Use steroid creams or ointments.';
      }
    } else if (currentDisease === 'psoriasis') {
      if (diagnosis.includes('plaque psoriasis')) {
        treatmentOptions.innerHTML = 'Patients need to moisturize their skin, use a humidifier and expose skin to sunlight.';
      }
    }
  } else {
    treatmentOptions.textContent = 'No specific treatments found for this diagnosis.';
  }
}

document.getElementById('diagnosis-button').addEventListener('click', () => {
  mode = 'diagnosis';
  currentSection++;
  showSection(currentSection);
});

document.getElementById('treatment-button').addEventListener('click', () => {
  mode = 'treatment';
  currentSection++;
  showSection(currentSection);
});

nextButton.addEventListener('click', () => {
  const selectedDisease = document.querySelector('input[name="disease-type"]:checked');
  if (selectedDisease) {
    currentDisease = selectedDisease.value;
    generateQuestions(currentDisease);
    currentSection++;
    showSection(currentSection);
  }
});

prevButton.addEventListener('click', () => {
  currentSection--;
  showSection(currentSection);
});

submitButton.addEventListener('click', () => {
  collectAnswers();
  forwardChaining();
  if (mode === 'diagnosis') {
    diagnosisResult.textContent = `Diagnosis: ${diagnosis}`;
  } else if (mode === 'treatment') {
    showTreatmentOptions();
  }
  currentSection++;
  showSection(currentSection);
});

finishButton.addEventListener('click', () => {
  location.reload();
});

showSection(currentSection);
