// Onam Sadhya Recipe Generator - JavaScript
// Main functionality for finding and displaying Onam recipes based on available ingredients

// DOM Elements
const ingredientsInput = document.getElementById('ingredientsInput');
const findRecipesBtn = document.getElementById('findRecipesBtn');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');
const noResultsSection = document.getElementById('noResultsSection');
const recipesContainer = document.getElementById('recipesContainer');

// Onam Sadhya Recipe Database
const recipes = [
    {
        name: "Avial",
        ingredients: ["vegetables", "coconut", "curry leaves", "yogurt", "coconut oil", "turmeric", "salt"],
        time: "45 mins",
        description: "A traditional Kerala dish made with mixed vegetables in a coconut and yogurt gravy. It's a staple in Onam Sadhya and represents the harmony of different flavors.",
        youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        name: "Sambar",
        ingredients: ["lentils", "vegetables", "tamarind", "spices", "curry leaves", "onion", "tomato", "coconut oil"],
        time: "60 mins",
        description: "A flavorful lentil-based vegetable stew with a tangy tamarind base. This aromatic dish is essential in any Onam feast and pairs perfectly with rice.",
        youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        name: "Olan",
        ingredients: ["pumpkin", "coconut", "coconut oil", "curry leaves", "green chilies", "salt", "black pepper"],
        time: "30 mins",
        description: "A simple yet delicious white pumpkin curry in coconut milk. This mild and creamy dish is a must-have in Onam Sadhya for its subtle flavors.",
        youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        name: "Thoran",
        ingredients: ["vegetables", "coconut", "curry leaves", "mustard seeds", "coconut oil", "turmeric", "salt"],
        time: "25 mins",
        description: "A dry vegetable dish with grated coconut and aromatic spices. Each vegetable thoran brings unique textures and flavors to the Onam feast.",
        youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        name: "Payasam",
        ingredients: ["rice", "milk", "sugar", "cardamom", "ghee", "nuts", "raisins"],
        time: "40 mins",
        description: "A sweet rice pudding flavored with cardamom and garnished with nuts. This traditional dessert is the perfect ending to an Onam Sadhya meal.",
        youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        name: "Rasam",
        ingredients: ["tomato", "tamarind", "spices", "curry leaves", "garlic", "pepper", "coriander"],
        time: "35 mins",
        description: "A tangy and spicy soup-like dish that aids digestion. Rasam is served during Onam Sadhya to cleanse the palate between courses.",
        youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        name: "Pachadi",
        ingredients: ["yogurt", "vegetables", "coconut", "curry leaves", "mustard seeds", "coconut oil", "salt"],
        time: "20 mins",
        description: "A yogurt-based side dish with vegetables and coconut. Pachadi adds a cooling element to balance the spicy dishes in Onam Sadhya.",
        youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        name: "Kootu Curry",
        ingredients: ["lentils", "vegetables", "coconut", "spices", "curry leaves", "coconut oil", "turmeric"],
        time: "50 mins",
        description: "A hearty curry made with lentils and vegetables in a coconut-based gravy. This protein-rich dish is both nutritious and delicious.",
        youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        name: "Banana Chips",
        ingredients: ["banana", "coconut oil", "salt", "turmeric"],
        time: "15 mins",
        description: "Crispy fried banana chips seasoned with salt and turmeric. These crunchy snacks are a traditional accompaniment to Onam Sadhya.",
        youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        name: "Mango Pickle",
        ingredients: ["mango", "spices", "oil", "salt", "chili powder", "turmeric"],
        time: "30 mins",
        description: "A tangy and spicy mango pickle that adds a burst of flavor to the Onam feast. This traditional pickle is made with raw mangoes and aromatic spices.",
        youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
];

// Initialize the application
function init() {
    // Add event listeners
    findRecipesBtn.addEventListener('click', findRecipes);
    ingredientsInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            findRecipes();
        }
    });
    
    // Add ingredient tag click functionality
    addIngredientTagListeners();
    
    // Add some festive effects
    addFestiveEffects();
    
    console.log('🍲 Onam Sadhya Recipe Generator initialized! 🍲');
}

// Find recipes based on available ingredients
async function findRecipes() {
    const userIngredients = getIngredientsFromInput();
    
    if (userIngredients.length === 0) {
        showError('Please enter some ingredients to find recipes!');
        return;
    }
    
    try {
        // Set loading state
        setLoadingState(true);
        
        // Simulate search delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Find matching recipes
        const matchingRecipes = findMatchingRecipes(userIngredients);
        
        // Display results
        displayResults(matchingRecipes, userIngredients);
        
    } catch (error) {
        console.error('Error finding recipes:', error);
        showError('Failed to find recipes. Please try again.');
    } finally {
        setLoadingState(false);
    }
}

// Get ingredients from input field
function getIngredientsFromInput() {
    const input = ingredientsInput.value.trim();
    if (!input) return [];
    
    return input
        .split(',')
        .map(ingredient => ingredient.trim().toLowerCase())
        .filter(ingredient => ingredient.length > 0);
}

// Find recipes that match user ingredients
function findMatchingRecipes(userIngredients) {
    const matchingRecipes = [];
    
    recipes.forEach(recipe => {
        const matchingIngredients = recipe.ingredients.filter(ingredient =>
            userIngredients.some(userIngredient =>
                ingredient.includes(userIngredient) || userIngredient.includes(ingredient)
            )
        );
        
        if (matchingIngredients.length > 0) {
            const matchPercentage = (matchingIngredients.length / recipe.ingredients.length) * 100;
            matchingRecipes.push({
                ...recipe,
                matchPercentage,
                matchingIngredients
            });
        }
    });
    
    // Sort by match percentage (highest first)
    return matchingRecipes.sort((a, b) => b.matchPercentage - a.matchPercentage);
}

// Display search results
function displayResults(matchingRecipes, userIngredients) {
    if (matchingRecipes.length === 0) {
        showNoResults();
        return;
    }
    
    // Hide other sections
    noResultsSection.classList.add('hidden');
    
    // Show results section
    resultsSection.classList.remove('hidden');
    
    // Update results header
    updateResultsHeader(matchingRecipes.length, userIngredients.length);
    
    // Clear and populate recipes container
    recipesContainer.innerHTML = '';
    matchingRecipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe, userIngredients);
        recipesContainer.appendChild(recipeCard);
    });
    
    // Add success animation
    addSuccessAnimation();
}

// Create a recipe card element
function createRecipeCard(recipe, userIngredients) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    // Highlight matching ingredients
    const ingredientsList = recipe.ingredients.map(ingredient => {
        const isMatching = recipe.matchingIngredients.includes(ingredient);
        const isAvailable = userIngredients.some(userIngredient =>
            ingredient.includes(userIngredient) || userIngredient.includes(ingredient)
        );
        
        let className = 'ingredient-item';
        if (isMatching) {
            className += ' matching';
        } else if (isAvailable) {
            className += ' available';
        }
        
        return `<span class="${className}">${ingredient}</span>`;
    }).join('');
    
    card.innerHTML = `
        <div class="recipe-header">
            <h3 class="recipe-name">${recipe.name}</h3>
            <div class="recipe-time">
                <i class="fas fa-clock"></i>
                ${recipe.time}
            </div>
        </div>
        
        <p class="recipe-description">${recipe.description}</p>
        
        <div class="recipe-ingredients">
            <h4 class="ingredients-title">
                <i class="fas fa-carrot"></i>
                Ingredients (${recipe.matchPercentage.toFixed(0)}% match)
            </h4>
            <div class="ingredients-list">
                ${ingredientsList}
            </div>
        </div>
        
        <div class="recipe-tutorial">
            <a href="${recipe.youtubeLink}" target="_blank" class="tutorial-btn">
                <i class="fab fa-youtube"></i>
                Watch Tutorial
            </a>
        </div>
    `;
    
    return card;
}

// Update results header
function updateResultsHeader(recipeCount, ingredientCount) {
    const resultsTitle = document.querySelector('.results-title');
    const resultsSubtitle = document.querySelector('.results-subtitle');
    
    resultsTitle.innerHTML = `<i class="fas fa-star"></i> Found ${recipeCount} Recipe${recipeCount !== 1 ? 's' : ''}`;
    resultsSubtitle.textContent = `Here are the recipes you can make with your ${ingredientCount} ingredient${ingredientCount !== 1 ? 's' : ''}:`;
}

// Show no results message
function showNoResults() {
    resultsSection.classList.add('hidden');
    noResultsSection.classList.remove('hidden');
}

// Set loading state
function setLoadingState(loading) {
    if (loading) {
        loadingSection.classList.remove('hidden');
        resultsSection.classList.add('hidden');
        noResultsSection.classList.add('hidden');
        findRecipesBtn.disabled = true;
        findRecipesBtn.style.opacity = '0.6';
    } else {
        loadingSection.classList.add('hidden');
        findRecipesBtn.disabled = false;
        findRecipesBtn.style.opacity = '1';
    }
}

// Add ingredient tag click listeners
function addIngredientTagListeners() {
    const ingredientTags = document.querySelectorAll('.ingredient-tag');
    
    ingredientTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const ingredient = this.textContent;
            const currentInput = ingredientsInput.value;
            
            if (currentInput) {
                ingredientsInput.value = currentInput + ', ' + ingredient;
            } else {
                ingredientsInput.value = ingredient;
            }
            
            // Focus on input
            ingredientsInput.focus();
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Add success animation
function addSuccessAnimation() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add festive effects to the page
function addFestiveEffects() {
    // Add floating food particles
    createFloatingFood();
    
    // Add click effects to buttons
    addButtonEffects();
}

// Create floating food particles
function createFloatingFood() {
    const foods = ['🍚', '🥥', '🥬', '🥕', '🍅', '🧅', '🌶️', '🥭'];
    const colors = ['#ff6b35', '#f7931e', '#ffd23f', '#4caf50', '#8bc34a', '#d32f2f'];
    
    // Create floating food elements
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createFloatingFoodElement(foods, colors);
        }, i * 3000); // Stagger creation
    }
}

// Create a single floating food element
function createFloatingFoodElement(foods, colors) {
    const food = document.createElement('div');
    food.innerHTML = foods[Math.floor(Math.random() * foods.length)];
    food.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        font-size: ${Math.random() * 20 + 15}px;
        color: ${colors[Math.floor(Math.random() * colors.length)]};
        pointer-events: none;
        z-index: 1000;
        opacity: 0.7;
        animation: floatUp 10s linear forwards;
    `;
    
    document.body.appendChild(food);
    
    // Remove food after animation
    setTimeout(() => {
        if (food.parentNode) {
            food.parentNode.removeChild(food);
        }
    }, 10000);
}

// Add button click effects
function addButtonEffects() {
    const buttons = [findRecipesBtn];
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// Show success message
function showSuccess(message) {
    showNotification(message, 'success');
}

// Show error message
function showError(message) {
    showNotification(message, 'error');
}

// Show notification
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations dynamically
function addDynamicCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .ingredient-item.matching {
            background: rgba(76, 175, 80, 0.2);
            color: #2e7d32;
            border-color: #4caf50;
        }
        
        .ingredient-item.available {
            background: rgba(255, 152, 0, 0.2);
            color: #e65100;
            border-color: #ff9800;
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    init();
    addDynamicCSS();
    
    // Add some initial festive elements
    setTimeout(() => {
        createFloatingFoodElement(['🍚', '🥥', '🥬'], ['#ff6b35', '#f7931e', '#ffd23f']);
    }, 1000);
});

// Export functions for potential external use
window.SadhyaRecipeGenerator = {
    findRecipes: findRecipes,
    getRecipes: () => recipes,
    getIngredientsFromInput: getIngredientsFromInput
};
