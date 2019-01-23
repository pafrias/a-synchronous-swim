const SwimTeam = {

  // direction, start and range all need to match the CSS
  angle: 0, // rotation from pointing left, in radians
  position: { top: 100, left: 100 },
  range: { top: 0, left: 0, bottom: 400, right: 300 },

  isInRange: () => {
    return true;
    var sine = Math.sin(SwimTeam.angle * Math.PI);
    //do stuff with sine
    // needs fix for angles
    
    //switch cases?
    if (position.top > range.position.top && top < range.bottom) {
      if (position.left > range.position.left && left < range.right) {
        return true;
      }
    }
    return false;
  },

  move: (direction) => {
    
    if (!direction) { return; } // in case of sabotage
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
    if (SwimTeam.isInRange()) { //helper function
      SwimTeam.position.top -= 10 * Math.sin(SwimTeam.angle * Math.PI);
      SwimTeam.position.left -= 10 * Math.cos(SwimTeam.angle * Math.PI);
    }

    $('.team')
      .css('top', `${SwimTeam.position.top}px`)
      .css('left', `${SwimTeam.position.left}px`);

    /*
      Refactor direction to represent degrees
      if direction is 0
      --> move only left
      if direction is 90
      --> move only up
      if direction is 180
      --> move only right
      if direction is 270
      --> move only down

    New update Loc function
      1) get sin of dir
      2) get cos of dir
      3) add
    */

    // calculate what the new position is for the swim-team is
    // but don't let the swim-team get outside the max bounds!
  }
};
