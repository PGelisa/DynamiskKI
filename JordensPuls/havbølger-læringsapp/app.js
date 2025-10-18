// App data
const topics = {
  stormflo: {
    id: 'stormflo',
    title: 'Stormflo',
    icon: '🌊',
    description: 'Stormflo oppstår når værforhold skaper unormalt høy vannstand langs kysten',
    key_facts: [
      'Stormflo skyldes hovedsakelig lavt lufttrykk og kraftig pålandsvind',
      'For hver hPa lavere trykk stiger vannstanden med ca. 1 cm',
      'Vinden presser vann inn mot kysten og skaper oppstuing',
      'Ekstra høy vannstand når stormflo sammenfaller med springflo',
      'I tropiske sykloner kan havvannet løftes 3-6 meter, i ekstreme tilfeller over 8 meter',
      'Den høyeste registrerte stormfloen var 13 meter ved Bathurst Bay, Australia (1899)'
    ],
    processes: 'Stormflo dannes av tre hovedprosesser - lavt lufttrykk som løfter vannoverflaten, vindtrykk som presser vann mot land, og tidevannseffekter som forsterker vannstanden.',
    examples: [
      'Ekstremvær Elsa på Vestlandet (2017)',
      'Orkanen Katrina i USA skapte 9 meter høy stormflo (2005)',
      'Syklonen Bhola i Bengalbukta tok mange hundre tusen liv (1970)'
    ],
    hazards: 'Oversvømmelse av lavtliggende områder, skader på bygninger og infrastruktur, erosjon av strandsoner, fare for forurensning fra avløp.'
  },
  stormbølger: {
    id: 'stormbølger',
    title: 'Stormbølger',
    icon: '🌀',
    description: 'Bølger skapt av kraftig vind som treffer kysten under stormflo',
    key_facts: [
      'Bølgehøyde avhenger av vindstyrke, vindretning og hvor lenge vinden blåser',
      'Ved full storm (24,5-28,4 m/s) kan bølger bli 6-9 meter høye',
      'Ved sterk storm (28,5-32,6 m/s) kan bølger bli over 9 meter høye',
      'Bølgene kan slå opp på land og forsterke stormfloeffekten',
      'Vannstandsmålere registrerer ikke bølger - kun selve vannstanden'
    ],
    processes: 'Vinden skaper friksjon mot havoverflaten og danner bølger. Jo sterkere vind, jo lengre vindstrekning (fetch) og jo lengre tid vinden blåser, desto større blir bølgene.',
    examples: [
      'Storm langs norskekysten kan skape bølger på 10-14 meter',
      'Orkan i Nordsjøen kan presse bølger inn mot kysten',
      'Beaufortskalaen beskriver sammenhengen mellom vindstyrke og bølgehøyde'
    ],
    hazards: 'Bølger kan slå over kystforsvar, ødelegge båter og havneanlegg, forårsake kysterosjon, skape farlige forhold for sjøfart.'
  },
  meteotsunami: {
    id: 'meteotsunami',
    title: 'Meteotsunamier',
    icon: '⛈️',
    description: 'Tsunami-lignende bølger forårsaket av værmessige prosesser',
    key_facts: [
      'Meteotsunamier skyldes raske endringer i lufttrykk, ofte i forbindelse med tordenvær',
      'Bølgene oppfører seg som vanlige tsunamier, men har mindre energi',
      'Bølgehøyde er vanligvis under 2 meter, men kan i sjeldne tilfeller nå 6 meter',
      'Fenomenet opptrer mest om sommeren',
      'Meteotsunamier er vanskelige å forutsi fordi de dannes raskt',
      'Kun ca. 3% av historiske tsunamier har meteorologisk opphav'
    ],
    processes: 'En værfront (f.eks. fra tordenvær) beveger seg over havet med samme hastighet som tsunamibølgen i sjøen. Dette forsterker bølgen kontinuerlig. Når bølgen treffer kysten øker energien og bølgehøyden.',
    examples: [
      'Den store Vela Luka-flommen i Adriaterhavet (1978) - opp til 6 meter høy',
      'Meteotsunamier i Finland i skjærgården om sommeren',
      'Hendelser langs den amerikanske østkysten og i De Store Sjøene'
    ],
    hazards: 'Plutselige vannstandsendringer, farlige strømmer og virvler, fare for badende og båter, vanskelig å varsle.'
  },
  tsunami: {
    id: 'tsunami',
    title: 'Tsunamier',
    icon: '🌊',
    description: 'Gigantiske havbølger forårsaket av plutselige forskyvninger av vannmasser',
    key_facts: [
      'Hovedårsaker - undersjøiske jordskjelv, vulkanutbrudd, fjellskred/ras, meteorittnedslag',
      'På dypt hav beveger tsunamier seg med ca. 700 km/t',
      'På dypt hav er bølgen sjelden over en halv meter høy',
      'Ved grunt vann kan bølgen reise seg til 12 meter eller mer',
      'Tsunamier innebærer svingning av hele vannsøylen, ikke bare overflaten',
      'Tsunamier mister nesten ikke kraft underveis over store avstander'
    ],
    processes: 'Ved undersjøisk jordskjelv forskyves havbunnen vertikalt, noe som setter hele vannsøylen i bevegelse. Energien sprer seg som konsentriske bølger. Når bølgen nærmer seg kysten, minker vanndybden og bølgen vokser i høyde.',
    examples: [
      'Storeggaraset (ca. 6200 f.Kr.) - 10-15 meter høy bølge langs norskekysten',
      'Tafjord-ulykka (1934) - 40 omkomne, 62 meter høy oppskylling',
      'Loen-ulykkene (1905 og 1936) - til sammen 134 omkomne',
      'Det Indiske hav (2004) - over 200 000 omkomne',
      'Japan (2011) - ca. 20 000 omkomne'
    ],
    hazards: 'Massiv ødeleggelse av kystområder, enorme tap av menneskeliv, langvarige økonomiske konsekvenser, flere bølger kan komme med opptil én times mellomrom.'
  }
};

const quizQuestions = [
  {
    question: 'Hva er hovedforskjellen mellom en tsunami og en meteotsunami?',
    options: [
      'Tsunami er større og farligere',
      'Tsunami skyldes geologiske hendelser, meteotsunami skyldes værmessige prosesser',
      'Tsunami kan varsles, meteotsunami kan ikke varsles',
      'Det er ingen forskjell, bare ulike navn'
    ],
    correct: 1,
    explanation: 'En tsunami oppstår ved jordskjelv, vulkanutbrudd eller store ras, mens en meteotsunami skyldes raske værforandringer som lufttrykksendringer.'
  },
  {
    question: 'Hvor mye stiger havnivået for hver hPa lavere lufttrykk?',
    options: [
      'Ca. 0,1 cm',
      'Ca. 1 cm',
      'Ca. 10 cm',
      'Ca. 1 meter'
    ],
    correct: 1,
    explanation: 'Som tommelfingerregel stiger vannstanden med ca. 1 cm for hver hPa lavere lufttrykk.'
  },
  {
    question: 'Hvor raskt kan en tsunami bevege seg på dypt hav?',
    options: [
      'Ca. 70 km/t',
      'Ca. 200 km/t',
      'Ca. 700 km/t',
      'Ca. 1000 km/t'
    ],
    correct: 2,
    explanation: 'På dypt hav kan tsunamier bevege seg med hastigheter rundt 700 km/t, omtrent som et passasjerfly.'
  },
  {
    question: 'Hva skjedde ved Storeggaraset for ca. 8200 år siden?',
    options: [
      'Et jordskjelv skapte tsunami i Oslofjorden',
      'Et gigantisk undersjøisk skred skapte en stor tsunami',
      'En vulkan eksploderte i Norskehavet',
      'En meteoritt slo ned utenfor Norge'
    ],
    correct: 1,
    explanation: 'Storeggaraset var et gigantisk undersjøisk skred som gikk utenfor Mørekysten og skapte en tsunami på 10-15 meter som rammet norskekysten og store deler av Nordsjøområdet.'
  },
  {
    question: 'Når får vi ekstra høy vannstand (springflo)?',
    options: [
      'Når det er storm',
      'Ved ny- og fullmåne',
      'Om sommeren',
      'Når det regner mye'
    ],
    correct: 1,
    explanation: 'Springflo oppstår når sol, måne og jord står på linje ved ny- og fullmåne, og tidevannsforskjellene er størst.'
  },
  {
    question: 'Hva er den største registrerte stormfloen noensinne?',
    options: [
      '5 meter',
      '9 meter',
      '13 meter',
      '20 meter'
    ],
    correct: 2,
    explanation: 'Den høyeste registrerte stormfloen var 13 meter, skapt av syklonen Mahina ved Bathurst Bay i Australia i 1899.'
  },
  {
    question: 'Hvilken type bølge innebærer svingning av hele vannsøylen fra bunn til overflate?',
    options: [
      'Vanlige vindbølger',
      'Stormbølger',
      'Tsunami',
      'Alle typer bølger'
    ],
    correct: 2,
    explanation: 'Tsunamier er særegne ved at de involverer svingning av hele vannsøylen, i motsetning til vanlige bølger som hovedsakelig påvirker overflaten.'
  },
  {
    question: 'Når opptrer meteotsunamier oftest?',
    options: [
      'Om vinteren',
      'Om våren',
      'Om sommeren',
      'Om høsten'
    ],
    correct: 2,
    explanation: 'Meteotsunamier opptrer oftest om sommeren i forbindelse med kraftige tordenvær og raske værfronter.'
  },
  {
    question: 'Hva skaper stormbølger?',
    options: [
      'Jordskjelv',
      'Lufttrykksendringer',
      'Vind som blåser over havoverflaten',
      'Tidevannet'
    ],
    correct: 2,
    explanation: 'Stormbølger dannes når kraftig vind skaper friksjon mot havoverflaten. Jo sterkere og lengre vinden blåser, desto høyere blir bølgene.'
  },
  {
    question: 'Hva er den viktigste årsaken til at tsunamier blir så høye når de når kysten?',
    options: [
      'Vinden presser dem opp',
      'Lufttrykket endrer seg',
      'Vanndybden minker og energien konsentreres',
      'Månen trekker i vannet'
    ],
    correct: 2,
    explanation: 'Når en tsunami beveger seg inn på grunnere vann, minker vanndybden og bølgens energi konsentreres i et mindre volum, noe som gjør at bølgen reiser seg høyere.'
  }
];

// App state
let currentPage = 'home';
let currentTopic = null;
let currentQuizQuestion = 0;
let quizScore = 0;
let quizAnswers = [];
let shuffledQuestions = [];

// DOM elements
const pages = {
  home: document.getElementById('home-page'),
  topic: document.getElementById('topic-page'),
  comparison: document.getElementById('comparison-page'),
  quiz: document.getElementById('quiz-page')
};

// Initialize app
function init() {
  setupEventListeners();
  showPage('home');
}

// Event listeners
function setupEventListeners() {
  // Topic cards
  document.querySelectorAll('.topic-card').forEach(card => {
    card.addEventListener('click', () => {
      const topicId = card.dataset.topic;
      showTopic(topicId);
    });
  });

  // Navigation buttons
  document.getElementById('comparison-btn').addEventListener('click', () => {
    showPage('comparison');
  });

  document.getElementById('quiz-btn').addEventListener('click', () => {
    showPage('quiz');
  });

  // Back buttons
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showPage('home');
    });
  });

  // Topic navigation
  document.querySelectorAll('.nav-topics .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const topicId = btn.dataset.topic;
      showTopic(topicId);
    });
  });

  // Quiz event listeners
  document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
  document.getElementById('retake-quiz-btn').addEventListener('click', startQuiz);
  document.getElementById('back-home-btn').addEventListener('click', () => {
    showPage('home');
  });
}

// Navigation functions
function showPage(pageName) {
  // Hide all pages
  Object.values(pages).forEach(page => {
    page.classList.remove('active');
  });
  
  // Show selected page
  pages[pageName].classList.add('active');
  currentPage = pageName;
  
  // Reset quiz if navigating away
  if (pageName !== 'quiz') {
    resetQuiz();
  }
}

function showTopic(topicId) {
  const topic = topics[topicId];
  if (!topic) return;
  
  currentTopic = topicId;
  
  // Update topic page content
  const topicIcon = document.querySelector('.topic-icon');
  const topicTitle = document.querySelector('.topic-title');
  const topicDescription = document.querySelector('.topic-description');
  const keyFacts = document.querySelector('.key-facts');
  const processes = document.querySelector('.processes');
  const examples = document.querySelector('.examples');
  const hazards = document.querySelector('.hazards');
  
  topicIcon.textContent = topic.icon;
  topicTitle.textContent = topic.title;
  topicDescription.textContent = topic.description;
  processes.textContent = topic.processes;
  hazards.textContent = topic.hazards;
  
  // Clear and populate key facts
  keyFacts.innerHTML = '';
  topic.key_facts.forEach(fact => {
    const li = document.createElement('li');
    li.textContent = fact;
    keyFacts.appendChild(li);
  });
  
  // Clear and populate examples
  examples.innerHTML = '';
  topic.examples.forEach(example => {
    const li = document.createElement('li');
    li.textContent = example;
    examples.appendChild(li);
  });
  
  // Update active navigation button
  document.querySelectorAll('.nav-topics .btn').forEach(btn => {
    btn.classList.remove('btn--primary');
    btn.classList.add('btn--sm');
    if (btn.dataset.topic === topicId) {
      btn.classList.add('btn--primary');
      btn.classList.remove('btn--sm');
    }
  });
  
  showPage('topic');
}

// Quiz functions
function startQuiz() {
  // Reset quiz state
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswers = [];
  
  // Shuffle questions
  shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
  
  // Hide start and results screens
  document.getElementById('quiz-start').classList.add('hidden');
  document.getElementById('quiz-results').classList.add('hidden');
  
  // Show first question
  showQuestion();
}

function showQuestion() {
  const questionContainer = document.getElementById('quiz-question');
  const question = shuffledQuestions[currentQuizQuestion];
  
  questionContainer.classList.remove('hidden');
  
  // Update progress
  const progressFill = document.querySelector('.progress-fill');
  const progress = ((currentQuizQuestion + 1) / shuffledQuestions.length) * 100;
  progressFill.style.width = progress + '%';
  
  // Update question counter
  const questionCounter = document.querySelector('.question-counter');
  questionCounter.textContent = `Spørsmål ${currentQuizQuestion + 1} av ${shuffledQuestions.length}`;
  
  // Update question text
  const questionText = document.querySelector('.question-text');
  questionText.textContent = question.question;
  
  // Create options
  const optionsContainer = document.querySelector('.options');
  optionsContainer.innerHTML = '';
  
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option';
    button.textContent = option;
    button.addEventListener('click', () => selectAnswer(index));
    optionsContainer.appendChild(button);
  });
  
  // Hide feedback
  document.querySelector('.feedback').classList.add('hidden');
}

function selectAnswer(selectedIndex) {
  const question = shuffledQuestions[currentQuizQuestion];
  const options = document.querySelectorAll('.option');
  const feedback = document.querySelector('.feedback');
  
  // Disable all options
  options.forEach(option => {
    option.disabled = true;
    option.style.cursor = 'not-allowed';
  });
  
  // Mark correct and incorrect answers
  options.forEach((option, index) => {
    if (index === question.correct) {
      option.classList.add('correct');
    } else if (index === selectedIndex && index !== question.correct) {
      option.classList.add('incorrect');
    }
    if (index === selectedIndex) {
      option.classList.add('selected');
    }
  });
  
  // Update score
  const isCorrect = selectedIndex === question.correct;
  if (isCorrect) {
    quizScore++;
  }
  
  // Store answer
  quizAnswers.push({
    questionIndex: currentQuizQuestion,
    selectedIndex,
    correct: isCorrect
  });
  
  // Show feedback
  const feedbackText = document.querySelector('.feedback-text');
  const explanation = document.querySelector('.explanation');
  const nextBtn = document.querySelector('.next-btn');
  
  feedbackText.textContent = isCorrect ? '✅ Riktig!' : '❌ Feil svar';
  explanation.textContent = question.explanation;
  
  // Update next button text
  if (currentQuizQuestion === shuffledQuestions.length - 1) {
    nextBtn.textContent = 'Se resultater';
  } else {
    nextBtn.textContent = 'Neste spørsmål';
  }
  
  nextBtn.onclick = nextQuestion;
  
  feedback.classList.remove('hidden');
}

function nextQuestion() {
  currentQuizQuestion++;
  
  if (currentQuizQuestion >= shuffledQuestions.length) {
    showQuizResults();
  } else {
    showQuestion();
  }
}

function showQuizResults() {
  // Hide question
  document.getElementById('quiz-question').classList.add('hidden');
  
  // Show results
  const resultsContainer = document.getElementById('quiz-results');
  resultsContainer.classList.remove('hidden');
  
  // Update score display
  const scoreText = document.querySelector('.score-text');
  scoreText.textContent = `${quizScore}/${shuffledQuestions.length}`;
  
  // Update score message
  const scoreMessage = document.querySelector('.score-message');
  const percentage = Math.round((quizScore / shuffledQuestions.length) * 100);
  
  let message = '';
  if (percentage >= 90) {
    message = '🎉 Fantastisk! Du behersker temaet meget godt!';
  } else if (percentage >= 80) {
    message = '🌟 Bra jobbet! Du har god forståelse av temaet.';
  } else if (percentage >= 70) {
    message = '👍 Greit resultat! Du kan gjerne lese mer om temaet.';
  } else if (percentage >= 60) {
    message = '📚 Du bør lese mer om temaet for bedre forståelse.';
  } else {
    message = '💪 Ikke gi opp! Prøv å lese gjennom stoffet en gang til.';
  }
  
  scoreMessage.textContent = message;
}

function resetQuiz() {
  // Show start screen
  document.getElementById('quiz-start').classList.remove('hidden');
  document.getElementById('quiz-question').classList.add('hidden');
  document.getElementById('quiz-results').classList.add('hidden');
  
  // Reset state
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswers = [];
  shuffledQuestions = [];
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);