/**
 * User interaction handlers for the Cuil Visualization
 */

// Global variables for UI elements and state
let tooltip;
let categoryFiltersContainer;
let selectedCategories;
let searchInput;
let clearSearchButton;
let searchTerm = '';
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
  title.textContent = `Works at (${works[0].a.toFixed(1)}, ${works[0].b.toFixed(1)}i)`;
  
  const closeButton = document.createElement('button');
  closeButton.className = 'text-gray-400 hover:text-white transition-colors';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = () => panel.remove();
  
  header.appendChild(title);
  header.appendChild(closeButton);
  panel.appendChild(header);
  
  // Add metrics selection buttons
  const metricsControls = document.createElement('div');
  metricsControls.className = 'flex justify-between items-center mb-4';
  
  const selectAllButton = document.createElement('button');
  selectAllButton.className = 'px-3 py-1 bg-teal-700 bg-opacity-50 hover:bg-opacity-70 rounded-md text-xs text-white transition-colors';
  selectAllButton.textContent = 'Select All for Metrics';
  selectAllButton.onclick = () => {
    works.forEach(work => {
      if (!isWorkSelectedForMetrics(work)) {
        toggleWorkSelection(work);
      }
    });
    updateWorkSelections();
    updateSelectionPanel();
  };
  
  const clearAllButton = document.createElement('button');
  clearAllButton.className = 'px-3 py-1 bg-red-700 bg-opacity-50 hover:bg-opacity-70 rounded-md text-xs text-white transition-colors';
  clearAllButton.textContent = 'Clear All Selections';
  clearAllButton.onclick = () => {
    works.forEach(work => {
      if (isWorkSelectedForMetrics(work)) {
        toggleWorkSelection(work);
      }
    });
    updateWorkSelections();
    updateSelectionPanel();
  };
  
  metricsControls.appendChild(selectAllButton);
  metricsControls.appendChild(clearAllButton);
  panel.appendChild(metricsControls);
  
  // Add works list
  const list = document.createElement('div');
  list.className = 'space-y-2';
  
  // Check if we're searching
  const isSearching = searchTerm && searchTerm.length > 0;
  
  // Sort works to prioritize search matches if searching
  if (isSearching) {
    works.sort((a, b) => {
      const aMatches = a.name.toLowerCase().includes(searchTerm) || 
                      a.type.toLowerCase().includes(searchTerm) ||
                      (descriptions[a.name] && descriptions[a.name].toLowerCase().includes(searchTerm));
      const bMatches = b.name.toLowerCase().includes(searchTerm) || 
                      b.type.toLowerCase().includes(searchTerm) ||
                      (descriptions[b.name] && descriptions[b.name].toLowerCase().includes(searchTerm));
                      
      return bMatches - aMatches; // true (1) values first, false (0) values last
    });
  }
  
  // Function to update the selection panel items
  function updateSelectionPanel() {
    list.querySelectorAll('.work-item').forEach((item, index) => {
      const work = works[index];
      const isSelectedForMetricsNow = isWorkSelectedForMetrics(work);
      
      // Update the metrics button
      const metricsButton = item.querySelector('.metrics-toggle-button');
      if (metricsButton) {
        metricsButton.textContent = isSelectedForMetricsNow ? 'Remove' : 'Add';
        metricsButton.className = isSelectedForMetricsNow
          ? 'metrics-toggle-button ml-2 px-2 py-1 bg-red-700 bg-opacity-50 hover:bg-opacity-70 rounded text-xs text-white transition-colors'
          : 'metrics-toggle-button ml-2 px-2 py-1 bg-teal-700 bg-opacity-50 hover:bg-opacity-70 rounded text-xs text-white transition-colors';
      }
      
      // Update the item border
      if (isSelectedForMetricsNow) {
        item.classList.add('border-teal-400');
        item.classList.remove('border-gray-700');
      } else {
        item.classList.remove('border-teal-400');
        item.classList.add('border-gray-700');
      }
    });
  }
  
  works.forEach(work => {
    const isSearchMatch = isSearching && (
      work.name.toLowerCase().includes(searchTerm) || 
      work.type.toLowerCase().includes(searchTerm) ||
      (descriptions[work.name] && descriptions[work.name].toLowerCase().includes(searchTerm))
    );
    
    const isSelectedForMetricsNow = isWorkSelectedForMetrics(work);
    
    const item = document.createElement('div');
    item.className = 'work-item';
    
    // Add special highlighting for search matches and metrics selection
    if (isSearchMatch) {
      item.className = 'work-item p-3 rounded-md bg-blue-500 bg-opacity-20 hover:bg-opacity-30 cursor-pointer transition-colors border';
      if (isSelectedForMetricsNow) {
        item.className += ' border-teal-400';
      } else {
        item.className += ' border-blue-400';
      }
    } else {
      item.className = 'work-item p-3 rounded-md hover:bg-white hover:bg-opacity-10 cursor-pointer transition-colors border';
      if (isSelectedForMetricsNow) {
        item.className += ' border-teal-400';
      } else {
        item.className += ' border-gray-700';
      }
    }
    
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'flex justify-between items-start';
    
    const textContent = document.createElement('div');
    textContent.className = 'flex-grow';
    
    const nameEl = document.createElement('div');
    nameEl.className = 'font-medium text-white';
    nameEl.textContent = work.name;
    
    const typeEl = document.createElement('div');
    typeEl.className = `text-xs mt-1 inline-block px-2 py-1 rounded-full ${typeBgColors[work.type] || "bg-gray-500 bg-opacity-20 text-gray-300"}`;
    typeEl.textContent = work.type;
    
    textContent.appendChild(nameEl);
    textContent.appendChild(typeEl);
    
    // Add metrics toggle button
    const metricsButton = document.createElement('button');
    metricsButton.className = isSelectedForMetricsNow
      ? 'metrics-toggle-button ml-2 px-2 py-1 bg-red-700 bg-opacity-50 hover:bg-opacity-70 rounded text-xs text-white transition-colors'
      : 'metrics-toggle-button ml-2 px-2 py-1 bg-teal-700 bg-opacity-50 hover:bg-opacity-70 rounded text-xs text-white transition-colors';
    metricsButton.textContent = isSelectedForMetricsNow ? 'Remove' : 'Add';
    metricsButton.onclick = (e) => {
      e.stopPropagation(); // Prevent item click
      toggleWorkSelection(work);
      updateWorkSelections();
      updateSelectionPanel();
    };
    
    contentWrapper.appendChild(textContent);
    contentWrapper.appendChild(metricsButton);
    item.appendChild(contentWrapper);
    
    // If searching, show where the match was found
    if (isSearchMatch) {
      const matchInfo = document.createElement('div');
      matchInfo.className = 'text-xs text-blue-300 mt-2';
      
      if (work.name.toLowerCase().includes(searchTerm)) {
        matchInfo.textContent = 'Matches in name';
      } else if (work.type.toLowerCase().includes(searchTerm)) {
        matchInfo.textContent = 'Matches in type';
      } else {
        matchInfo.textContent = 'Matches in description';
      }
      
      item.appendChild(matchInfo);
    }
    
    item.onclick = () => {
      selectedWork = work;
      updateWorkDetails(work);
      panel.remove();
      
      // Update selection styling
      svg.selectAll('.work-point')
        .attr('stroke', d => {
          if (d[1].some(work => isWorkSelectedForMetrics(work))) {
            return '#00ebc7'; // Teal color for metrics selection
          } else if (selectedWork && d[1].some(w => w.name === selectedWork.name)) {
            return '#ffffff'; // White for the currently selected work
          } else {
            return 'none';
          }
        })
        .attr('stroke-width', d => {
          if (d[1].some(work => isWorkSelectedForMetrics(work)) || 
              (selectedWork && d[1].some(w => w.name === selectedWork.name))) {
            return 3;
          } else {
            return 0;
          }
        });
    };
    
    list.appendChild(item);
  });
  
  panel.appendChild(list);
  
  // Add view metrics button at the bottom
  const viewMetricsButton = document.createElement('button');
  viewMetricsButton.className = 'mt-4 w-full px-4 py-2 bg-blue-700 bg-opacity-50 hover:bg-opacity-70 rounded-md text-sm text-white transition-colors';
  viewMetricsButton.textContent = 'View Metrics for Selected Works';
  viewMetricsButton.onclick = () => {
    // Check if any works are selected
    if (selectedWorksForMetrics.size === 0) {
      showMessage('Please select at least one work first');
      return;
    }
    
    // Call visualizeMetrics with 'magnitude' as default
    visualizeMetrics('magnitude');
    panel.remove();
  };
  
  panel.appendChild(viewMetricsButton);
  
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
  
  // Use the extensive descriptions we've added
  return descriptions[work.name] || 
    `A ${work.type.toLowerCase()} work with ${work.a < 0 ? 'unconventional' : 'conventional'} context and ${
    work.b > 0 ? (work.b > 2 ? 'high positive' : 'moderate positive') : (work.b < -2 ? 'intense hyper-realistic' : 'moderately hyper-realistic')
    } levels of abstraction.`;
}

/**
 * Update the work details panel with information about the selected work
 * @param {Object} work - The selected work
 */
function updateWorkDetails(work) {
  const workDetailsContainer = document.getElementById('work-details');
  let description = getDescriptionForWork(work);
  
  // Highlight search term in description if applicable
  if (searchTerm && searchTerm.length > 0 && description.toLowerCase().includes(searchTerm.toLowerCase())) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    description = description.replace(regex, '<span class="bg-blue-500 bg-opacity-30 text-white px-1 rounded">$1</span>');
  }
  
  // Determine which quadrant the work is in
  let quadrant = "";
  if (work.a >= 0 && work.b >= 0) quadrant = "Quadrant I";
  else if (work.a < 0 && work.b >= 0) quadrant = "Quadrant II";
  else if (work.a < 0 && work.b < 0) quadrant = "Quadrant III";
  else quadrant = "Quadrant IV";
  
  // Define labels for the abstraction scale based on quadrant
  let abstractionLabels = [];
  if (work.b >= 0) {
    abstractionLabels = ["Minimal", "Moderate", "Highly Abstract"];
  } else {
    abstractionLabels = ["Minimal", "Moderate", "Intensely Hyper-Realistic"];
  }
  
  // Check if this work matches search criteria
  const isSearchMatch = searchTerm && searchTerm.length > 0 && (
    work.name.toLowerCase().includes(searchTerm) || 
    work.type.toLowerCase().includes(searchTerm) ||
    (descriptions[work.name] && descriptions[work.name].toLowerCase().includes(searchTerm))
  );
  
  // Calculate metrics for this work
  const metrics = calculateMetrics(work);
  
  // Check if this work is selected for metrics
  const isSelectedForMetrics = isWorkSelectedForMetrics(work);
  
  workDetailsContainer.innerHTML = `
    <h2 class="text-xl font-bold text-white mb-3">
      ${highlightSearchTerm(work.name)}
      ${isSearchMatch ? '<span class="ml-2 text-xs bg-blue-500 bg-opacity-20 text-blue-300 py-1 px-2 rounded">Search Match</span>' : ''}
    </h2>
    
    <div class="mb-4">
      <span class="category-badge ${typeBgColors[work.type] || "bg-gray-500 bg-opacity-20 text-gray-300"}">
        ${highlightSearchTerm(work.type)}
      </span>
      <span class="category-badge bg-gray-500 bg-opacity-20 text-gray-300">
        ${quadrant}
      </span>
    </div>
    
    <div class="mb-6">
      <p class="text-gray-300">${description}</p>
    </div>
    
    <div class="glass-card p-5 mt-6">
      <h3 class="font-semibold text-white mb-4">Complex Plane Analysis</h3>
      
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm text-gray-300">Position:</span>
        <span class="font-medium text-white">${work.a.toFixed(2)} + ${work.b.toFixed(2)}i</span>
      </div>
      
      <div class="mb-6 w-full h-px bg-gray-700"></div>
      
      <div class="flex justify-between mb-2">
        <span class="text-sm text-gray-300">Context Normality (a):</span>
        <span class="font-medium text-white">${work.a.toFixed(2)}</span>
      </div>
      
      <div class="progress-bar">
        <div 
          class="progress-fill ${work.a >= 0 ? 'bg-blue-500' : 'bg-purple-500'}"
          style="width: ${Math.min(Math.abs(work.a) / 4 * 50, 50)}%; margin-left: ${work.a < 0 ? '50%' : '0'}; margin-right: ${work.a >= 0 ? '50%' : '0'};"
        ></div>
      </div>
      
      <div class="text-xs text-gray-400 flex justify-between mb-6">
        <span>Unconventional</span>
        <span>Neutral</span>
        <span>Conventional</span>
      </div>
      
      <div class="flex justify-between mb-2">
        <span class="text-sm text-gray-300">Cuil Level (b):</span>
        <span class="font-medium text-white">${work.b.toFixed(2)}</span>
      </div>
      
      <div class="progress-bar">
        <div 
          class="progress-fill ${work.b >= 0 ? 'bg-green-500' : 'bg-red-500'}"
          style="width: ${Math.min(Math.abs(work.b) / 4 * 50, 50)}%; margin-left: ${work.b < 0 ? '50%' : '0'}; margin-right: ${work.b >= 0 ? '50%' : '0'};"
        ></div>
      </div>
      
      <div class="text-xs text-gray-400 flex justify-between">
        <span>${work.b < 0 ? 'Standard Realism' : 'Realistic'}</span>
        <span>Moderate</span>
        <span>${work.b < 0 ? 'Extreme Hyper-Realism' : 'Highly Abstract'}</span>
      </div>
      
      <div class="mt-6 mb-2 w-full h-px bg-gray-700"></div>
      
      <h3 class="font-semibold text-white mb-4">Mathematical Metrics</h3>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <div class="text-sm text-gray-300 mb-1">Magnitude (|z|):</div>
          <div class="font-medium text-white">${metrics.magnitude.toFixed(2)}</div>
        </div>
        <div>
          <div class="text-sm text-gray-300 mb-1">Phase Angle (θ):</div>
          <div class="font-medium text-white">${metrics.phaseDegrees.toFixed(2)}°</div>
        </div>
        <div>
          <div class="text-sm text-gray-300 mb-1">Artistic Intensity:</div>
          <div class="font-medium text-white">${(metrics.intensity * 100).toFixed(1)}%</div>
        </div>
        <div>
          <div class="text-sm text-gray-300 mb-1">Context Dominance:</div>
          <div class="font-medium text-white">${(metrics.dominantRatio * 100).toFixed(1)}%</div>
        </div>
      </div>
    </div>
    
    <div class="mt-6 flex justify-center" id="work-details-buttons">
      <!-- Buttons will be added by initializeMetrics() -->
    </div>
  `;
  
  // Add button to toggle metrics selection
  const addButton = document.createElement('button');
  addButton.id = 'add-to-metrics-button';
  addButton.className = isSelectedForMetrics 
    ? 'px-4 py-2 bg-red-700 bg-opacity-50 hover:bg-opacity-70 rounded-md text-sm text-white transition-colors mr-2'
    : 'px-4 py-2 bg-teal-700 bg-opacity-50 hover:bg-opacity-70 rounded-md text-sm text-white transition-colors mr-2';
  addButton.textContent = isSelectedForMetrics ? 'Remove from Metrics' : 'Add to Metrics';
  addButton.onclick = () => {
    if (selectedWork) {
      const isNowSelected = toggleWorkSelection(selectedWork);
      addButton.textContent = isNowSelected ? 'Remove from Metrics' : 'Add to Metrics';
      addButton.className = isNowSelected 
        ? 'px-4 py-2 bg-red-700 bg-opacity-50 hover:bg-opacity-70 rounded-md text-sm text-white transition-colors mr-2'
        : 'px-4 py-2 bg-teal-700 bg-opacity-50 hover:bg-opacity-70 rounded-md text-sm text-white transition-colors mr-2';
      updateWorkSelections();
    }
  };
  
  // Add button to show metrics visualization
  const showMetricsButton = document.createElement('button');
  showMetricsButton.id = 'show-metrics-button';
  showMetricsButton.className = 'px-4 py-2 bg-blue-700 bg-opacity-50 hover:bg-opacity-70 rounded-md text-sm text-white transition-colors mr-2';
  showMetricsButton.textContent = 'View Metrics';
  showMetricsButton.onclick = () => {
    // If no works are selected for metrics, auto-select the current work
    if (selectedWorksForMetrics.size === 0 && selectedWork) {
      toggleWorkSelection(selectedWork);
      updateWorkSelections();
      addButton.textContent = 'Remove from Metrics';
      addButton.className = 'px-4 py-2 bg-red-700 bg-opacity-50 hover:bg-opacity-70 rounded-md text-sm text-white transition-colors mr-2';
    }
    
    // Call visualizeMetrics with 'magnitude' as default
    visualizeMetrics('magnitude');
  };
  
  // Add reset view button
  const resetButton = document.createElement('button');
  resetButton.id = 'reset-view';
  resetButton.className = 'px-4 py-2 bg-gray-700 bg-opacity-50 hover:bg-opacity-70 rounded-md text-sm text-white transition-colors';
  resetButton.textContent = 'Reset View';
  resetButton.addEventListener('click', () => {
    svg.transition()
      .duration(750)
      .call(zoom.transform, d3.zoomIdentity);
  });
  
  // Add buttons to container
  const buttonsContainer = document.getElementById('work-details-buttons');
  buttonsContainer.appendChild(addButton);
  buttonsContainer.appendChild(showMetricsButton);
  buttonsContainer.appendChild(resetButton);
}

/**
 * Helper function to highlight search terms in text
 * @param {string} text - The text to highlight
 * @returns {string} - The highlighted text
 */
function highlightSearchTerm(text) {
  if (searchTerm && searchTerm.length > 0 && text.toLowerCase().includes(searchTerm.toLowerCase())) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="bg-blue-500 bg-opacity-30 text-white px-1 rounded">$1</span>');
  }
  return text;
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
  
  // Set up search functionality
  searchInput = document.getElementById('search-input');
  clearSearchButton = document.getElementById('clear-search');
  
  // Add event listeners for search
  searchInput.addEventListener('input', handleSearch);
  clearSearchButton.addEventListener('click', clearSearch);
  
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
  
  // Add keyboard shortcuts help button
  const helpButton = document.createElement('button');
  helpButton.className = 'filter-button px-4 py-2 rounded-full text-xs font-medium border transition-colors duration-300 bg-opacity-10 text-gray-300 border-gray-700 hover:bg-opacity-20 ml-4';
  helpButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" class="inline-block mr-1"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg> Keyboard Shortcuts';
  helpButton.onclick = () => {
    // Create modal for keyboard shortcuts
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'glass-card p-6 max-w-md';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'flex justify-between items-center mb-4';
    
    const modalTitle = document.createElement('h3');
    modalTitle.className = 'text-xl font-bold text-white';
    modalTitle.textContent = 'Keyboard Shortcuts';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'text-gray-400 hover:text-white transition-colors';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => modal.remove();
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    
    const shortcuts = [
      { key: 'Escape', description: 'Close panels and clear selection' },
      { key: 'R', description: 'Reset view to default zoom' },
      { key: 'M', description: 'Toggle metrics visualization' },
      { key: 'Ctrl/⌘ + C', description: 'Clear all metrics selections' }
    ];
    
    const shortcutsList = document.createElement('div');
    shortcutsList.className = 'space-y-3';
    
    shortcuts.forEach(shortcut => {
      const item = document.createElement('div');
      item.className = 'flex justify-between';
      
      const keySpan = document.createElement('span');
      keySpan.className = 'bg-gray-800 px-3 py-1 rounded text-white font-mono text-sm';
      keySpan.textContent = shortcut.key;
      
      const descSpan = document.createElement('span');
      descSpan.className = 'text-gray-300 ml-4 flex-grow text-sm';
      descSpan.textContent = shortcut.description;
      
      item.appendChild(keySpan);
      item.appendChild(descSpan);
      shortcutsList.appendChild(item);
    });
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(shortcutsList);
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close on click outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  };
  
  categoryFiltersContainer.appendChild(helpButton);
  
  // Initialize metrics functionality
  initializeMetrics();
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

/**
 * Handle search input changes
 */
function handleSearch() {
  searchTerm = searchInput.value.trim().toLowerCase();
  
  // Show/hide clear button based on whether there's search text
  if (searchTerm.length > 0) {
    clearSearchButton.style.display = 'block';
    searchInput.classList.add('border-blue-500');
    
    // Check if we need to show "no results" message
    const matchingWorks = works.filter(work => 
      work.name.toLowerCase().includes(searchTerm) || 
      work.type.toLowerCase().includes(searchTerm) ||
      (descriptions[work.name] && descriptions[work.name].toLowerCase().includes(searchTerm))
    );
    
    // Show a feedback message next to the search input
    const searchContainer = searchInput.parentElement;
    let feedbackEl = document.getElementById('search-feedback');
    
    if (!feedbackEl) {
      feedbackEl = document.createElement('div');
      feedbackEl.id = 'search-feedback';
      feedbackEl.className = 'text-sm mt-2';
      searchContainer.parentElement.appendChild(feedbackEl);
    }
    
    if (matchingWorks.length === 0) {
      feedbackEl.textContent = 'No works match your search.';
      feedbackEl.className = 'text-sm mt-2 text-red-400';
    } else {
      feedbackEl.textContent = `Found ${matchingWorks.length} matching works.`;
      feedbackEl.className = 'text-sm mt-2 text-green-400';
    }
  } else {
    clearSearchButton.style.display = 'none';
    searchInput.classList.remove('border-blue-500');
    
    // Remove feedback message if it exists
    const feedbackEl = document.getElementById('search-feedback');
    if (feedbackEl) {
      feedbackEl.remove();
    }
  }
  
  // Update visualization with search filter
  updateVisualization(true);
}

/**
 * Clear the search input
 */
function clearSearch() {
  searchInput.value = '';
  searchTerm = '';
  clearSearchButton.style.display = 'none';
  searchInput.classList.remove('border-blue-500');
  
  // Remove feedback message if it exists
  const feedbackEl = document.getElementById('search-feedback');
  if (feedbackEl) {
    feedbackEl.remove();
  }
  
  updateVisualization(true);
} 