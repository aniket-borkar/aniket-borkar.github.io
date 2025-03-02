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
  const margin = { top: 60, right: 60, bottom: 60, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  // Find min/max values for scales
  const aExtent = d3.extent(works, d => d.a);
  const bExtent = d3.extent(works, d => d.b);
  
  // Add a bit of padding to the extents
  const aRange = [Math.min(aExtent[0], -3) - 0.5, Math.max(aExtent[1], 3) + 0.5];
  const bRange = [Math.min(bExtent[0], 0) - 0.5, Math.max(bExtent[1], 4) + 0.5];
  
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
    
  // Add title
  g.append('text')
    .attr('class', 'font-bold text-lg')
    .attr('x', innerWidth / 2)
    .attr('y', -20)
    .attr('text-anchor', 'middle')
    .attr('fill', '#ffffff')
    .text('Works of Art in the Complex Plane');
    
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
    
  // Add legend, positioned outside the grid
  const legendData = Object.entries(typeColors);
  const legendGroup = g.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${innerWidth + 20}, 10)`);
    
  legendData.forEach((item, i) => {
    const [type, color] = item;
    const g = legendGroup.append('g')
      .attr('transform', `translate(0, ${i * 25})`);
      
    g.append('rect')
      .attr('width', 14)
      .attr('height', 14)
      .attr('rx', 7)
      .attr('fill', color)
      .attr('filter', 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))');
      
    g.append('text')
      .attr('x', 24)
      .attr('y', 10)
      .attr('font-size', '12px')
      .attr('fill', 'rgba(255, 255, 255, 0.8)')
      .text(type);
  });
  
  // Add instructions
  g.append('text')
    .attr('x', 0)
    .attr('y', -30)
    .attr('font-size', '12px')
    .attr('fill', 'rgba(255, 255, 255, 0.6)')
    .text('Scroll to zoom, drag to pan, click on points to view details');
  
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
    .attr('class', 'work-point')
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
        return typeColors[types[0]] || '#718096';
      }
      return (selectedWork && d[1].some(w => w.name === selectedWork.name)) ? '#ffffff' : 'none';
    })
    .attr('stroke-width', d => {
      const types = [...new Set(d[1].map(w => w.type))];
      return (selectedWork && d[1].some(w => w.name === selectedWork.name)) ? 3 : types.length > 1 ? 2 : 0;
    })
    .style('opacity', 0) // Start with opacity 0 for animation
    .on('mouseover', function(event, d) {
      d3.select(this)
        .attr('r', 12)
        .attr('stroke', 'rgba(255, 255, 255, 0.8)')
        .attr('stroke-width', 2);
      
      const works = d[1];
      const position = `(${works[0].a}, ${works[0].b}i)`;
      
      let tooltipContent = `
        <div class="font-medium text-white">${works.length} work${works.length > 1 ? 's' : ''} at ${position}</div>
      `;
      
      if (works.length <= 3) {
        tooltipContent += `<div class="text-gray-300 text-xs mt-1">${works.map(w => w.name).join(', ')}</div>`;
      } else {
        tooltipContent += `<div class="text-gray-300 text-xs mt-1">${works.slice(0, 2).map(w => w.name).join(', ')} and ${works.length - 2} more...</div>`;
      }
      
      tooltip.innerHTML = tooltipContent;
      
      tooltip.style.opacity = 1;
      tooltip.style.transform = 'translateY(0)';
      tooltip.style.left = `${event.pageX + 15}px`;
      tooltip.style.top = `${event.pageY - 15}px`;
    })
    .on('mousemove', function(event) {
      tooltip.style.left = `${event.pageX + 15}px`;
      tooltip.style.top = `${event.pageY - 15}px`;
    })
    .on('mouseout', function() {
      d3.select(this)
        .attr('r', d => d[1].length > 1 ? 10 : 8)
        .attr('stroke', d => {
          const types = [...new Set(d[1].map(w => w.type))];
          if (types.length > 1) {
            return typeColors[types[0]] || '#718096';
          }
          return (selectedWork && d[1].some(w => w.name === selectedWork.name)) ? '#ffffff' : 'none';
        })
        .attr('stroke-width', d => {
          const types = [...new Set(d[1].map(w => w.type))];
          return (selectedWork && d[1].some(w => w.name === selectedWork.name)) ? 3 : types.length > 1 ? 2 : 0;
        });
        
      tooltip.style.opacity = 0;
      tooltip.style.transform = 'translateY(10px)';
    })
    .on('click', function(event, d) {
      const works = d[1];
      
      // If only one work at this position, select it directly
      if (works.length === 1) {
        selectedWork = works[0];
        updateWorkDetails(works[0]);
        
        // Update selection styling
        svg.selectAll('.work-point')
          .attr('stroke', d => (selectedWork && d[1].some(w => w.name === selectedWork.name)) ? '#ffffff' : 'none')
          .attr('stroke-width', d => (selectedWork && d[1].some(w => w.name === selectedWork.name)) ? 3 : 0);
      } else {
        // Show work selection panel for multiple works
        showWorkSelectionPanel(works, event.pageX, event.pageY);
      }
        
      // Add a pulse animation to the selected point
      d3.select(this)
        .attr('r', 12)
        .transition()
        .duration(300)
        .attr('r', works.length > 1 ? 10 : 8)
        .transition()
        .duration(300)
        .attr('r', works.length > 1 ? 12 : 10);
    });
  
  // Animate points appearing
  if (animate) {
    points.transition()
      .duration(800)
      .delay((d, i) => i * 20)
      .attr('r', d => d[1].length > 1 ? 10 : 8)
      .style('opacity', 0.9);
  } else {
    points.attr('r', d => d[1].length > 1 ? 10 : 8).style('opacity', 0.9);
  }
  
  // Add connecting lines between points of the same type
  const lineGenerator = d3.line()
    .x(d => xScale(d.a))
    .y(d => yScale(d.b))
    .curve(d3.curveCatmullRom.alpha(0.5));
    
  // Group works by type
  const worksByType = d3.group(filteredWorks, d => d.type);
  
  // Add lines for each type
  worksByType.forEach((works, type) => {
    // Sort works by a value to create a more natural path
    const sortedWorks = [...works].sort((a, b) => a.a - b.a);
    
    if (sortedWorks.length > 2) {
      const path = g.select('.points').append('path')
        .datum(sortedWorks)
        .attr('class', 'type-line')
        .attr('d', lineGenerator)
        .attr('fill', 'none')
        .attr('stroke', typeColors[type])
        .attr('stroke-width', 1.5)
        .attr('stroke-opacity', 0.3)
        .attr('stroke-dasharray', function() {
          const length = this.getTotalLength();
          return `${length} ${length}`;
        })
        .attr('stroke-dashoffset', function() {
          return this.getTotalLength();
        });
        
      if (animate) {
        path.transition()
          .duration(1500)
          .attr('stroke-dashoffset', 0);
      } else {
        path.attr('stroke-dashoffset', 0);
      }
    }
  });
} 