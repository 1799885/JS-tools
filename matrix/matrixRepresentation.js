function printMatrix_nD(m, delimeter, round){
    console.log(matrixToString(m, delimeter, round));
}
function matrixToString(m, delimeter, round){
    if(round == true){ //remove the "true" when jsdoc done
        let copy = matrix.make.copy(m);
        for(let i = 0; i < m.length; i++){
            for(let j = 0; j < m[0].length; j++){
                copy[i][j] = Math.round(m[i][j]);
            }
        }
        m = copy;
        return matrixToString(copy, delimeter);
    }
    else{
        let d, end = "";
        let str = "[";
        for(let i = 0; i < m.length; i++){
            if(Array.isArray(m[i])){
                if(Array.isArray(m[i][0])){
                    end = "\n";
                }
                str += matrixToString(m[i], delimeter);
                d = (delimeter)? delimeter : "\n";
            }
            else{
                str += m[i];
                d = ",";
            }
            str += ((i + 1 < m.length) ?  d + " " : "") + end;
        }
        str += "]";
        return str;
    }
}