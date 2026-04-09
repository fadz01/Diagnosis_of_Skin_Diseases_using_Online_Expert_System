const sections = document.querySelectorAll('.section');
const mainMenu = document.getElementById('main-menu');
const diseaseSelection = document.getElementById('disease-selection');
const resultSection = document.getElementById('result-section');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const submitButton = document.getElementById('submit-button');
const finishButton = document.getElementById('finish-button');
const diagnosisResult = document.getElementById('diagnosis-result');
const questionsContainer = document.getElementById('questions-container');

let currentSection = 0;
let currentDisease = '';
let answers = {};
let diagnosis = '';

const questions = {
  'acne': [
    { question: 'Do you have spots on your skin?', key: 'spot', options: ['Yes', 'No'] },
    { question: 'What is the spot color?', key: 'color', options: ['Black', 'White'] },
    { question: 'Do you have bumps appearing on your skin?', key: 'bumps', options: ['Yes', 'No'] },
    { question: 'What is the bumps size?', key: 'bumps_size', options: ['Small', 'Large', 'No Bumps'] },
    { question: 'Do the bumps feel solid or rough?', key: 'bumps_behavior', options: ['Yes', 'No'] },
    { question: 'What color of fluid fills the bumps?', key: 'bumps_color', options: ['Yellowish Fluid', 'White Fluid'] },
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
    { question: 'Do you have external contact with chemicals like pomades, cosmetics, or oils?', key: 'contact', options: ['Yes, I do', 'No, I don’t'] }
  ]
};

function showSection(index) {
  sections.forEach((section, i) => {
    section.classList.toggle('hidden', i !== index);
  });

  prevButton.classList.toggle('hidden', index === 0 || index === 3);
  nextButton.classList.toggle('hidden', index !== 1);
  submitButton.classList.toggle('hidden', index !== 2);
  finishButton.classList.toggle('hidden', index !== 3);
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
  if (currentDisease === 'acne') {
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
      diagnosis = 'Mild Acne (Acne Mechanica)';
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
  }
}

function selectDisease(disease) {
  currentDisease = disease;
  generateQuestions(disease);
  showSection(1);
}

function navigate(step) {
  currentSection += step;
  showSection(currentSection);
}

function submitAnswers() {
  collectAnswers();
  forwardChaining();
  diagnosisResult.innerText = diagnosis || 'No diagnosis could be made.';
  showSection(2);
}

function finishDiagnosis() {
  currentSection = 0;
  currentDisease = '';
  answers = {};
  diagnosis = '';
  questionsContainer.innerHTML = '';
  showSection(0);
}

document.getElementById('select-acne').addEventListener('click', () => selectDisease('acne'));
prevButton.addEventListener('click', () => navigate(-1));
nextButton.addEventListener('click', () => navigate(1));
submitButton.addEventListener('click', submitAnswers);
finishButton.addEventListener('click', finishDiagnosis);

showSection(0);
