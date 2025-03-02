/**
 * User interaction handlers for the Cuil Visualization
 */

// Global variables for UI elements and state
let tooltip;
let categoryFiltersContainer;
let selectedCategories;
let selectedWork = null;

/**
 * Create the selection panel for when multiple works are at the same position
 * @param {Array} works - The works at the selected position
 * @param {number} x - The x coordinate for the panel
 * @param {number} y - The y coordinate for the panel
 */
function showWorkSelectionPanel(works, x, y) {
  // Remove any existing selection panel
  const existingPanel = document.getElementById('work-selection-panel');
  if (existingPanel) {
    existingPanel.remove();
  }
  
  // Create panel
  const panel = document.createElement('div');
  panel.id = 'work-selection-panel';
  panel.className = 'glass-card fixed p-4 rounded-lg shadow-lg z-50 max-w-md';
  panel.style.left = `${Math.min(x, window.innerWidth - 320)}px`;
  panel.style.top = `${Math.min(y, window.innerHeight - 300)}px`;
  panel.style.maxHeight = '400px';
  panel.style.overflow = 'auto';
  panel.style.animation = 'fadeIn 0.3s ease forwards';
  
  // Add header
  const header = document.createElement('div');
  header.className = 'flex justify-between items-center mb-3';
  
  const title = document.createElement('h3');
  title.className = 'text-lg font-bold text-white';
  title.textContent = `Works at (${works[0].a}, ${works[0].b}i)`;
  
  const closeButton = document.createElement('button');
  closeButton.className = 'text-gray-400 hover:text-white transition-colors';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = () => panel.remove();
  
  header.appendChild(title);
  header.appendChild(closeButton);
  panel.appendChild(header);
  
  // Add works list
  const list = document.createElement('div');
  list.className = 'space-y-2';
  
  works.forEach(work => {
    const item = document.createElement('div');
    item.className = 'p-3 rounded-md hover:bg-white hover:bg-opacity-10 cursor-pointer transition-colors';
    
    const nameEl = document.createElement('div');
    nameEl.className = 'font-medium text-white';
    nameEl.textContent = work.name;
    
    const typeEl = document.createElement('div');
    typeEl.className = `text-xs mt-1 inline-block px-2 py-1 rounded-full ${typeBgColors[work.type] || "bg-gray-500 bg-opacity-20 text-gray-300"}`;
    typeEl.textContent = work.type;
    
    item.appendChild(nameEl);
    item.appendChild(typeEl);
    
    item.onclick = () => {
      selectedWork = work;
      updateWorkDetails(work);
      panel.remove();
      
      // Update selection styling
      svg.selectAll('.work-point')
        .attr('stroke', d => (selectedWork && d[1].some(w => w.name === selectedWork.name)) ? '#ffffff' : 'none')
        .attr('stroke-width', d => (selectedWork && d[1].some(w => w.name === selectedWork.name)) ? 3 : 0);
    };
    
    list.appendChild(item);
  });
  
  panel.appendChild(list);
  document.body.appendChild(panel);
  
  // Add click outside to close
  setTimeout(() => {
    const clickOutside = (e) => {
      if (!panel.contains(e.target) && e.target.id !== 'work-selection-panel') {
        panel.remove();
        document.removeEventListener('click', clickOutside);
      }
    };
    document.addEventListener('click', clickOutside);
  }, 100);
}

/**
 * Get a description for a work, either from predefined descriptions or generated
 * @param {Object} work - The work object
 * @returns {string} - The description
 */
function getDescriptionForWork(work) {
  if (!work) return '';
  
  return descriptions[work.name] || 
    `A ${work.type.toLowerCase()} work with ${work.a < 0 ? 'unconventional' : 'conventional'} context and ${work.b > 2 ? 'high' : 'moderate'} levels of abstraction.`;
}

/**
 * Update the work details panel with information about the selected work
 * @param {Object} work - The selected work
 */
function updateWorkDetails(work) {
  const workDetailsContainer = document.getElementById('work-details');
  const description = getDescriptionForWork(work);
  
  workDetailsContainer.innerHTML = `
    <h2 class="text-xl font-bold text-white mb-3">${work.name}</h2>
    
    <div class="mb-4">
      <span class="category-badge ${typeBgColors[work.type] || "bg-gray-500 bg-opacity-20 text-gray-300"}">
        ${work.type}
      </span>
    </div>
    
    <div class="mb-6">
      <p class="text-gray-300">${description}</p>
    </div>
    
    <div class="glass-card p-5 mt-6">
      <h3 class="font-semibold text-white mb-4">Cuil Analysis</h3>
      
      <div class="flex justify-between mb-2">
        <span class="text-sm text-gray-300">Context Normality (a):</span>
        <span class="font-medium text-white">${work.a}</span>
      </div>
      
      <div class="progress-bar">
        <div 
          class="progress-fill bg-blue-500"
          style="width: ${((work.a + 3) / 6) * 100}%; margin-left: ${work.a < 0 ? '50%' : '0'}; margin-right: ${work.a >= 0 ? '50%' : '0'};"
        ></div>
      </div>
      
      <div class="text-xs text-gray-400 flex justify-between mb-6">
        <span>Unconventional</span>
        <span>Neutral</span>
        <span>Conventional</span>
      </div>
      
      <div class="flex justify-between mb-2">
        <span class="text-sm text-gray-300">Cuil Level (b):</span>
        <span class="font-medium text-white">${work.b}</span>
      </div>
      
      <div class="progress-bar">
        <div 
          class="progress-fill bg-purple-500"
          style="width: ${(work.b / 4) * 100}%"
        ></div>
      </div>
      
      <div class="text-xs text-gray-400 flex justify-between">
        <span>Realistic</span>
        <span>Moderate</span>
        <span>Highly Abstract</span>
      </div>
    </div>
    
    <div class="mt-6 flex justify-center">
      <button id="reset-view" class="px-4 py-2 bg-gray-700 bg-opacity-50 hover:bg-opacity-70 rounded-md text-sm text-white transition-colors">
        Reset View
      </button>
    </div>
  `;
  
  // Add event listener to reset view button
  document.getElementById('reset-view').addEventListener('click', () => {
    svg.transition()
      .duration(750)
      .call(zoom.transform, d3.zoomIdentity);
  });
}

/**
 * Initialize the UI elements and event handlers
 */
function initializeUI() {
  // Set up tooltip
  tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);
  
  // Set up category filters
  categoryFiltersContainer = document.getElementById('category-filters');
  selectedCategories = new Set();
  
  // Generate category filter buttons
  categories.forEach(category => {
    const button = document.createElement('button');
    button.className = 'filter-button px-4 py-2 rounded-full text-xs font-medium border transition-colors duration-300 bg-opacity-10 text-gray-300 border-gray-700 hover:bg-opacity-20';
    button.textContent = category;
    button.dataset.category = category;
    
    button.addEventListener('click', () => {
      if (selectedCategories.has(category)) {
        selectedCategories.delete(category);
        button.className = 'filter-button px-4 py-2 rounded-full text-xs font-medium border transition-colors duration-300 bg-opacity-10 text-gray-300 border-gray-700 hover:bg-opacity-20';
      } else {
        selectedCategories.add(category);
        const colors = typeBgColors[category].split(' ');
        button.className = `filter-button active px-4 py-2 rounded-full text-xs font-medium border transition-colors duration-300 ${colors[0]} ${colors[1]} border-${colors[0].substring(3)}-400`;
      }
      
      updateVisualization(true);
    });
    
    categoryFiltersContainer.appendChild(button);
  });
  
  // Add clear button
  const clearButton = document.createElement('button');
  clearButton.className = 'filter-button px-4 py-2 rounded-full text-xs font-medium border transition-colors duration-300 bg-opacity-10 text-gray-300 border-gray-700 hover:bg-opacity-20';
  clearButton.textContent = 'Clear all';
  clearButton.style.display = 'none';
  
  clearButton.addEventListener('click', () => {
    selectedCategories.clear();
    
    // Reset all category buttons
    categoryFiltersContainer.querySelectorAll('button[data-category]').forEach(button => {
      button.className = 'filter-button px-4 py-2 rounded-full text-xs font-medium border transition-colors duration-300 bg-opacity-10 text-gray-300 border-gray-700 hover:bg-opacity-20';
    });
    
    clearButton.style.display = 'none';
    updateVisualization(true);
  });
  
  categoryFiltersContainer.appendChild(clearButton);
}

/**
 * Add a particle effect to the background
 */
function createParticles() {
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  
  const particles = [];
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      color: `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25
    });
  }
  
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX = -particle.speedX;
      }
      
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY = -particle.speedY;
      }
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
  }
  
  animate();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
} 