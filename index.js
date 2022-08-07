

function border() {
  document.getElementById("myDiv").style.border = "thick solid #0000FF";

}

function draw() {
    const canvas = document.querySelector('#canvas');

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');

    // set line stroke and line width
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 10;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 100);
    ctx.stroke();

}
draw();
