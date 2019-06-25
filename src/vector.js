const Vector = {
  // Normalize the length of the vector to 1, maintaining direction.
  normal(vec) {
    const mag = Vector.magnitude(vec);
    return Vector.scale(vec, 1 / mag);
  },
  // Find distance between two points.
  distance(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  // Find the length of the vector.
  magnitude(vec) {
    return Vector.distance([0, 0], vec);
  },
  // Return a randomly oriented vector with the given length.
  randomVector(length = 1) {
    const deg = 2 * Math.PI * Math.random();
    return Vector.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale(vec, scalar) {
    return [vec[0] * scalar, vec[1] * scalar];
  },

  wrap(pos, boundaries) {
    return [
      wrap1D(pos[0], boundaries[0]), 
      wrap1D(pos[1], boundaries[1])
    ];
  },
  
  wrap1D(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }
};

module.exports = Vector;
