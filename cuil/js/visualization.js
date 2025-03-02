/**
 * Core D3.js visualization logic for the Cuil Visualization
 */

// Global variables
let svg, xScale, yScale, zoom;
let g; // Main group for visualization

/**
 * Initialize the visualization
 */
function initializeVisualization() {
  // Get the SVG element
  svg = d3.select('#visualization');
  
  // Set up dimensions
  const svgElement = document.getElementById('visualization');
  const width = svgElement.clientWidth;
  const height = svgElement.clientHeight;
  const margin = { top: 120, right: 60, bottom: 60, left: 60 }; // Further increased top margin for more space
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  // Find min/max values for scales - now considering all four quadrants
  const aExtent = d3.extent(works, d => d.a);
  const bExtent = d3.extent(works, d => d.b);
  
  // Add a bit of padding to the extents
  const aRange = [Math.min(aExtent[0], -3.5) - 0.5, Math.max(aExtent[1], 3.5) + 0.5];
  const bRange = [Math.min(bExtent[0], -3.5) - 0.5, Math.max(bExtent[1], 3.5) + 0.5];
  
  // Create scales
  xScale = d3.scaleLinear()
    .domain(aRange)
    .range([0, innerWidth]);
    
  yScale = d3.scaleLinear()
    .domain(bRange)
    .range([innerHeight, 0]);
  
  // Create main group for all elements
  g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  // Add background grid
  g.append('rect')
    .attr('width', innerWidth)
    .attr('height', innerHeight)
    .attr('fill', 'none')
    .attr('stroke', 'rgba(255, 255, 255, 0.05)')
    .attr('stroke-width', 1);
  
  // Add axes
  const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(10);
    
  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);
  
  const gx = g.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(xAxis);
    
  const gy = g.append('g')
    .attr('class', 'y-axis')
    .call(yAxis);
  
  // Style the grid lines
  svg.selectAll('.tick line')
    .attr('stroke', 'rgba(255, 255, 255, 0.05)');
  
  // Add axis labels
  g.append('text')
    .attr('class', 'axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', innerHeight + 40)
    .attr('text-anchor', 'middle')
    .text('Context Normality (a)');
  
  g.append('text')
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -innerHeight / 2)
    .attr('y', -40)
    .attr('text-anchor', 'middle')
    .text('Cuil Level (b)');
  
  // Add title at the very top, centered
  g.append('text')
    .attr('class', 'font-bold text-lg')
    .attr('x', innerWidth / 2)
    .attr('y', -90) // Moved up more to account for increased margin
    .attr('text-anchor', 'middle')
    .attr('fill', '#ffffff')
    .text('Works of Art in the Complex Plane');
  
  // Add quadrant labels
  const quadrantLabels = [
    { text: "Q1: Conventional, Positive Abstraction", x: innerWidth * 0.75, y: innerHeight * 0.25 },
    { text: "Q2: Unconventional, Positive Abstraction", x: innerWidth * 0.25, y: innerHeight * 0.25 },
    { text: "Q3: Unconventional, Negative Abstraction", x: innerWidth * 0.25, y: innerHeight * 0.75 },
    { text: "Q4: Conventional, Negative Abstraction", x: innerWidth * 0.75, y: innerHeight * 0.75 }
  ];
  
  quadrantLabels.forEach(label => {
    g.append('text')
      .attr('class', 'quadrant-label')
      .attr('x', label.x)
      .attr('y', label.y)
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgba(255, 255, 255, 0.3)')
      .attr('font-size', '10px')
      .text(label.text);
  });
  
  // Add legend with plenty of space above and below
  const legendData = Object.entries(typeColors);
  const legendItemWidth = 90; // Width of each legend item
  const totalLegendWidth = legendData.length * legendItemWidth; // Calculate total legend width
  
  const legendGroup = g.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${innerWidth/2 - totalLegendWidth/2}, -60)`); // Properly center the legend
  
  // Organize legend in a single row for cleaner look
  legendData.forEach((item, i) => {
    const [type, color] = item;
    
    const g = legendGroup.append('g')
      .attr('transform', `translate(${i * 90}, 0)`);
      
    g.append('rect')
      .attr('width', 12)
      .attr('height', 12)
      .attr('rx', 6)
      .attr('fill', color)
      .attr('filter', 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))');
      
    g.append('text')
      .attr('x', 18)
      .attr('y', 10)
      .attr('font-size', '10px')
      .attr('fill', 'rgba(255, 255, 255, 0.8)')
      .text(type);
  });

  // Add instructions with increased spacing after the legend
  g.append('text')
    .attr('x', 0)
    .attr('y', -20) // Closer to the chart to create more space between legend and instructions
    .attr('font-size', '12px')
    .attr('fill', 'rgba(255, 255, 255, 0.6)')
    .text('Scroll to zoom, drag to pan, click on points to view details');
  
  // Add origin lines
  g.append('line')
    .attr('x1', xScale(0))
    .attr('y1', 0)
    .attr('x2', xScale(0))
    .attr('y2', innerHeight)
    .attr('stroke', 'rgba(255, 255, 255, 0.2)')
    .attr('stroke-width', 1)
    .attr('stroke-dasharray', '4,4');
    
  g.append('line')
    .attr('x1', 0)
    .attr('y1', yScale(0))
    .attr('x2', innerWidth)
    .attr('y2', yScale(0))
    .attr('stroke', 'rgba(255, 255, 255, 0.2)')
    .attr('stroke-width', 1)
    .attr('stroke-dasharray', '4,4');
  
  // Create a clip path to ensure elements don't render outside the plot area
  svg.append('defs').append('clipPath')
    .attr('id', 'clip')
    .append('rect')
    .attr('width', innerWidth)
    .attr('height', innerHeight);
  
  // Create a group for the data points that will be clipped
  g.append('g')
    .attr('class', 'points')
    .attr('clip-path', 'url(#clip)');
  
  // Add zoom behavior
  zoom = d3.zoom()
    .scaleExtent([0.5, 5])
    .on('zoom', (event) => {
      // Update the scales based on the zoom transform
      const newXScale = event.transform.rescaleX(xScale);
      const newYScale = event.transform.rescaleY(yScale);
      
      // Update axes with new scales
      gx.call(xAxis.scale(newXScale));
      gy.call(yAxis.scale(newYScale));
      
      // Update the points and lines
      g.selectAll('.work-point')
        .attr('cx', d => newXScale(d[1][0].a))
        .attr('cy', d => newYScale(d[1][0].b));
      
      // Update the lines if they exist
      g.selectAll('.type-line').each(function(d) {
        const line = d3.line()
          .x(d => newXScale(d.a))
          .y(d => newYScale(d.b))
          .curve(d3.curveCatmullRom.alpha(0.5));
        
        d3.select(this).attr('d', line);
      });
      
      // Update origin lines
      g.select('line[x1="' + xScale(0) + '"]')
        .attr('x1', newXScale(0))
        .attr('x2', newXScale(0));
      
      g.select('line[y1="' + yScale(0) + '"]')
        .attr('y1', newYScale(0))
        .attr('y2', newYScale(0));
        
      // Update quadrant labels
      g.selectAll('.quadrant-label').each(function(d, i) {
        const label = quadrantLabels[i];
        d3.select(this)
          .attr('x', label.x * event.transform.k + event.transform.x)
          .attr('y', label.y * event.transform.k + event.transform.y);
      });
    });
    
  svg.call(zoom);
}

/**
 * Update the visualization with filtered data
 * @param {boolean} animate - Whether to animate the points
 */
function updateVisualization(animate = false) {
  // Clear previous points and lines
  g.selectAll('.work-point, .type-line').remove();
  
  // Filter works based on selected categories
  const filteredWorks = selectedCategories.size > 0
    ? works.filter(work => selectedCategories.has(work.type))
    : works;
    
  // Update clear button visibility
  const clearButton = categoryFiltersContainer.querySelector('button:last-child');
  clearButton.style.display = selectedCategories.size > 0 ? 'block' : 'none';
  
  // Group works by position (a,b coordinates)
  const worksByPosition = d3.group(filteredWorks, d => `${d.a},${d.b}`);
  
  // Plot data points
  const points = g.select('.points').selectAll('.work-point')
    .data(Array.from(worksByPosition.entries()))
    .enter()
    .append('circle')
    .attr('class', d => {
      // Determine which quadrant the point is in
      const a = d[1][0].a;
      const b = d[1][0].b;
      let quadrantClass = '';
      
      if (a >= 0 && b >= 0) quadrantClass = 'quadrant-1-point';
      else if (a < 0 && b >= 0) quadrantClass = 'quadrant-2-point';
      else if (a < 0 && b < 0) quadrantClass = 'quadrant-3-point';
      else quadrantClass = 'quadrant-4-point';
      
      return `work-point ${quadrantClass}`;
    })
    .attr('cx', d => xScale(d[1][0].a))
    .attr('cy', d => yScale(d[1][0].b))
    .attr('r', 0) // Start with radius 0 for animation
    .attr('fill', d => {
      // If multiple types at this position, use a gradient or special color
      const types = [...new Set(d[1].map(w => w.type))];
      if (types.length === 1) {
        return typeColors[types[0]] || '#718096';
      } else {
        // For multiple types, use a special color or make the point larger
        return '#ffffff';
      }
    })
    .attr('stroke', d => {
      const types = [...new Set(d[1].map(w => w.type))];
      if (types.length > 1) {
        return 'rgba(255, 255, 255, 0.8)';
      } else {
        return 'none';
      }
    })
    .attr('stroke-width', d => {
      return d[1].length > 1 ? 2 : 0;
    })
    .style('opacity', 0) // Start with opacity 0 for animation
    .on('mouseover', function(event, d) {
      // Highlight the point
      d3.select(this)
        .transition()
        .duration(300)
        .attr('r', 12);
        
      // Show tooltip with basic info
      const works = d[1];
      const firstWork = works[0];
      
      tooltip.style.opacity = 1;
      tooltip.style.transform = 'translateY(0)';
      
      tooltip.innerHTML = `
        <div class="font-semibold">(${firstWork.a.toFixed(2)}, ${firstWork.b.toFixed(2)}i)</div>
        <div class="mt-1 text-xs text-gray-400">Click to view details</div>
        ${works.length > 1 ? `<div class="mt-2 text-sm">${works.length} works at this position</div>` : ''}
        <div class="mt-2">${firstWork.name}</div>
        <div class="text-xs mt-1">${firstWork.type}</div>
      `;
      
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;
      const x = event.pageX;
      const y = event.pageY;
      
      tooltip.style.left = `${x - tooltipWidth / 2}px`;
      tooltip.style.top = `${y - tooltipHeight - 15}px`;
    })
    .on('mouseout', function() {
      // Restore the point size unless it's selected
      const pointData = d3.select(this).datum();
      const isSelected = selectedWork && pointData[1].some(w => w.name === selectedWork.name);
      
      d3.select(this)
        .transition()
        .duration(300)
        .attr('r', isSelected ? 10 : 8);
        
      // Hide tooltip
      tooltip.style.opacity = 0;
      tooltip.style.transform = 'translateY(10px)';
    })
    .on('click', function(event, d) {
      const works = d[1];
      
      if (works.length === 1) {
        // If only one work at this position, show its details directly
        selectedWork = works[0];
        updateWorkDetails(selectedWork);
        
        // Update selection styling for all points
        svg.selectAll('.work-point')
          .attr('stroke', d => (selectedWork && d[1].some(w => w.name === selectedWork.name)) ? '#ffffff' : 'none')
          .attr('stroke-width', d => (selectedWork && d[1].some(w => w.name === selectedWork.name)) ? 3 : 0);
      } else {
        // If multiple works, show selection panel
        showWorkSelectionPanel(works, event.pageX, event.pageY);
      }
    });
    
  // Animate the points if requested
  if (animate) {
    points.transition()
      .duration(800)
      .delay((d, i) => i * 10)
      .attr('r', 8)
      .style('opacity', 1);
  } else {
    points.attr('r', 8)
      .style('opacity', 1);
  }
  
  // Draw lines connecting works of the same type if there are enough points
  const typeGroups = d3.group(filteredWorks, d => d.type);
  
  typeGroups.forEach((works, type) => {
    if (works.length >= 3) {
      // Sort works by a value to create a smoother line
      const sortedWorks = [...works].sort((a, b) => a.a - b.a);
      
      // Create a line generator
      const line = d3.line()
        .x(d => xScale(d.a))
        .y(d => yScale(d.b))
        .curve(d3.curveCatmullRom.alpha(0.5));
      
      // Add line
      g.select('.points').append('path')
        .datum(sortedWorks)
        .attr('class', 'type-line')
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', typeColors[type] || '#718096')
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '5,5')
        .attr('stroke-opacity', 0.5);
    }
  });
} 