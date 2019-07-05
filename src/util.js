const Util = {
  // Normalize the length of the vector to 1, maintaining direction.
  dir(vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },
  // Find difference between two vectors, pos1 - pos2
  diff(pos1, pos2) {
    return [
      pos1[0] - pos2[0],
      pos1[1] - pos2[1]
    ]
  }, 
  // Find distance between two points.
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  // Find the length of the vector.
  norm(vec) {
    return Util.dist([0, 0], vec);
  },
  // Return a randomly oriented vector with the given length.
  randomVec(length) {
    const ang = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(ang), Math.cos(ang)], length);
  },
  // Return the input vector rotated counter-clockwise by the input angle
  rotateVec(vec,rotAng) {
    let oldAng = Math.atan(vec[1]/vec[0]);
    if(vec[0]<0) oldAng = oldAng + Math.PI;
    let length = this.norm(vec);
    let newAng = oldAng + rotAng;
    return Util.scale([Math.cos(newAng), Math.sin(newAng)], length);
  },
  // Scale the length of a vector by the given amount.
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  wrap(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }
};

module.exports = Util;
