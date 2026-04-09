const questions = {
  'acne': [
    { question: 'Do you have spots on your skin?', key: 'spot', options: ['Yes', 'No'] },
    { question: 'What is the spot color?', key: 'color', options: ['Black', 'White'] },
    { question: 'Do you have bumps appearing on your skin?', key: 'bumps', options: ['Yes', 'No'] },
    { question: 'What is the bumps size?', key: 'bumps_size', options: ['Small', 'Large', 'No Bumps'] },
    { question: 'Do the bumps feel solid or rough?', key: 'bumps_behavior', options: ['Yes', 'No'] },
    { question: 'What color of fluid fills the bumps?', key: 'bumps_color', options: ['Yellowish Fluid', 'White Fluid', 'Not sure'] },
    { question: 'Do the bumps have firm, raised lesions in your skin?', key: 'lesions', options: ['Yes', 'No'] },
    { question: 'Do you have redness on your skin?', key: 'redness', options: ['Yes', 'No'] },
    { question: 'Is your skin swelling?', key: 'swelling', options: ['Yes', 'No'] },
    { question: 'Does heat affect the area?', key: 'heat', options: ['Yes', 'No'] },
    { question: 'Does it hurt when you touch the area?', key: 'pain', options: ['Yes', 'No'] },
    { question: 'Has it developed over more than a week?', key: 'time', options: ['Yes', 'No'] },
    { question: 'Do you have a family history of cysts?', key: 'family', options: ['Yes', 'No'] },
    { question: 'Do you have blemishes?', key: 'blemishes', options: ['Yes, I have a small amount of blemishes', 'Yes, I have a large amount of blemishes', 'No, I don’t have any blemishes'] },
    { question: 'Do you have a fever?', key: 'fever', options: ['Yes', 'No'] },
    { question: 'Do you have any joint inflammation?', key: 'joint_inflammation', options: ['Yes', 'No'] },
    { question: 'Do you have blisters?', key: 'blisters', options: ['Yes', 'No'] },
    { question: 'Is there a presence of pustules after UV radiation exposure?', key: 'pustule_UV', options: ['Yes', 'No'] },
    { question: 'Have you used comedogenic cosmetics?', key: 'comodogenic_cosmetic', options: ['Yes', 'No'] },
    { question: 'Do you sweat a lot?', key: 'sweat_glands', options: ['Yes', 'No'] },
    { question: 'Do you get pimples in areas of the body in contact with tight clothing?', key: 'pimples_body', options: ['Yes', 'No'] },
    { question: 'Do you use medications that contain barbiturates, lithium, or corticosteroids?', key: 'medication', options: ['Yes', 'No'] },
    { question: 'Do you have external contact with chemicals like pomades, cosmetics, or oils?', key: 'contact', options: ['Yes', 'No'] }
  ]
};

// Function to initiate diagnosis based on user answers
function diagnose() {
  let answers = {};

  // Retrieve user inputs from form
  questions['acne'].forEach(question => {
    const selectedOption = document.querySelector(`input[name="${question.key}"]:checked`);
    if (selectedOption) {
      answers[question.key] = selectedOption.value;
    } else {
      alert(`Please answer question: ${question.question}`);
      return;
    }
  });

  // Call forwardChaining function and display result
  const diagnosisResult = forwardChaining(answers);
  const descriptionResult = getDescription(diagnosisResult);
  const treatmentResult = getTreatment(diagnosisResult);
  
  // Display results in popup
  displayDiagnosis(diagnosisResult);
  displayDescription(descriptionResult);
  displayTreatment(treatmentResult);
  
  // Show the popup
  showPopup();
}

// Function to perform forward chaining and return diagnosis
function forwardChaining(answers) {
  let diagnosis = '';
  
    // Logic to determine diagnosis based on answers
    if (answers.spot === 'Yes' && answers.color === 'Black') {
        diagnosis = 'Presence of dark spots';
      }
      if (answers.spot === 'Yes' && answers.color === 'Black' && answers.bumps_size === 'Small') {
        diagnosis = 'Presence of blackheads';
      }
      if (answers.spot === 'Yes' && answers.color === 'White') {
        diagnosis = 'Presence of light spots';
      }
      if (answers.bumps === 'Yes' && answers.bumps_size === 'Small' && answers.spot === 'Yes' && answers.color === 'White' && answers.redness === 'No' && answers.swelling === 'Yes' && answers.heat === 'Yes' && answers.pain === 'Yes') {
        diagnosis = 'Whiteheads';
      }
      if (answers.bumps_size === 'Small' && answers.bumps === 'Yes' && answers.bumps_behavior === 'Yes' && answers.redness === 'Yes' && answers.swelling === 'Yes' && answers.heat === 'Yes') {
        diagnosis = 'Papules';
      }
      if (answers.bumps === 'Yes' && answers.bumps_size === 'Small' && (answers.bumps_color === 'Yellowish Fluid' || answers.bumps_color === 'White Fluid')) {
        diagnosis = 'Pustules';
      }
      if (answers.redness === 'Yes' && answers.swelling === 'Yes' && answers.heat === 'Yes' && answers.pain === 'Yes') {
        diagnosis = 'Inflamed skin';
      }
      if (answers.bumps === 'Yes' && answers.bumps_size === 'Large' && (answers.lesions === 'Yes' || answers.pain === 'No')) {
        diagnosis = 'Nodules';
      }
      if (answers.bumps === 'Yes' && answers.bumps_size === 'Large' && (answers.bumps_color === 'Yellowish Fluid' || answers.bumps_color === 'White Fluid' || answers.bumps_behavior === 'Yes' || answers.pain === 'Yes') && answers.time === 'Yes' && answers.family === 'Yes') {
        diagnosis = 'Cysts';
      }
      if ((answers.spot === 'Yes' && answers.color === 'Black' && answers.bumps_size === 'Small') && (answers.bumps_size === 'Small' && answers.bumps === 'Yes' && answers.bumps_behavior === 'Yes' && answers.redness === 'Yes' && answers.swelling === 'Yes' && answers.heat === 'Yes') || (answers.bumps === 'Yes' && answers.bumps_size === 'Small' && answers.spot === 'Yes' && answers.color === 'White' && answers.redness === 'No' && answers.swelling === 'Yes' && answers.heat === 'Yes' && answers.pain === 'Yes')) {
        diagnosis = 'Mild Acne (Comedonica)';
      }
      if ((answers.bumps_size === 'Small' && answers.bumps === 'Yes' && answers.bumps_behavior === 'Yes' && answers.redness === 'Yes' && answers.swelling === 'Yes' && answers.heat === 'Yes') && (answers.bumps === 'Yes' && answers.bumps_size === 'Small' && (answers.bumps_color === 'Yellowish Fluid' || answers.bumps_color === 'White Fluid')) && ((answers.redness === 'Yes') || (answers.redness === 'Yes' && answers.swelling === 'Yes' && answers.heat === 'Yes' && answers.pain === 'Yes'))) {
        diagnosis = 'Moderate Acne (Acne Papulopustulosa)';
      }
      if (answers.blemishes === 'Yes, I have a large amount of blemishes' && ((answers.bumps_size === 'Small' && answers.bumps === 'Yes' && answers.bumps_behavior === 'Yes' && answers.redness === 'Yes' && answers.swelling === 'Yes' && answers.heat === 'Yes')) && ((answers.bumps === 'Yes' && answers.bumps_size === 'Small' && (answers.bumps_color === 'Yellowish Fluid' || answers.bumps_color === 'White Fluid')) && ((answers.bumps === 'Yes' && answers.bumps_size === 'Large' && answers.lesions === 'Yes' || answers.pain === 'No')) || ((answers.bumps === 'Yes' && answers.bumps_size === 'Large' && answers.bumps_color === 'Yellowish Fluid' || answers.bumps_color === 'White Fluid' || answers.bumps_behavior === 'Yes' || answers.pain === 'Yes' && answers.time === 'Yes' && answers.family === 'Yes')))) {
        diagnosis = 'Severe Acne (Acne Conglobata)';
      }
      if (answers.blemishes === 'Yes, I have a large amount of blemishes' && answers.fever === 'Yes' && answers.joint_inflammation === 'Yes') {
        diagnosis = 'Acute Feverish Ulcerative Acne (Acne Fulminans)';
      }
      if (answers.bumps === 'Yes' && answers.redness === 'Yes' || answers.blisters === 'Yes' || ((answers.bumps_size === 'Small' && answers.bumps === 'Yes' && answers.bumps_behavior === 'Yes' && answers.redness === 'Yes' && answers.swelling === 'Yes' && answers.heat === 'Yes')) && answers.pustule_UV === 'Yes') {
        diagnosis = 'Mallorca Acne (Acne Aestivalis)';
      }
      if (answers.bumps === 'Yes' && answers.bumps_size === 'Small' && answers.bumps_behavior === 'Yes' && answers.comodogenic_cosmetic === 'Yes') {
        diagnosis = 'Cosmetic Acne (Acne Cosmetica)';
      }
      if ((answers.redness === 'Yes' && answers.swelling === 'Yes' && answers.heat === 'Yes' && answers.pain === 'Yes') && (answers.bumps === 'Yes' && answers.bumps_size === 'Large' && answers.lesions === 'Yes' || answers.pain === 'No') && answers.sweat_glands === 'Yes') {
        diagnosis = 'Apocrine Acne (Acne Inversa)';
      }
      if ((answers.spot === 'Yes' && answers.color === 'Black' && answers.bumps_size === 'Small') && (answers.bumps === 'Yes' && answers.bumps_size === 'Small' && answers.spot === 'Yes' && answers.color === 'White' && answers.redness === 'No' && answers.swelling === 'Yes' && answers.heat === 'Yes' && answers.pain === 'Yes') && answers.pimples_body === 'Yes') {
        diagnosis = 'Sport Acne (Acne Mechanica)';
      }
      if ((answers.bumps === 'Yes' && answers.bumps_size === 'Large' && answers.lesions === 'Yes' || answers.pain === 'No') && (answers.bumps === 'Yes' && answers.bumps_size === 'Small' && (answers.bumps_color === 'Yellowish Fluid' || answers.bumps_color === 'White Fluid')) && answers.pain === 'Yes' && answers.medication === 'Yes') {
        diagnosis = 'Medical Acne (Acne Medicamentosa)';
      }
      if (answers.pain === 'Yes' && (answers.bumps === 'Yes' && answers.bumps_size === 'Small' && (answers.bumps_color === 'Yellowish Fluid' || answers.bumps_color === 'White Fluid')) && answers.contact === 'Yes') {
        diagnosis = 'Chemical Acne (Acne Venenata)';
      }
  
    return diagnosis;
  }
  

  // Function to get treatment based on diagnosis
function getTreatment(diagnosis) {
  let treatment = '';

  if (diagnosis === 'Presence of dark spots') {
    treatment = 'Patients need to use products that contain titanium dioxide or zinc oxide and avoid using comedogenic products. Apply sunscreen which is SPF 30 or higher.';
  } else if (diagnosis === 'Presence of blackheads') {
    treatment = 'Patients need to look for skincare products with salicylic acid and avoid using comedogenic products that can plug pores.';
  } else if (diagnosis === 'Presence of light spots') {
    treatment = 'Consider gentle exfoliation and moisturizing treatments. Protect the affected area from sun exposure.';
  } else if (diagnosis === 'Whiteheads') {
    treatment = 'Patients need to use skincare products that contain beta hydroxy acid (BHA), alpha hydroxy acid (AHA), benzoyl peroxide, or retinoids.';
  } else if (diagnosis === 'Papules') {
    treatment = 'Patients need to use skincare products that contain benzoyl peroxide or salicylic acid.';
  } else if (diagnosis === 'Pustules') {
    treatment = 'Patients need to use skincare products that contain benzoyl peroxide or salicylic acid. Also, resist the temptation to pop the pustules.';
  } else if (diagnosis === 'Inflamed skin') {
    treatment = 'Treatment depends on the underlying cause. Consult a dermatologist for appropriate diagnosis and management.';
  } else if (diagnosis === 'Nodules') {
    treatment = 'Patient needs to set an appointment with a dermatologist for proper evaluation and treatment.';
  } else if (diagnosis === 'Cyst') {
    treatment = 'Patient needs to set an appointment with a dermatologist for proper evaluation and treatment.';
  } else if (diagnosis === 'Mild Acne (Comedonica)') {
    treatment = 'Use a mild cleanser twice daily to remove excess oil, dirt, and dead skin cells without over-drying the skin. Also choose skincare and makeup products labeled as non-comedogenic to prevent pore clogging.';
  } else if (diagnosis === 'Moderate Acne (Acne Papulopustulosa)') {
    treatment = 'Use topical treatments containing benzoyl peroxide, salicylic acid, or retinoids. Consider oral antibiotics under medical supervision.';
  } else if (diagnosis === 'Severe Acne (Acne Conglobata)') {
    treatment = 'Requires aggressive treatment under dermatologist supervision, including oral isotretinoin in severe cases.';
  } else if (diagnosis === 'Acute Feverish Ulcerative Acne (Fulminans Acne)') {
    treatment = 'Requires urgent medical attention. Treatment may involve systemic corticosteroids and other medications under dermatologist care.';
  } else if (diagnosis === 'Mallorca Acne (Acne Aestivalis)') {
    treatment = 'Avoid sun exposure, use non-comedogenic sunscreen, and consider topical treatments as advised by a dermatologist.';
  } else if (diagnosis === 'Cosmetic Acne (Acne Cosmetica)') {
    treatment = 'Avoid using comedogenic cosmetics. Opt for non-comedogenic products and ensure proper cleansing of the skin.';
  } else if (diagnosis === 'Apocrice Acne (Acne Inversa)') {
    treatment = 'Requires specific management strategies including topical treatments and, in severe cases, surgical intervention under medical guidance.';
  } else if (diagnosis === 'Sport Acne (Acne Mechanica)') {
    treatment = 'Ensure clean sportswear, avoid friction, and use non-comedogenic skincare products. Maintain good hygiene practices.';
  } else if (diagnosis === 'Medical Acne (Acne Medicamentosa)') {
    treatment = 'Review current medications with a healthcare provider. Adjustments may be necessary to manage acne as a side effect.';
  } else if (diagnosis === 'Chemical Acne (Acne Venenata)') {
    treatment = 'Avoid exposure to triggering chemicals. Use protective measures and consider dermatologist-recommended skincare products.';
  } else {
    treatment = 'No specific treatment recommendation available.';
  }

  return treatment;
}

// Function to get treatment based on diagnosis
function getDescription(diagnosis) {
    let description = '';
  
    if (diagnosis === 'Presence of dark spots') {
      description = 'A pigmented area on the skin that appears darker than the surrounding skin.';
    } else if (diagnosis === 'Presence of blackheads') {
      description = 'A small, dark-colored bump on the skin caused by clogged hair follicles.';
    } else if (diagnosis === 'Presence of light spots') {
      description = 'A pale or whitish area on the skin that contrasts with the surrounding skin tone.';
    } else if (diagnosis === 'Whiteheads') {
      description = 'A small, raised bump on the skin filled with pus, typically white or yellowish in color.';
    } else if (diagnosis === 'Papules') {
      description = '';
    } else if (diagnosis === 'Pustules') {
      description = 'Small, inflamed bumps on the skin filled with pus, often appearing as white or yellowish spots.';
    } else if (diagnosis === 'Inflamed skin') {
      description = 'Skin that is red, swollen, and irritated due to inflammation.';
    } else if (diagnosis === 'Nodules') {
      description = 'Large, solid bumps beneath the skins surface that can be painful and inflamed.';
    } else if (diagnosis === 'Cyst') {
      description = 'Pockets of infection or fluid beneath the skin, often larger and deeper than pimples.';
    } else if (diagnosis === 'Mild Acne (Comedonica)') {
      description = 'Mild acne characterized by the presence of comedones (blackheads and whiteheads).';
    } else if (diagnosis === 'Moderate Acne (Acne Papulopustulosa)') {
      description = 'Moderate acne with inflamed papules and pustules.';
    } else if (diagnosis === 'Severe Acne (Acne Conglobata)') {
      description = 'Severe acne with deep, painful nodules and cysts.';
    } else if (diagnosis === 'Acute Feverish Ulcerative Acne (Fulminans Acne)') {
      description = 'Severe, sudden-onset acne accompanied by systemic symptoms like fever.';
    } else if (diagnosis === 'Mallorca Acne (Acne Aestivalis)') {
      description = 'Acne triggered by exposure to sunlight and sunscreen use.';
    } else if (diagnosis === 'Cosmetic Acne (Acne Cosmetica)') {
      description = 'Acne caused by clogged pores from cosmetics or skincare products.';
    } else if (diagnosis === 'Apocrice Acne (Acne Inversa)') {
      description = 'Acne affecting areas with apocrine sweat glands, like the armpits and groin.';
    } else if (diagnosis === 'Sport Acne (Acne Mechanica)') {
      description = 'Acne triggered by friction, pressure, or heat, often from sports equipment or clothing.';
    } else if (diagnosis === 'Medical Acne (Acne Medicamentosa)') {
      description = 'Acne caused by medications, such as corticosteroids or hormonal treatments.';
    } else if (diagnosis === 'Chemical Acne (Acne Venenata)') {
      description = 'Acne caused by exposure to certain substances, like oils or chemicals.';
    } else {
      description = 'No specific description available.';
    }
  
    return description;
  }
  

// Function to display diagnosis result
function displayDiagnosis(diagnosisResult) {
  const resultElement = document.getElementById('diagnosisResult');
  resultElement.textContent = `Diagnosis: ${diagnosisResult}`;
}

// Function to display treatment result
function displayTreatment(treatmentResult) {
  const treatmentElement = document.getElementById('treatmentResult');
  treatmentElement.textContent = `Treatment Recommendation: ${treatmentResult}`;
}

// Function to display description result
function displayDescription(descriptionResult) {
  const descriptionElement = document.getElementById('descriptionResult');
  descriptionElement.textContent = `Description: ${descriptionResult}`;
}

// Populate questions in the form
const questionsContainer = document.getElementById('questionsContainer');
questions['acne'].forEach(question => {
  const questionDiv = document.createElement('div');
  questionDiv.innerHTML = `
    <label>${question.question}</label><br>
    ${question.options.map(option => `
      <input type="radio" name="${question.key}" value="${option}"> ${option}<br>
    `).join('')}
    <br>
  `;
  questionsContainer.appendChild(questionDiv);
});

// Function to show the popup
function showPopup() {
  document.getElementById('overlay').classList.add('active');
  document.getElementById('popup').classList.add('active');
}

// Function to close the popup
function closePopup() {
  document.getElementById('overlay').classList.remove('active');
  document.getElementById('popup').classList.remove('active');
}
