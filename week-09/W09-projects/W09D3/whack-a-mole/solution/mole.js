let score = 0;
let molesLeft = 8;
let popupLength = 3000;
let hideTimeout;


function popUpRandomMole() {
  if (molesLeft <= 0) {
    document.querySelector('.sb__game-over').classList.remove('sb__game-over--hidden');
    return;
  }

  const moleHeads = document.querySelectorAll('.wgs__mole-head:not(.wgs__mole-head--whacked)');
  if (moleHeads.length === 0) {
    return;
  }
  const moleIndex = Math.floor(Math.random() * moleHeads.length);
  const moleHead = moleHeads[moleIndex];

  
  moleHead.classList.remove('wgs__mole-head--hidden');

  molesLeft -= 1;
  document.querySelector('.sb__moles').innerHTML = molesLeft;

  // setTimeout(hideMole, popupLength, moleHead);
  hideTimeout = setTimeout(() => hideMole(moleHead), popupLength);
}

function hideMole(mole) {
  mole.classList.add('wgs__mole-head--hidden');

  setTimeout(popUpRandomMole, 500);
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(popUpRandomMole, 0);

  const moleHeads = document.querySelectorAll('.wgs__mole-head');
  for (let moleHead of moleHeads) {
    moleHead.addEventListener('click', () => {

      score += 1;
      document.querySelector('.sb__score').innerHTML = score;
      popupLength -= popupLength / 10;

      clearTimeout(hideTimeout);

      hideMole(moleHead)
      moleHead.classList.add('wgs__mole-head--whacked');
      
    });
  }
});
