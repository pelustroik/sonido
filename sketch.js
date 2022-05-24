let rectPosX = 200;
let rectPosY = 200;
let tamaño = 300;

let colores = [];
let sonidos;

let boton;
let botBool;

let sc = [];

let tMeter = [];

let data;
let data2;

function preload(){

data = loadJSON('ejemplo.json');


let freeverb;
let filter;

  // player = new Player("solounarchivo.mp33")
  // player2 = new Player("solounarchivo2.mp33")

// audios = [audio1, audio2, audio3]
// javascript

// interfaz gráfica



// fondos.volume.value = -6;

// 1 + mouseY = volumen del primer sonido
// 2 + mouseY = volumen del segundo sonido
// 3 + mouseY = volumen del tercero sonido
// 4 + mouseY = volumen del cuarto sonido

}
function setup() {

  createCanvas(400, 400);
  noLoop();

  freeverb = new Tone.Reverb().toDestination();
  filter = new Tone.Filter(200, "lowpass").connect(freeverb);
  sonidos = new Tone.Players(data.audios).connect(filter); //

  // sonidos.toDestination()
  // sonidos > fitro > reverberación > toDestination
  // generador > transformaciones > salida

  console.log(data.colores.p1);

  colores = [
    color(data.colores.p0),
    color(data.colores.p1),
    color(data.colores.p2),
    color(data.colores.p3),
  ];

  rectPosX = width/2;
  rectPosY = height/2;

  boton = createButton('iniciar');
  boton.position(width/2-(boton.width/2), height/2 - (boton.height/2));
  boton.mousePressed(miBoton);

  for(let i = 0; i < 4; i++){
    sc[i] = 1;
    tMeter[i]  =  new Tone.Meter();
  }

  noStroke();
  strokeWeight(4);

}

function draw() {

  // 60 fps > imagen 4k
  // 44100 muestras por segundo wav flac aiff

  // sonido.play()

  background(0);
  let tamR;

  let cont = 0;
  let gains = [];

  for (let x = 0; x < 2; x++) {
    for (let y = 0; y < 2; y++) {

      gains[cont] = Tone.dbToGain(tMeter[cont].getValue() );

      let noiseT = noise(
        x * 0.4 + frameCount * 0.001,
        y * 0.4 + frameCount * 0.001,
      );

      tamR = 400 * sc[cont] * (0.5+gains[cont]);
      let mapRot = map(noiseT, 0, 1, -360, 360);

      push();

      translate((x + 1) * (width / 3),
                (y + 1) * (width / 3));

      rotate(radians(mapRot));
      fill(colores[cont]);

      rect(-(tamR / 2), -(tamR / 2), tamR, tamR );
      pop();

      cont++;

    }
  }

  fill(255, 50);
  push();
  translate(rectPosX, rectPosY);
  // rotate(radians(Math.sin(frameCount*0.01)*200));
  ellipse(0, 0, tamaño, tamaño);
  pop();



  if (keyIsPressed && key == "s") { // efectos de sonido
    tamaño = mouseX;
  }

  for(let i = 0; i < 4; i++){
    if (keyIsPressed && key == (i+1).toString() ) {
      let rango = map(mouseY, 0, width, 0.125, 1);
      sc[i] = rango;
      let ganancia = map(mouseY, 0, height, 0, 1);
      sonidos.player(("p"+i).toString()).volume.value = Tone.gainToDb(ganancia);
    }
  }

  // console.log( Tone.dbToGain(tMeter[0].getValue()) )

}

function mouseDragged() {

  rectPosX = mouseX;
  rectPosY = mouseY;

  // 0-400

  filter.frequency.value = map(mouseX, 0, width, 0, 10000);
  freeverb.wet.value = map(mouseY, 0, height, 0, 1); 

}

function miBoton(){
  boton.hide();
  // miBooleano = true;
  loop();

  // sonidos.player("0").start()
  // sonidos.player("1").start()
  // sonidos.player("2").start()
  // sonidos.player("3").start()


  // 1. osciladores o generadores
  // 2. Grabaciones o muestras
  // 3. Efectos
  // 4. analisis > amplitud frecuenciia

  for(let i = 0; i < 4; i++){
    //
    sonidos.player(("p"+i).toString()).start();
    sonidos.player("p"+i).connect(tMeter[i]) ;
  }

}
