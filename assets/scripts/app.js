const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currenPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function endRound() {
  const initialPlayerHealth = currenPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currenPlayerHealth -= playerDamage;

  if (currenPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currenPlayerHealth = initialPlayerHealth;
    alert('You would be dead but your bonus life saved you!');
  }

  if (currentMonsterHealth <= 0 && currenPlayerHealth > 0) {
    alert('You won!');
  } else if (currenPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
  } else if (currenPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('You have a draw!');
  }
}

function attackMonster(attackMode) {
  let maxDamage;
  if (attackMode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
  } else if (attackMode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}

function attackHandler() {
  attackMonster('ATTACK');
}

function strongAttackHandler() {
  attackMonster('STRONG_ATTACK');
}

function healPlayerHandler() {
  let healValue;
  if (currenPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your max initial health.");
    healValue = chosenMaxLife - currenPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currenPlayerHealth += healValue;
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
