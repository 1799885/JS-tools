var vector = {
  arrSum: function(arr){ //[1,3,3] -> 7
    try{
      return arr.reduce(function(a,b){
        return a + b;
      }, 0);
    }
    catch(error){
      console.log(error);
      return null;
    }
  },
  escalar: function(u, v){
    try{
      let e = 0;
      for(let i = 0; i < u.length; i++){
        e += u[i] * v[i];
      }
      return e;
    }
    catch(error){
      console.log(error);
      return null;
    }
  },
  toVector: function(m, round){ //col vector or row vector to true vector;
    try{
      if(!round){
        if(m.length == 1){//row vector
          return m[0];
        }
        else if(m[0].length == 1){//col vector
          let v = [];
          for(let i = 0; i < m.length; i++){
            v.push(m[i][0]);
          }
          return v;
        }
        else{
          throw "Not correct dimensions to transform into a Vector/Array";
        }
      }
      else{
        let v = [];
        if(m.length == 1){//row vector
          for(let i = 0; i < m[0].length; i++){
            v.push(Math.round(m[0][i]));
          }
        }
        else if(m[0].length == 1){//col vector
          for(let i = 0; i < m.length; i++){
            v.push(Math.round(m[i][0]));
          }
        }
        else{
          throw "Not correct dimensions to transform into a Vector/Array";
        }
        return v;
      }
    }
    catch(error){
      console.log(error);
      return null;
    }

  },
  re: {
    X: /[xXi0]/,
    Y: /[yYj1]/,
    Z: /[zZk2]/,
    conversor: ["x","y","z"]
  }
}
  
function keyPressed() {
  switch(keyCode){
    case 85:
      rubik.m("U");
      break;
    case 68:
      rubik.m("D");
      break;
    case 82:
      rubik.m("R");
      break;
    case 76:
      rubik.m("L");
      break;
  }
}