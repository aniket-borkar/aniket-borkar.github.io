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
  
  // Add event listener for window resize to handle responsiveness
  window.addEventListener('resize', () => {
    // Debounce resize handler to avoid unnecessary redraws
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
      initializeVisualization();
      updateVisualization(false);
    }, 250);
  });
  
  // Set up keyboard shortcuts
  document.addEventListener('keydown', (event) => {
    // Escape key to close panels
    if (event.key === 'Escape') {
      const selectionPanel = document.getElementById('work-selection-panel');
      if (selectionPanel) {
        selectionPanel.remove();
      }
      
      // Clear selection
      if (selectedWork) {
        selectedWork = null;
        svg.selectAll('.work-point')
          .attr('stroke', 'none')
          .attr('stroke-width', 0);
      }
    }
    
    // R key to reset view
    if (event.key === 'r' || event.key === 'R') {
      svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
    }
  });
}); 