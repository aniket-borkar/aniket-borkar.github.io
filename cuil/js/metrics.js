/**
 * Metrics calculation for the Cuil Visualization
 * This file contains functions for calculating and visualizing various metrics
 * based on complex number properties of the works.
 */

// Set to store selected works for metrics analysis
let selectedWorksForMetrics = new Set();
let metricsChart = null;

/**
 * Calculate the magnitude (modulus) of a complex number
 * |z| = sqrt(a² + b²)
 * @param {Object} work - The work object with a and b properties
 * @returns {number} - The magnitude
 */
function calculateMagnitude(work) {
  return Math.sqrt(work.a * work.a + work.b * work.b);
}

/**
 * Calculate the phase angle (argument) of a complex number
 * θ = atan2(b, a)
 * @param {Object} work - The work object with a and b properties
 * @returns {number} - The phase angle in radians
 */
function calculatePhase(work) {
  return Math.atan2(work.b, work.a);
}

/**
 * Calculate the phase angle in degrees
 * @param {Object} work - The work object with a and b properties
 * @returns {number} - The phase angle in degrees
 */
function calculatePhaseDegrees(work) {
  return (calculatePhase(work) * 180 / Math.PI);
}

/**
 * Calculate various metrics for a work
 * @param {Object} work - The work object
 * @returns {Object} - Object containing various metrics
 */
function calculateMetrics(work) {
  const magnitude = calculateMagnitude(work);
  const phase = calculatePhase(work);
  const phaseDegrees = calculatePhaseDegrees(work);
  
  // Determine quadrant (1-4)
  let quadrant = 1;
  if (work.a < 0 && work.b >= 0) quadrant = 2;
  else if (work.a < 0 && work.b < 0) quadrant = 3;
  else if (work.a >= 0 && work.b < 0) quadrant = 4;
  
  // Calculate "artistic intensity" (scaled magnitude)
  const intensity = magnitude / 5; // Normalized to a 0-1 scale (assuming max magnitude ~5)
  
  // Calculate dominant aspect ratio (how much more a influences than b or vice versa)
  const dominantRatio = Math.abs(work.a) / (Math.abs(work.a) + Math.abs(work.b));
  
  return {
    magnitude,
    phase,
    phaseDegrees,
    quadrant,
    intensity,
    dominantRatio
  };
}

/**
 * Toggle a work's selection for metrics analysis
 * @param {Object} work - The work to toggle
 * @returns {boolean} - Whether the work is now selected
 */
function toggleWorkSelection(work) {
  const workId = `${work.name}-${work.type}`;
  
  if (selectedWorksForMetrics.has(workId)) {
    selectedWorksForMetrics.delete(workId);
    return false;
  } else {
    selectedWorksForMetrics.add(workId);
    return true;
  }
}

/**
 * Check if a work is selected for metrics analysis
 * @param {Object} work - The work to check
 * @returns {boolean} - Whether the work is selected
 */
function isWorkSelectedForMetrics(work) {
  const workId = `${work.name}-${work.type}`;
  return selectedWorksForMetrics.has(workId);
}

/**
 * Clear all selected works
 */
function clearSelectedWorks() {
  selectedWorksForMetrics.clear();
  updateWorkSelections();
}

/**
 * Update the visual indication of selected works in the main visualization
 */
function updateWorkSelections() {
  svg.selectAll('.work-point')
    .classed('selected-for-metrics', function(d) {
      return d[1].some(work => isWorkSelectedForMetrics(work));
    })
    .attr('stroke', function(d) {
      if (d[1].some(work => isWorkSelectedForMetrics(work))) {
        return '#00ebc7'; // Teal color for metrics selection
      } else if (selectedWork && d[1].some(w => w.name === selectedWork.name)) {
        return '#ffffff'; // White for the currently selected work
      } else {
        return 'none';
      }
    })
    .attr('stroke-width', function(d) {
      if (d[1].some(work => isWorkSelectedForMetrics(work))) {
        return 3;
      } else if (selectedWork && d[1].some(w => w.name === selectedWork.name)) {
        return 3;
      } else {
        return 0;
      }
    });
}

/**
 * Get all the selected works as an array
 * @returns {Array} - Array of selected work objects
 */
function getSelectedWorksArray() {
  return works.filter(work => isWorkSelectedForMetrics(work));
}

/**
 * Generate metrics for the selected works
 * @returns {Array} - Array of work objects with their metrics
 */
function generateMetricsForSelectedWorks() {
  const selectedWorks = getSelectedWorksArray();
  
  return selectedWorks.map(work => {
    const metrics = calculateMetrics(work);
    return {
      ...work,
      metrics
    };
  });
}

/**
 * Create or update the metrics visualization
 * @param {string} metricType - The type of metric to visualize
 */
function visualizeMetrics(metricType = 'magnitude') {
  console.log('visualizeMetrics called with metric type:', metricType);
  
  // Get metrics data
  const worksWithMetrics = generateMetricsForSelectedWorks();
  console.log('Selected works for metrics:', worksWithMetrics.length);
  
  // First check if we have works selected
  if (worksWithMetrics.length === 0) {
    console.log('No works selected, showing message');
    showMessage('Please select at least one work first');
    return;
  }
  
  // Find or create the metrics container above the main chart
  let metricsContainer = document.getElementById('metrics-charts-container');
  if (!metricsContainer) {
    console.log('Creating metrics container above the chart');
    
    // Get the complex plane container to position the metrics above it
    const complexPlane = document.querySelector('.complex-plane');
    if (!complexPlane) {
      console.error('Complex plane container not found');
      return;
    }
    
    // Create container for metrics charts
    metricsContainer = document.createElement('div');
    metricsContainer.id = 'metrics-charts-container';
    metricsContainer.className = 'glass-card p-6 mb-6 fade-in metrics-panel';
    metricsContainer.style.display = 'none'; // Start hidden until we create the charts
    
    // Add header with title and controls
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4';
    
    const title = document.createElement('h3');
    title.className = 'text-xl font-bold text-white';
    title.textContent = 'Mathematical Metrics';
    
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'flex items-center space-x-4';
    
    // Create metric selector
    const selectLabel = document.createElement('label');
    selectLabel.className = 'text-sm text-gray-300';
    selectLabel.htmlFor = 'metric-select';
    selectLabel.textContent = 'Metric:';
    
    const select = document.createElement('select');
    select.id = 'metric-select';
    select.className = 'bg-gray-800 bg-opacity-50 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';
    
    const options = [
      { value: 'magnitude', text: 'Magnitude (|z|)' },
      { value: 'phase', text: 'Phase Angle (θ)' },
      { value: 'intensity', text: 'Artistic Intensity' },
      { value: 'dominance', text: 'Context vs. Abstraction Dominance' }
    ];
    
    options.forEach(option => {
      const optionEl = document.createElement('option');
      optionEl.value = option.value;
      optionEl.textContent = option.text;
      select.appendChild(optionEl);
    });
    
    select.value = metricType;
    select.onchange = (e) => {
      visualizeMetrics(e.target.value);
    };
    
    // Close button
    const closeButton = document.createElement('button');
    closeButton.className = 'text-gray-400 hover:text-white transition-colors ml-4';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => {
      metricsContainer.style.display = 'none';
    };
    
    // Add clear selection button
    const clearButton = document.createElement('button');
    clearButton.className = 'px-3 py-2 bg-red-700 bg-opacity-50 hover:bg-opacity-70 rounded-md text-xs text-white transition-colors ml-4';
    clearButton.textContent = 'Clear Selections';
    clearButton.onclick = () => {
      clearSelectedWorks();
      metricsContainer.style.display = 'none';
    };
    
    // Add elements to the header
    controlsDiv.appendChild(selectLabel);
    controlsDiv.appendChild(select);
    controlsDiv.appendChild(clearButton);
    controlsDiv.appendChild(closeButton);
    
    header.appendChild(title);
    header.appendChild(controlsDiv);
    metricsContainer.appendChild(header);
    
    // Add container for the chart
    const chartContainer = document.createElement('div');
    chartContainer.id = 'metrics-chart-container';
    chartContainer.className = 'w-full';
    chartContainer.style.height = '300px';
    metricsContainer.appendChild(chartContainer);
    
    // Insert the metrics container before the complex plane
    complexPlane.parentNode.insertBefore(metricsContainer, complexPlane);
  } else {
    // Update existing select value
    const select = document.getElementById('metric-select');
    if (select) {
      select.value = metricType;
    }
  }
  
  // Ensure the container is visible
  metricsContainer.style.display = 'block';
  console.log('Metrics container visibility:', metricsContainer.style.display);
  
  // Get container for the chart
  const chartContainer = document.getElementById('metrics-chart-container');
  if (!chartContainer) {
    console.error('Chart container not found');
    return;
  }
  
  // If we already have a chart, destroy it
  if (metricsChart) {
    console.log('Destroying existing chart');
    metricsChart.destroy();
  }
  
  console.log('Creating new chart with data for metric:', metricType);
  
  // Prepare data based on selected metric type
  let chartData, chartTitle, yAxisLabel;
  
  switch (metricType) {
    case 'magnitude':
      chartData = worksWithMetrics.map(w => ({ 
        name: w.name, 
        value: w.metrics.magnitude, 
        type: w.type 
      }));
      chartTitle = 'Magnitude (|z|) of Selected Works';
      yAxisLabel = 'Magnitude';
      break;
    case 'phase':
      chartData = worksWithMetrics.map(w => ({ 
        name: w.name, 
        value: w.metrics.phaseDegrees, 
        type: w.type 
      }));
      chartTitle = 'Phase Angle (θ) of Selected Works';
      yAxisLabel = 'Angle (degrees)';
      break;
    case 'intensity':
      chartData = worksWithMetrics.map(w => ({ 
        name: w.name, 
        value: w.metrics.intensity * 100, // Convert to percentage
        type: w.type 
      }));
      chartTitle = 'Artistic Intensity of Selected Works';
      yAxisLabel = 'Intensity (%)';
      break;
    case 'dominance':
      chartData = worksWithMetrics.map(w => ({ 
        name: w.name, 
        value: w.metrics.dominantRatio * 100, // Convert to percentage
        type: w.type 
      }));
      chartTitle = 'Context vs. Abstraction Dominance';
      yAxisLabel = 'Context Dominance (%)';
      break;
  }
  
  // Sort data by value for better visualization
  chartData.sort((a, b) => b.value - a.value);
  
  // Create chart using D3
  createMetricsChart(chartContainer, chartData, chartTitle, yAxisLabel);
}

/**
 * Create a D3 chart for metrics visualization
 * @param {HTMLElement} container - The container element
 * @param {Array} data - The data to visualize
 * @param {string} title - Chart title
 * @param {string} yAxisLabel - Y-axis label
 */
function createMetricsChart(container, data, title, yAxisLabel) {
  console.log('Creating metrics chart with', data.length, 'items');
  
  // Clear previous chart
  container.innerHTML = '';
  
  // Set up dimensions
  const margin = { top: 30, right: 20, bottom: 60, left: 60 };
  const width = container.clientWidth - margin.left - margin.right;
  const height = container.clientHeight - margin.top - margin.bottom;
  
  // Create SVG
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  
  // Store reference to destroy later
  metricsChart = {
    svg: svg,
    destroy: function() {
      const parent = container.querySelector('svg');
      if (parent) {
        parent.remove();
      }
    }
  };
  
  // Add title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', -10)
    .attr('text-anchor', 'middle')
    .attr('fill', '#fffffe')
    .style('font-size', '14px')
    .style('font-weight', 'bold')
    .text(title);
  
  // Create tooltip
  const tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);
  
  // Create scales
  const x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width])
    .padding(0.2);
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value) * 1.1]) // Add 10% padding
    .range([height, 0]);
  
  // Add X axis
  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'translate(-10,0)rotate(-45)')
    .style('text-anchor', 'end')
    .style('font-size', '9px')
    .style('fill', '#fffffe');
  
  // Add Y axis
  svg.append('g')
    .call(d3.axisLeft(y))
    .selectAll('text')
    .style('fill', '#fffffe')
    .style('font-size', '9px');
  
  // Add Y axis label
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -40)
    .attr('x', -height / 2)
    .attr('text-anchor', 'middle')
    .attr('fill', '#fffffe')
    .style('font-size', '12px')
    .text(yAxisLabel);
  
  // Add bars
  const bars = svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.name))
    .attr('width', x.bandwidth())
    .attr('y', height) // Start from bottom for animation
    .attr('height', 0) // Start with height 0 for animation
    .attr('fill', d => typeColors[d.type] || '#718096')
    .attr('opacity', 0.8)
    .on('mouseover', function(event, d) {
      d3.select(this).attr('opacity', 1);
      
      // Show tooltip
      tooltip.transition()
        .duration(200)
        .style('opacity', 1);
      
      tooltip.html(`
        <div class="font-semibold">${d.name}</div>
        <div class="mt-1">${d.type}</div>
        <div class="mt-2">${yAxisLabel}: ${d.value.toFixed(2)}</div>
      `)
        .style('left', `${event.pageX}px`)
        .style('top', `${event.pageY - 28}px`);
    })
    .on('mouseout', function() {
      d3.select(this).attr('opacity', 0.8);
      
      // Hide tooltip
      tooltip.transition()
        .duration(500)
        .style('opacity', 0);
    });
  
  // Add animation to bars
  bars.transition()
    .duration(800)
    .delay((d, i) => i * 50)
    .attr('y', d => y(d.value))
    .attr('height', d => height - y(d.value));
  
  // Add value labels on top of bars
  svg.selectAll('.value-label')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'value-label')
    .attr('x', d => x(d.name) + x.bandwidth() / 2)
    .attr('y', d => y(d.value) - 5)
    .attr('text-anchor', 'middle')
    .attr('fill', '#fffffe')
    .style('font-size', '9px')
    .style('opacity', 0) // Start invisible for animation
    .text(d => d.value.toFixed(1))
    .transition()
    .duration(800)
    .delay((d, i) => i * 50 + 400)
    .style('opacity', 1); // Fade in
    
  // Add quadrant indicators if applicable
  if (metricType === 'phase') {
    // Add quadrant indicators
    const quadrants = [
      { name: 'Quadrant I', start: 0, end: 90, color: 'rgba(105, 255, 205, 0.3)' },
      { name: 'Quadrant II', start: 90, end: 180, color: 'rgba(147, 112, 219, 0.3)' },
      { name: 'Quadrant III', start: -180, end: -90, color: 'rgba(220, 20, 60, 0.3)' },
      { name: 'Quadrant IV', start: -90, end: 0, color: 'rgba(255, 165, 0, 0.3)' }
    ];
    
    // Add colored backgrounds for quadrants
    quadrants.forEach(q => {
      const startY = y(q.start);
      const endY = y(q.end);
      const height = Math.abs(startY - endY);
      
      if (q.start >= 0 && q.end <= 180 || q.start >= -180 && q.end <= 0) {
        svg.append('rect')
          .attr('x', 0)
          .attr('y', Math.min(startY, endY))
          .attr('width', width)
          .attr('height', height)
          .attr('fill', q.color)
          .attr('opacity', 0.3);
          
        svg.append('text')
          .attr('x', 5)
          .attr('y', Math.min(startY, endY) + 15)
          .attr('fill', '#fffffe')
          .style('font-size', '9px')
          .style('opacity', 0.7)
          .text(q.name);
      }
    });
  }
}

/**
 * Create the metrics panel in the DOM
 */
function createMetricsPanel() {
  // Create panel container
  const panel = document.createElement('div');
  panel.id = 'metrics-visualization';
  panel.className = 'glass-card p-6 mt-6 fade-in metrics-panel';
  
  // Add header with title and close button
  const header = document.createElement('div');
  header.className = 'flex justify-between items-center mb-4';
  
  const title = document.createElement('h3');
  title.className = 'text-xl font-bold text-white';
  title.textContent = 'Mathematical Metrics';
  
  const closeButton = document.createElement('button');
  closeButton.className = 'text-gray-400 hover:text-white transition-colors';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = () => {
    panel.style.display = 'none';
  };
  
  header.appendChild(title);
  header.appendChild(closeButton);
  panel.appendChild(header);
  
  // Add metric selection dropdown
  const controls = document.createElement('div');
  controls.className = 'flex items-center mb-6 space-x-4';
  
  const label = document.createElement('label');
  label.className = 'text-sm text-gray-300';
  label.htmlFor = 'metric-select';
  label.textContent = 'Select Metric:';
  
  const select = document.createElement('select');
  select.id = 'metric-select';
  select.className = 'bg-gray-800 bg-opacity-50 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';
  
  const options = [
    { value: 'magnitude', text: 'Magnitude (|z|)' },
    { value: 'phase', text: 'Phase Angle (θ)' },
    { value: 'intensity', text: 'Artistic Intensity' },
    { value: 'dominance', text: 'Context vs. Abstraction Dominance' }
  ];
  
  options.forEach(option => {
    const optionEl = document.createElement('option');
    optionEl.value = option.value;
    optionEl.textContent = option.text;
    select.appendChild(optionEl);
  });
  
  select.onchange = (e) => {
    visualizeMetrics(e.target.value);
  };
  
  controls.appendChild(label);
  controls.appendChild(select);
  panel.appendChild(controls);
  
  // Add explanation
  const explanation = document.createElement('div');
  explanation.className = 'text-sm text-gray-300 mb-6';
  explanation.innerHTML = `
    <p class="mb-2"><strong>Magnitude (|z|):</strong> The distance from the origin, representing the overall intensity of the work (√(a² + b²)).</p>
    <p class="mb-2"><strong>Phase Angle (θ):</strong> The angle relative to the positive real axis, indicating the balance between context normality and cuil level (atan2(b, a)).</p>
    <p class="mb-2"><strong>Artistic Intensity:</strong> Normalized magnitude as a percentage, representing the work's overall artistic impact.</p>
    <p><strong>Context vs. Abstraction Dominance:</strong> Shows whether the work is more defined by its context normality (a) or cuil level (b).</p>
  `;
  panel.appendChild(explanation);
  
  // Add container for the chart
  const chartContainer = document.createElement('div');
  chartContainer.id = 'metrics-chart-container';
  chartContainer.className = 'w-full h-96';
  panel.appendChild(chartContainer);
  
  // Add button to clear selection
  const clearButton = document.createElement('button');
  clearButton.className = 'mt-6 px-4 py-2 bg-gray-700 bg-opacity-50 hover:bg-opacity-70 rounded-md text-sm text-white transition-colors';
  clearButton.textContent = 'Clear Selection';
  clearButton.onclick = () => {
    clearSelectedWorks();
    panel.style.display = 'none';
  };
  panel.appendChild(clearButton);
  
  // Add the panel to the page
  document.querySelector('main .container').appendChild(panel);
}

/**
 * Show a temporary message to the user
 * @param {string} message - The message to show
 */
function showMessage(message) {
  let msgElement = document.getElementById('temp-message');
  
  if (!msgElement) {
    msgElement = document.createElement('div');
    msgElement.id = 'temp-message';
    msgElement.className = 'fixed bottom-6 right-6 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg z-50 fade-in';
    document.body.appendChild(msgElement);
  }
  
  msgElement.textContent = message;
  msgElement.style.display = 'block';
  msgElement.style.opacity = '1';
  
  setTimeout(() => {
    msgElement.style.opacity = '0';
    setTimeout(() => {
      msgElement.style.display = 'none';
    }, 500);
  }, 3000);
}

/**
 * Initialize the metrics functionality
 */
function initializeMetrics() {
  // Add button to work details panel to add/remove from metrics selection
  const addButton = document.createElement('button');
  addButton.id = 'add-to-metrics-button';
  addButton.className = 'px-4 py-2 bg-teal-700 bg-opacity-50 hover:bg-opacity-70 rounded-md text-sm text-white transition-colors mr-2';
  addButton.textContent = 'Add to Metrics';
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
  
  const resetButton = document.getElementById('reset-view');
  if (resetButton) {
    resetButton.parentNode.insertBefore(addButton, resetButton);
  }
  
  // Add button to show metrics visualization
  const showMetricsButton = document.createElement('button');
  showMetricsButton.id = 'show-metrics-button';
  showMetricsButton.className = 'px-4 py-2 bg-blue-700 bg-opacity-50 hover:bg-opacity-70 rounded-md text-sm text-white transition-colors';
  showMetricsButton.textContent = 'View Metrics';
  showMetricsButton.onclick = () => {
    visualizeMetrics('magnitude');
  };
  
  if (resetButton) {
    resetButton.parentNode.insertBefore(showMetricsButton, resetButton);
  }
} 