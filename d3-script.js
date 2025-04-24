// console.log("✅ D3 script loaded");

// const svg = d3.select(".responsive-svg-container")
//   .append("svg")
//   .attr("viewBox", "0 0 1200 400")
//   .attr("width", "100%")
//   .style("border", "4px solid red")  // Make border bolder for visibility
//   .style("background-color", "white") // Temporarily use solid white
//   .attr("preserveAspectRatio", "xMidYMid meet");

// svg.append("rect")
//   .attr("x", 50)
//   .attr("y", 50)
//   .attr("width", 300)
//   .attr("height", 100)
//   .attr("fill", "blue");

console.log("✅ D3 script loaded");

// Step 1: Define the createBarChart function
const createBarChart = data => {
  // Set margins and dynamically calculate height
  const margin = { top: 20, right: 20, bottom: 20, left: 200 }; // increased left margin for brand labels
  const width = 1200 - margin.left - margin.right;
  const height = data.length * 50; // 50px per bar for spacing

  // Create the SVG container
  const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", `0 0 1400 ${height + margin.top + margin.bottom}`) // dynamic viewBox height
    .attr("width", "100%")
    .style("border", "4px solid red")  // For visibility
    .style("background-color", "white")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Step 2: Define scales
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([0, width]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, height])
    .padding(0.4); // increases vertical gap between bars

  // Step 3: Create groups for each bar and label
  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // Step 4: Append rectangles (bars) to the groups
  barAndLabel
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue");

  // Step 5: Add category labels (brand names)
  barAndLabel
    .append("text")
    .text(d => d.brand)
    .attr("x", -10)  // 10px left of the bars
    .attr("y", yScale.bandwidth() / 2)
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .style("fill", "black");

  // Step 6: Add count labels
  barAndLabel
    .append("text")
    .text(d => d.count)
    .attr("x", d => xScale(d.count) + 5)
    .attr("y", yScale.bandwidth() / 2)
    .attr("dy", ".35em")
    .style("font-family", "sans-serif")
    .style("font-size", "13px")
    .style("fill", "black");
};

// Step 7: Load the data and then call the createBarChart function
d3.csv("../data/data.csv", d => {
  return {
    brand: d["Brand_Reg"],
    count: +d["Count(Screen_Tech)"]
  };
}).then(data => {
  console.log("Data loaded:", data);
  createBarChart(data);
}).catch(error => {
  console.error("Error loading the CSV data:", error);
});
