
const cardGrid = document.querySelector('.card-grid');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');

let score = 0;
let time = 60;
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timer = null;
let gameStarted = false;

// daftar gambar (4 gambar di folder Card)
const images = ['DriftMaster.jpg', 'MuscleOutlaw.jpg', 'StreetKing.jpg', 'TorqueLegend.jpg'];

// generate kartu (2 pasang tiap gambar → total 8 kartu)
images.forEach((img, index) => {
  for (let i = 0; i < 2; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.pair = index;

    // depan (tertutup)
    const front = document.createElement('div');
    front.classList.add('front');

    // belakang (gambar)
    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url('Card/${img}')`;

    card.appendChild(front);
    card.appendChild(back);

    cardGrid.appendChild(card);
    cards.push(card);
  }
});

// shuffle kartu
cards = shuffle(cards);
cards.forEach((card) => cardGrid.appendChild(card));

// tambahkan event listener
cards.forEach((card) => {
  card.addEventListener('click', flipCard);
});

// fungsi flip kartu
function flipCard() {
  if (!gameStarted) {
    startTimer();
    gameStarted = true;
  }

  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

// fungsi check match
function checkMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];

  if (card1.dataset.pair === card2.dataset.pair) {
    score++;
    matchedPairs++;
    scoreElement.textContent = `Skor: ${score}`;

    // hilangkan kartu kalau cocok
    setTimeout(() => {
      card1.style.visibility = 'hidden';
      card2.style.visibility = 'hidden';
    }, 400);

    // cek menang
    if (matchedPairs === images.length) {
      clearInterval(timer);
      setTimeout(() => {
        alert(' Kamu Menang! ');
      }, 500);
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  flippedCards = [];
}

// fungsi shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// fungsi timer
function startTimer() {
  timer = setInterval(() => {
    time--;
    timeElement.textContent = `Waktu: ${time} detik`;

    if (time === 0) {
      clearInterval(timer);
      alert('⏰ Waktu habis!');
    }
  }, 1000);
}

