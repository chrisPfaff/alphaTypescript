import React from 'react'

function mathRandom(num = 1) {
  return Math.floor((Math.random() * num) + 1);
}

export default mathRandom;