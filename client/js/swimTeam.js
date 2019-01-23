const SwimTeam = {

  // direction, start and range all need to match the CSS
  angle: 0, // rotation from pointing left, in radians
  position: { top: 150, left: 150 },
  range: { top: 0, left: 0, bottom: 400, right: 600 },

  move: (direction) => {
    
    console.log(`Lets go: ${direction}`); 
    
    if (direction === 'left') {
      SwimTeam.angle -= 0.05;
    } else if (direction === 'right') {
      SwimTeam.angle += 0.05;
    } else {
      SwimTeam.swim(direction);
    }
      var degrees = SwimTeam.angle * 180;
      $('.swimmer').css('transform', `rotate(${degrees}deg)`)
  },

  swim: (direction) => { // expect a num
    if (SwimTeam.isInBounds(direction) && direction === 'up') { //helper function
      SwimTeam.position.top -= 10 * Math.sin(SwimTeam.angle * Math.PI);
      SwimTeam.position.left -= 10 * Math.cos(SwimTeam.angle * Math.PI);
    } else if (SwimTeam.isInBounds(direction) && direction === 'down') {
      SwimTeam.position.top += 10 * Math.sin(SwimTeam.angle * Math.PI);
      SwimTeam.position.left += 10 * Math.cos(SwimTeam.angle * Math.PI);
    }

    $('.team')
      .css('top', `${SwimTeam.position.top}px`)
      .css('left', `${SwimTeam.position.left}px`);

  },

  isInBounds: (direction) => {
    
    // if sine is positive, swimmer is pointing up
    var sine = Math.sin(SwimTeam.angle * Math.PI);
    // if cosing is positive, swimmer is pointing left
    var cosine = Math.cos(SwimTeam.angle * Math.PI);
    
    if (direction === 'up') {
      if (cosine > 0 && SwimTeam.position.left < 0) { //moving forward to left
        return false;
      } else if (cosine < 0 && SwimTeam.position.left > 600) { //moving forward to right
        return false;
      } else if (sine > 0 && SwimTeam.position.top < 0) { //moving forward to top
        return false;
      } else if (sine < 0 && SwimTeam.position.top > 400) { //moving forward to bottom
        return false;
      }
    } else if (direction === 'down') {
      if (cosine < 0 && SwimTeam.position.left < 0) { //moving backwards to left
        return false;
      } else if (cosine > 0 && SwimTeam.position.left > 600) { //moving backwards to right
        return false;
      } else if (sine < 0 && SwimTeam.position.top < 0) { //moving backwards to top
        return false;
      } else if (sine > 0 && SwimTeam.position.top > 400) { //moving backwards to bottom
        return false;
      }
    }
    return true;
  }
};
