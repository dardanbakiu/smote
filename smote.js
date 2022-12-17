// Helper function to calculate the Euclidean distance between two points
function euclideanDistance(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += Math.pow(a[i] - b[i], 2);
    }
    return Math.sqrt(sum);
  }
  
  // SMOTE algorithm implementation
  function smote(samples, N, k) {
    // Calculate the number of synthetic samples to generate
    const nSyntheticSamples = Math.floor((N - samples.length) / samples.length);
  
    // Array to store the synthetic samples
    const syntheticSamples = [];
  
    // For each sample in the minority class
    for (let i = 0; i < samples.length; i++) {
      // Find the k nearest neighbors
      const neighbors = [];
      for (let j = 0; j < samples.length; j++) {
        if (i === j) continue;  // Skip the current sample
        const distance = euclideanDistance(samples[i], samples[j]);
        if (neighbors.length < k) {
          neighbors.push({ index: j, distance });
        } else {
          // If the current sample is closer than the furthest neighbor, add it to the list
          const maxDistance = Math.max(...neighbors.map(n => n.distance));
          if (distance < maxDistance) {
            neighbors[neighbors.findIndex(n => n.distance === maxDistance)] = { index: j, distance };
          }
        }
      }
  
      // Generate synthetic samples for the current sample
      for (let j = 0; j < nSyntheticSamples; j++) {
        // Choose a random neighbor
        const r = Math.floor(Math.random() * neighbors.length);
        const neighbor = samples[neighbors[r].index];
  
        // Generate a synthetic sample as a linear combination of the current sample and the chosen neighbor
        const syntheticSample = [];
        for (let l = 0; l < samples[i].length; l++) {
          syntheticSample.push(samples[i][l] + Math.random() * (neighbor[l] - samples[i][l]));
        }
        syntheticSamples.push(syntheticSample);
      }
    }
  
    // Return the original samples and the synthetic samples
    return samples.concat(syntheticSamples);
  }
  
  // Example usage
  const samples = [  [1, 2, 3],  // minority class
    [4, 5, 6],  // minority class
    [7, 8, 9]   // majority class
  ];
  const N = 10;  // Desired number of samples in the balanced dataset
  const k = 1;   // Number of nearest neighbors to use
  const balancedDataset = smote(samples, N, k);
  console.log(balancedDataset);  // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1.5, 2.5, 3.5], [3.5, 4.5,