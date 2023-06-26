$(document).ready(function() {
  console.log("Document is ready");
  $(".ps-shape").each(function() {
    console.log("Adding animation to shape");
    animateShape($(this));
  });
});

function animateShape(shape) {
  console.log("Animating shape");
  var newq = makeNewPosition(shape);
  var oldq = shape.offset();
  var speed = calcSpeed([oldq.top, oldq.left], newq);

  shape.animate({ top: newq[0], left: newq[1] }, speed, function() {
    animateShape(shape);
  });
}
  
function makeNewPosition(shape) {
  // get the dimensions of the parent container
  var h = shape.parent().height() - shape.height();
  var w = shape.parent().width() - shape.width();
    
  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);
    
  return [nh, nw];
}
  
function calcSpeed(prev, next) {
  var x = Math.abs(prev[1] - next[1]);
  var y = Math.abs(prev[0] - next[0]);
    
  var greatest = x > y ? x : y;
    
  var speedModifier = 0.1;
  
  var speed = Math.ceil(greatest/speedModifier);
  
  return speed;
}
