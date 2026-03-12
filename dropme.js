let carNumber = getNumberFromImage();
let speed = getSpeedFromBlitzer();

if (speed > 30) {
  blitz();
  rechnungStellenAn(carNumber);
}
