export function twirlTimer() {
    var P = ['\\', '|', '/', '-'];
    var x = 0;
    return setInterval(()=>{
      process.stdout.write('\r' + P[x++]);
      x &= 3;
    }, 250);
  };
