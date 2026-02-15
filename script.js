// ===== State Management =====
let cards = [];
let selectedCardId = null;

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', () => {
  loadCards();
  initializeTheme();
  attachEventListeners();
  renderCards();
});

// ===== Local Storage =====
function loadCards() {
  const savedCards = localStorage.getItem('creditCards');
  if (savedCards) {
    cards = JSON.parse(savedCards);
  } else {
    // Default card based on user's requirement
    cards = [{
      id: generateId(),
      name: 'Default Card',
      spendPerPoint: 150,
      pointsEarned: 25,
      pointValue: 1
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
  themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ===== Event Listeners =====
function attachEventListeners() {
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('addCardBtn').addEventListener('click', openAddCardModal);
  document.getElementById('cancelCardBtn').addEventListener('click', closeCardModal);
  document.getElementById('saveCardBtn').addEventListener('click', saveCard);
  document.getElementById('itemPrice').addEventListener('input', calculateOptimalPoints);
  
  // Close modal on overlay click
  document.getElementById('cardModal').addEventListener('click', (e) => {
    if (e.target.id === 'cardModal') {
      closeCardModal();
    }
  });
}

// ===== Card Management =====
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function renderCards() {
  const cardList = document.getElementById('cardList');
  
  if (cards.length === 0) {
    cardList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">💳</div>
        <p>No credit cards added yet. Add your first card to get started!</p>
      </div>
    `;
    return;
  }
  
  cardList.innerHTML = cards.map(card => `
    <div class="credit-card-item ${card.id === selectedCardId ? 'active' : ''}" 
         onclick="selectCard('${card.id}')">
      <div class="card-info">
        <h4>${escapeHtml(card.name)}</h4>
        <div class="card-details">
          ${card.pointsEarned} points per ₹${card.spendPerPoint} | 
          1 point = ₹${card.pointValue}
        </div>
      </div>
      <div class="card-actions">
        <button class="btn-icon" onclick="editCard('${card.id}'); event.stopPropagation();" 
                title="Edit card">✏️</button>
        <button class="btn-icon" onclick="deleteCard('${card.id}'); event.stopPropagation();" 
                title="Delete card">🗑️</button>
      </div>
    </div>
  `).join('');
}

function selectCard(cardId) {
  selectedCardId = cardId;
  renderCards();
  calculateOptimalPoints();
}

function openAddCardModal() {
  document.getElementById('cardModalTitle').textContent = 'Add Credit Card';
  document.getElementById('cardForm').reset();
  document.getElementById('cardForm').dataset.editId = '';
  document.getElementById('cardModal').classList.remove('hidden');
}

function openEditCardModal(card) {
  document.getElementById('cardModalTitle').textContent = 'Edit Credit Card';
  document.getElementById('cardName').value = card.name;
  document.getElementById('spendPerPoint').value = card.spendPerPoint;
  document.getElementById('pointsEarned').value = card.pointsEarned;
  document.getElementById('pointValue').value = card.pointValue;
  document.getElementById('cardForm').dataset.editId = card.id;
  document.getElementById('cardModal').classList.remove('hidden');
}

function closeCardModal() {
  document.getElementById('cardModal').classList.add('hidden');
}

function saveCard() {
  const form = document.getElementById('cardForm');
  const editId = form.dataset.editId;
  
  const cardData = {
    name: document.getElementById('cardName').value.trim(),
    spendPerPoint: parseFloat(document.getElementById('spendPerPoint').value),
    pointsEarned: parseFloat(document.getElementById('pointsEarned').value),
    pointValue: parseFloat(document.getElementById('pointValue').value)
  };
  
  // Validation
  if (!cardData.name || cardData.spendPerPoint <= 0 || 
      cardData.pointsEarned <= 0 || cardData.pointValue <= 0) {
    alert('Please fill in all fields with valid values');
    return;
  }
  
  if (editId) {
    // Edit existing card
    const index = cards.findIndex(c => c.id === editId);
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
    
    // Select the new card if it's the first one
    if (cards.length === 1) {
      selectedCardId = newCard.id;
    }
  }
  
  saveCards();
  renderCards();
  closeCardModal();
  calculateOptimalPoints();
}

function editCard(cardId) {
  const card = cards.find(c => c.id === cardId);
  if (card) {
    openEditCardModal(card);
  }
}

function deleteCard(cardId) {
  if (cards.length === 1) {
    alert('You must have at least one credit card');
    return;
  }
  
  if (confirm('Are you sure you want to delete this card?')) {
    cards = cards.filter(c => c.id !== cardId);
    
    // If deleted card was selected, select the first card
    if (selectedCardId === cardId) {
      selectedCardId = cards[0]?.id || null;
    }
    
    saveCards();
    renderCards();
    calculateOptimalPoints();
  }
}

// ===== Points Calculation =====
function calculatePointsEarned(amount, card) {
  // Points earned = floor(amount / spendPerPoint) * pointsEarned
  return Math.floor(amount / card.spendPerPoint) * card.pointsEarned;
}

function findOptimalPointsUsage(itemPrice, card) {
  // Goal: Find points to use such that points_earned >= points_used
  // final_price = itemPrice - points_used * pointValue
  // points_earned = floor(final_price / spendPerPoint) * pointsEarned
  
  let bestSolution = null;
  let minDifference = Infinity;
  
  // Try different points usage amounts
  // Maximum points we can use is itemPrice / pointValue
  const maxPoints = Math.floor(itemPrice / card.pointValue);
  
  for (let pointsUsed = 0; pointsUsed <= maxPoints; pointsUsed++) {
    const finalPrice = itemPrice - (pointsUsed * card.pointValue);
    
    // Can't have negative final price
    if (finalPrice < 0) break;
    
    const pointsEarned = calculatePointsEarned(finalPrice, card);
    const difference = pointsEarned - pointsUsed;
    
    // We want points_earned >= points_used
    if (difference >= 0) {
      // Found a valid solution
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
      
      // If we found a perfect solution, we can stop
      if (difference === 0) {
        break;
      }
    }
  }
  
  return bestSolution;
}

function calculateOptimalPoints() {
  const itemPriceInput = document.getElementById('itemPrice');
  const resultsDiv = document.getElementById('results');
  
  const itemPrice = parseFloat(itemPriceInput.value);
  
  // Clear results if no valid input
  if (!itemPrice || itemPrice <= 0 || !selectedCardId) {
    resultsDiv.classList.add('hidden');
    return;
  }
  
  const selectedCard = cards.find(c => c.id === selectedCardId);
  if (!selectedCard) {
    resultsDiv.classList.add('hidden');
    return;
  }
  
  // Calculate points earned without using any points
  const pointsWithoutRedeem = calculatePointsEarned(itemPrice, selectedCard);
  
  // Find optimal points usage
  const solution = findOptimalPointsUsage(itemPrice, selectedCard);
  
  // Display results
  resultsDiv.classList.remove('hidden');
  
  if (solution) {
    const savingsAmount = itemPrice - solution.finalPrice;
    const savingsPercent = ((savingsAmount / itemPrice) * 100).toFixed(1);
    
    resultsDiv.innerHTML = `
      <h3 class="mb-md">Optimization Results</h3>
      
      <div class="result-item">
        <span class="result-label">Original Price</span>
        <span class="result-value">₹${itemPrice.toFixed(2)}</span>
      </div>
      
      <div class="result-item">
        <span class="result-label">Points to Use</span>
        <span class="result-value highlight">${solution.pointsUsed}</span>
      </div>
      
      <div class="result-item">
        <span class="result-label">Final Price</span>
        <span class="result-value success">₹${solution.finalPrice.toFixed(2)}</span>
      </div>
      
      <div class="result-item">
        <span class="result-label">Points Earned Back</span>
        <span class="result-value">${solution.pointsEarned}</span>
      </div>
      
      <div class="result-item">
        <span class="result-label">Net Points Change</span>
        <span class="result-value ${solution.difference >= 0 ? 'success' : 'warning'}">
          ${solution.difference >= 0 ? '+' : ''}${solution.difference}
        </span>
      </div>
      
      <div class="result-item">
        <span class="result-label">Effective Savings</span>
        <span class="result-value success">₹${savingsAmount.toFixed(2)} (${savingsPercent}%)</span>
      </div>
      
      ${solution.isPerfect ? `
        <div style="margin-top: var(--space-md); padding: var(--space-md); background: var(--gradient-card); border-radius: var(--radius-md); text-align: center;">
          <strong style="color: var(--accent-success);">🎯 Perfect Solution!</strong><br>
          <span style="font-size: 0.875rem; color: var(--text-secondary);">
            You'll earn back exactly the points you use
          </span>
        </div>
      ` : ''}
      
      <div style="margin-top: var(--space-md); padding: var(--space-sm); background: var(--bg-secondary); border-radius: var(--radius-sm); font-size: 0.875rem; color: var(--text-secondary);">
        💡 Without using points, you would earn ${pointsWithoutRedeem} points on this purchase.
      </div>
    `;
  } else {
    resultsDiv.innerHTML = `
      <h3 class="mb-md">Optimization Results</h3>
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <p>No optimal solution found for this price with the selected card.</p>
        <p style="font-size: 0.875rem; margin-top: var(--space-sm);">
          Without using points, you would earn ${pointsWithoutRedeem} points.
        </p>
      </div>
    `;
  }
}

// ===== Utility Functions =====
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
