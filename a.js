const A = 66;
const C = 360;
const RADIUS_KRING = 425;
const RADIUS_DAGEN = 400;
const X = 475;
const Y = 475;

function toRadians (angle) {
   return angle * (Math.PI / 180);
 }


for ( let d = 0 ; d < 360; d++) {
    a = toRadians(d);
    let y = Y + R * Math.sin(a);
    let x = X + R * Math.cos(a);
    console.log({d:d, x:x, y:y});
}