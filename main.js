// Enregistrement du service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(()=>{});
  });
}

const enableBtn = document.getElementById('enableBtn');
const messageEl = document.getElementById('message');
const needle = document.getElementById('needle');
const headingEl = document.getElementById('heading');
const directionEl = document.getElementById('direction');

function directionFromHeading(h){
  const dirs = ['N','NE','E','SE','S','SW','W','NW'];
  return dirs[Math.floor(((h+22.5)%360)/45)];
}

function updateUI(h){
  if (typeof h !== 'number' || isNaN(h)) return;
  const rounded = Math.round(h);
  headingEl.textContent = `${rounded}°`;
  directionEl.textContent = directionFromHeading(h);
  // L'aiguille pointe vers le nord, on inverse la rotation
  needle.style.transform = `rotate(${h}deg)`;
}

function handleOrientation(e){
  let heading = null;
  if (e.webkitCompassHeading !== undefined) {
    heading = e.webkitCompassHeading; // iOS
  } else if (e.alpha !== null) {
    // alpha: rotation around Z axis. Convert to compass heading.
    // On many Android devices, alpha=0 when device faces north, so heading = 360 - alpha
    heading = 360 - e.alpha;
    // Compensate pour l'orientation d'écran
    const screenAngle = (screen.orientation && screen.orientation.angle) || window.orientation || 0;
    heading = heading + screenAngle;
    heading = (heading + 360) % 360;
  }

  if (heading === null) {
    messageEl.textContent = 'Capteur indisponible sur cet appareil.';
  } else {
    messageEl.textContent = '';
    updateUI(heading);
  }
}

async function enableSensors(){
  // Pour iOS 13+ il faut demander la permission
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function'){
    try{
      const res = await DeviceOrientationEvent.requestPermission();
      if (res === 'granted'){
        window.addEventListener('deviceorientation', handleOrientation, true);
        messageEl.textContent = '';
      } else {
        messageEl.textContent = 'Permission refusée.';
      }
    }catch(err){
      messageEl.textContent = 'Erreur permission.';
    }
  } else if ('DeviceOrientationEvent' in window) {
    // Android / desktop
    window.addEventListener('deviceorientation', handleOrientation, true);
    messageEl.textContent = '';
  } else {
    messageEl.textContent = 'Capteurs non supportés.';
  }
}

enableBtn.addEventListener('click', enableSensors, {passive:true});

// Essayer d'activer automatiquement si possible (Chrome sur Android autorise sans click)
if (! (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function')){
  // ajoute l'écouteurs directement
  window.addEventListener('deviceorientation', handleOrientation, true);
}

// Affiche l'orientation à chaque changement d'orientation d'écran
if (screen.orientation && screen.orientation.addEventListener){
  screen.orientation.addEventListener('change', ()=>{});
}
