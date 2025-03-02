/**
 * Main entry point for the Cuil Visualization
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the visualization
  initializeVisualization();
  
  // Initialize the UI components
  initializeUI();
  
  // Update the visualization with the initial data
  updateVisualization(false);
  
  // Add the particle effect to the background
  createParticles();
  
  // Set current year in footer
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.setAttribute('data-year', new Date().getFullYear());
  }
  
  // Add window resize event listener with debounce
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateVisualization(false);
      
      // Refresh metrics chart if visible
      const metricsContainer = document.getElementById('metrics-charts-container');
      if (metricsContainer && metricsContainer.style.display === 'block') {
        // Get current selected metric
        const select = document.getElementById('metric-select');
        const currentMetric = select ? select.value : 'magnitude';
        
        // Refresh the metrics visualization
        visualizeMetrics(currentMetric);
      }
    }, 250);
  });
  
  // Set up keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Close panels with escape
    if (e.key === 'Escape') {
      const selectionPanel = document.getElementById('work-selection-panel');
      if (selectionPanel) selectionPanel.remove();
      
      // Hide metrics visualization if visible
      const metricsContainer = document.getElementById('metrics-charts-container');
      if (metricsContainer && metricsContainer.style.display === 'block') {
        metricsContainer.style.display = 'none';
      }
      
      // Clear selected work highlight
      if (selectedWork) {
        selectedWork = null;
        updateWorkSelections();
      }
    }
    
    // Reset view with R key
    if (e.key === 'r' || e.key === 'R') {
      svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
    }
    
    // Toggle metrics with M key
    if (e.key === 'm' || e.key === 'M') {
      const metricsContainer = document.getElementById('metrics-charts-container');
      
      // If metrics container exists and is visible, hide it
      if (metricsContainer && metricsContainer.style.display === 'block') {
        metricsContainer.style.display = 'none';
      } 
      // Otherwise, show metrics if we have works selected
      else if (selectedWorksForMetrics.size > 0) {
        visualizeMetrics('magnitude');
      } else {
        showMessage('Please select at least one work first');
      }
    }
    
    // Clear all metrics selections with Ctrl+C or Cmd+C
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
      e.preventDefault(); // Prevent browser's copy function
      clearSelectedWorks();
      
      // Hide metrics panel if visible
      const metricsContainer = document.getElementById('metrics-charts-container');
      if (metricsContainer) {
        metricsContainer.style.display = 'none';
      }
      
      showMessage('Cleared all work selections');
    }
  });
  
  // Add a help button to show keyboard shortcuts
  const helpButton = document.createElement('button');
  helpButton.className = 'fixed bottom-6 left-6 bg-gray-800 bg-opacity-70 text-white p-3 rounded-full shadow-lg z-50';
  helpButton.innerHTML = '?';
  helpButton.onclick = () => {
    const helpPanel = document.createElement('div');
    helpPanel.className = 'glass-card fixed p-6 rounded-lg shadow-lg z-50 max-w-md fade-in';
    helpPanel.style.left = '50%';
    helpPanel.style.top = '50%';
    helpPanel.style.transform = 'translate(-50%, -50%)';
    
    helpPanel.innerHTML = `
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold text-white">Keyboard Shortcuts</h3>
        <button class="text-gray-400 hover:text-white transition-colors">&times;</button>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between">
          <span class="text-gray-300">Escape</span>
          <span class="text-white">Close panels, clear selection</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-300">R</span>
          <span class="text-white">Reset view</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-300">M</span>
          <span class="text-white">Toggle metrics panel</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-300">Ctrl+C</span>
          <span class="text-white">Clear all metrics selections</span>
        </div>
      </div>
    `;
    
    helpPanel.querySelector('button').onclick = () => helpPanel.remove();
    document.body.appendChild(helpPanel);
  };
  
  document.body.appendChild(helpButton);
}); 