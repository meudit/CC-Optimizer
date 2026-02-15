// ===== State Management =====
let cards = [];
let selectedCardId = null;
let selectedColor = '#3B82F6'; // Default blue
let editingCardId = null;
let currentMultiplier = 1; // Default 1x multiplier

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', () => {
  loadCards();
  initializeTheme();
  attachEventListeners();
  renderCardCarousel();
  updateEmptyState();
});

// ===== Local Storage =====
function loadCards() {
  const savedCards = localStorage.getItem('creditCards');
  if (savedCards) {
    cards = JSON.parse(savedCards);
  } else {
    // Default card
    cards = [{
      id: generateId(),
      bankName: 'HDFC Bank',
      cardName: 'Regalia Gold',
      spendPerPoint: 150,
      pointsEarned: 4,
      pointValue: 1,
      color: '#3B82F6'
    }];
    saveCards();
  }

  if (cards.length > 0 && !selectedCardId) {
    selectedCardId = cards[0].id;
  }
}

function saveCards() {
  localStorage.setItem('creditCards', JSON.stringify(cards));
}

// ===== Theme Management =====
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon();
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const theme = document.documentElement.getAttribute('data-theme');
  const themeToggle = document.getElementById('themeToggle');
  const icon = theme === 'light'
    ? '<svg class="icon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
    : '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  themeToggle.innerHTML = icon;
}

// ===== Event Listeners =====
function attachEventListeners() {
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('manageCardsBtn').addEventListener('click', openManageCardsModal);
  document.getElementById('calculateBtn').addEventListener('click', calculateOptimalPoints);
  document.getElementById('saveCardBtn').addEventListener('click', saveCard);
  document.getElementById('itemPrice').addEventListener('input', hideResults);

  // Multiplier buttons
  document.querySelectorAll('.multiplier-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectMultiplier(parseFloat(btn.dataset.multiplier));
    });
  });

  // Custom multiplier input
  const customInput = document.getElementById('customMultiplier');
  customInput.addEventListener('input', () => {
    const value = parseFloat(customInput.value);
    if (value && value > 0) {
      selectMultiplier(value, true);
    }
  });

  customInput.addEventListener('focus', () => {
    // Deactivate preset buttons when focusing custom input
    document.querySelectorAll('.multiplier-btn').forEach(btn => {
      btn.classList.remove('active');
    });
  });

  // Color picker
  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      selectColor(btn.dataset.color);
    });
  });

  // Close modal on overlay click
  document.getElementById('manageCardsModal').addEventListener('click', (e) => {
    if (e.target.id === 'manageCardsModal') {
      closeManageCardsModal();
    }
  });
}

// ===== Helper Functions =====
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===== Card Carousel =====
function renderCardCarousel() {
  const carousel = document.getElementById('cardCarousel');

  if (cards.length === 0) {
    carousel.innerHTML = `
      <button class="add-card-btn" onclick="openManageCardsModal()">
        <svg class="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Add Your First Card
      </button>
    `;
    return;
  }

  const cardsHTML = cards.map(card => `
    <div class="credit-card ${card.id === selectedCardId ? 'selected' : ''}"
         onclick="selectCard('${card.id}')"
         style="--card-color: ${card.color || '#3B82F6'}">
      <div class="card-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      </div>
      <div class="card-earn-rate">
        <div class="earn-label">Earn Rate</div>
        <div class="earn-value">${card.pointsEarned} pts</div>
        <div class="earn-detail">per ₹${card.spendPerPoint}</div>
      </div>
      <div class="card-bank">${escapeHtml(card.bankName)}</div>
      <div class="card-name">${escapeHtml(card.cardName)}</div>
    </div>
  `).join('');

  const addButtonHTML = `
    <button class="add-card-btn" onclick="openManageCardsModal()">
      <svg class="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      Add Card
    </button>
  `;

  carousel.innerHTML = cardsHTML + addButtonHTML;
}

function selectCard(cardId) {
  selectedCardId = cardId;
  renderCardCarousel();
  hideResults();
}

// ===== Manage Cards Modal =====
function openManageCardsModal() {
  document.getElementById('manageCardsModal').classList.remove('hidden');
  renderCardsList();
  resetForm();
}

function closeManageCardsModal() {
  document.getElementById('manageCardsModal').classList.add('hidden');
  renderCardCarousel();
}

function renderCardsList() {
  const cardsList = document.getElementById('cardsList');

  if (cards.length === 0) {
    cardsList.innerHTML = '';
    updateEmptyState();
    return;
  }

  cardsList.innerHTML = cards.map(card => `
    <div class="card-item">
      <div class="card-item-info">
        <h4>${escapeHtml(card.bankName)} - ${escapeHtml(card.cardName)}</h4>
        <p>${card.pointsEarned} points per ₹${card.spendPerPoint} | 1 point = ₹${card.pointValue || 1}</p>
      </div>
      <div class="card-item-actions">
        <button class="btn-icon" onclick="editCard('${card.id}')" title="Edit">
          <svg class="icon" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </button>
        <button class="btn-icon" onclick="deleteCard('${card.id}')" title="Delete">
          <svg class="icon" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    </div>
  `).join('');

  updateEmptyState();
}

function updateEmptyState() {
  const emptyMessage = document.getElementById('emptyMessage');
  if (cards.length === 0) {
    emptyMessage.classList.remove('hidden');
  } else {
    emptyMessage.classList.add('hidden');
  }
}

// ===== Card Form =====
function resetForm() {
  document.getElementById('cardForm').reset();
  document.getElementById('formTitle').textContent = 'NEW CARD';
  document.getElementById('cancelFormBtn').classList.add('hidden');
  editingCardId = null;
  selectedColor = '#3B82F6';
  selectColor(selectedColor);
}

function saveCard() {
  const bankName = document.getElementById('bankName').value.trim();
  const cardName = document.getElementById('cardName').value.trim();
  const pointsEarned = parseFloat(document.getElementById('pointsEarned').value);
  const spendPerPoint = parseFloat(document.getElementById('spendPerPoint').value);
  const pointValue = parseFloat(document.getElementById('pointValue').value);

  if (!bankName || !cardName || !pointsEarned || !spendPerPoint || !pointValue) {
    alert('Please fill in all fields');
    return;
  }

  if (pointValue <= 0 || pointsEarned <= 0 || spendPerPoint <= 0) {
    alert('All numeric values must be greater than 0');
    return;
  }

  const cardData = {
    bankName,
    cardName,
    pointsEarned,
    spendPerPoint,
    pointValue,
    color: selectedColor
  };

  if (editingCardId) {
    // Edit existing card
    const index = cards.findIndex(c => c.id === editingCardId);
    if (index !== -1) {
      cards[index] = { ...cards[index], ...cardData };
    }
  } else {
    // Add new card
    const newCard = {
      id: generateId(),
      ...cardData
    };
    cards.push(newCard);

    if (cards.length === 1) {
      selectedCardId = newCard.id;
    }
  }

  saveCards();
  renderCardsList();
  renderCardCarousel();
  resetForm();
}

function editCard(cardId) {
  const card = cards.find(c => c.id === cardId);
  if (!card) return;

  editingCardId = cardId;
  document.getElementById('formTitle').textContent = 'EDIT CARD';
  document.getElementById('cancelFormBtn').classList.remove('hidden');
  document.getElementById('bankName').value = card.bankName;
  document.getElementById('cardName').value = card.cardName;
  document.getElementById('pointsEarned').value = card.pointsEarned;
  document.getElementById('spendPerPoint').value = card.spendPerPoint;
  document.getElementById('pointValue').value = card.pointValue || 1;
  selectedColor = card.color || '#3B82F6';
  selectColor(selectedColor);

  // Scroll to form
  document.querySelector('.card-form-section').scrollIntoView({ behavior: 'smooth' });
}

function cancelCardForm() {
  resetForm();
}

function deleteCard(cardId) {
  if (cards.length === 1) {
    alert('You must have at least one credit card');
    return;
  }

  if (confirm('Are you sure you want to delete this card?')) {
    cards = cards.filter(c => c.id !== cardId);

    if (selectedCardId === cardId) {
      selectedCardId = cards[0]?.id || null;
    }

    saveCards();
    renderCardsList();
    renderCardCarousel();
  }
}

// ===== Color Picker =====
function selectColor(color) {
  selectedColor = color;

  document.querySelectorAll('.color-btn').forEach(btn => {
    if (btn.dataset.color === color) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
}

// ===== Multiplier Selection =====
function selectMultiplier(multiplier, isCustom = false) {
  currentMultiplier = multiplier;

  const customInput = document.getElementById('customMultiplier');

  if (isCustom) {
    // Custom multiplier - highlight input
    customInput.classList.add('active');
    document.querySelectorAll('.multiplier-btn').forEach(btn => {
      btn.classList.remove('active');
    });
  } else {
    // Preset multiplier - highlight button and clear custom input
    customInput.classList.remove('active');
    customInput.value = '';

    document.querySelectorAll('.multiplier-btn').forEach(btn => {
      if (parseFloat(btn.dataset.multiplier) === multiplier) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Hide results to force recalculation
  hideResults();
}

// ===== Points Calculation =====
function calculatePointsEarned(amount, card) {
  // Apply multiplier to points earned
  return Math.floor(amount / card.spendPerPoint) * card.pointsEarned * currentMultiplier;
}

function findOptimalPointsUsage(itemPrice, card) {
  let bestSolution = null;
  let minDifference = Infinity;

  const maxPoints = Math.floor(itemPrice / card.pointValue);

  for (let pointsUsed = 0; pointsUsed <= maxPoints; pointsUsed++) {
    const finalPrice = itemPrice - (pointsUsed * card.pointValue);

    if (finalPrice < 0) break;

    const pointsEarned = calculatePointsEarned(finalPrice, card);
    const difference = pointsEarned - pointsUsed;

    if (difference >= 0) {
      if (difference < minDifference) {
        minDifference = difference;
        bestSolution = {
          pointsUsed,
          finalPrice,
          pointsEarned,
          difference,
          isPerfect: difference === 0
        };
      }

      if (difference === 0) break;
    }
  }

  return bestSolution;
}

function calculateOptimalPoints() {
  const itemPrice = parseFloat(document.getElementById('itemPrice').value);

  if (!itemPrice || itemPrice <= 0 || !selectedCardId) {
    alert('Please enter a valid item price and select a card');
    return;
  }

  const selectedCard = cards.find(c => c.id === selectedCardId);
  if (!selectedCard) return;

  const pointsWithoutRedeem = calculatePointsEarned(itemPrice, selectedCard);
  const solution = findOptimalPointsUsage(itemPrice, selectedCard);

  const resultsSection = document.getElementById('resultsSection');
  const resultsContent = document.getElementById('resultsContent');

  if (solution) {
    const savingsAmount = itemPrice - solution.finalPrice;
    const savingsPercent = ((savingsAmount / itemPrice) * 100).toFixed(1);

    resultsContent.innerHTML = `
      ${currentMultiplier > 1 ? `
        <div style="background: #DBEAFE; padding: var(--space-sm); border-radius: var(--radius-sm); margin-bottom: var(--space-sm); text-align: center;">
          <strong style="color: #3B82F6;">🚀 ${currentMultiplier}x Multiplier Active</strong>
        </div>
      ` : ''}
      <div class="result-row">
        <span class="result-label">Original Price</span>
        <span class="result-value">₹${itemPrice.toFixed(2)}</span>
      </div>
      <div class="result-row">
        <span class="result-label">Points to Use</span>
        <span class="result-value highlight">${solution.pointsUsed}</span>
      </div>
      <div class="result-row">
        <span class="result-label">Final Price</span>
        <span class="result-value success">₹${solution.finalPrice.toFixed(2)}</span>
      </div>
      <div class="result-row">
        <span class="result-label">Points Earned Back</span>
        <span class="result-value">${solution.pointsEarned}${currentMultiplier > 1 ? ` (${currentMultiplier}x)` : ''}</span>
      </div>
      <div class="result-row">
        <span class="result-label">Net Points Change</span>
        <span class="result-value ${solution.difference >= 0 ? 'success' : ''}">${solution.difference >= 0 ? '+' : ''}${solution.difference}</span>
      </div>
      ${solution.isPerfect ? `
        <div class="perfect-badge">
          <strong>🎯 Perfect Solution!</strong><br>
          <span style="font-size: 0.875rem; color: var(--text-secondary);">You'll earn back exactly the points you use</span>
        </div>
      ` : ''}
    `;
  } else {
    resultsContent.innerHTML = `
      <div style="text-align: center; padding: var(--space-lg); color: var(--text-muted);">
        <p>No optimal solution found for this price.</p>
        <p style="font-size: 0.875rem; margin-top: var(--space-sm);">Without using points, you would earn ${pointsWithoutRedeem} points.</p>
      </div>
    `;
  }

  resultsSection.classList.remove('hidden');
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideResults() {
  document.getElementById('resultsSection').classList.add('hidden');
}

