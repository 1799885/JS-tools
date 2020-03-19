array_nD = {
    make: {
        empty: function(...dims){
            try{
                let arr = [];
                if(dims.length == 2){
                    return matrix.make.empty(dims[0], dims[1]);
                }
                for(let i = 0; i < dims[0]; i++){
                    arr.push(array_nD.make.empty(...dims.slice(1)));
                }
                return arr;
            }
            catch(error){
                console.log(error);
                return null;
            }
        },
        copy: function(arrND){
            try{
                let d = array_nD.p.size(arrND);
                let copy = [];
                if(d.length == 2){
                    return matrix.make.copy(arrND); 
                }
                for(let i = 0; i < d.length; i++){
                    copy.push(array_nD.make.copy(arrND[i]));
                }
                return copy;
            }
            catch(error){
                console.log(error);
                return null;
            }
        }
    },
    p: {
        size: function(arr){
            let dim = [];
            if(Array.isArray(arr[0])){
                dim.unshift(...array_nD.p.size(arr[0]));
                dim.unshift(arr.length);
            }
            else{
                dim.unshift(arr.length);
            }
            return dim;
        }
    },
    o: {
        permutation_3D: function(arr3D, axis, h){
            try{
                // let copy = array_nD.make.copy(arr3D);
                let cornersV = [
                    [0, 0],
                    [0, 2],
                    [2, 2],
                    [2, 0],
                ];
                let edgesV = [
                    [0, 1],
                    [1, 2],
                    [2, 1],
                    [1, 0]
                ];
                let slice = array_nD.o.get3DSlice(arr3D, axis, h);
                let copy = matrix.make.empty(3,3);
                copy[1][1] = slice[1][1]; //center
                for(let i = 0, j = 1; i < 4; i++, j = (j + 1) % 4){
                    copy[cornersV[i][0]][cornersV[i][1]] = slice[cornersV[j][0]][cornersV[j][1]];
                    copy[edgesV[i][0]][edgesV[i][1]] = slice[edgesV[j][0]][edgesV[j][1]];
                }
                array_nD.o.set3DSlice(arr3D, axis, h, copy);
                return copy;
                // switch(true){
                //     case vector.re.X.test(axis)://x = cte = h
                        
                //         // array_nD.o.set3DSlice(arr3D, "x", h, );
                //         break;
                //     case vector.re.Y.test(axis)://y = cte = h

                //         break;
                //     case vector.re.Z.test(axis)://z = cte = h

                //         break;
                // }

            }
            catch(error){
                console.log(error);
                return null;
            }
        },
        get3DSlice: function(arr3D, axis, h){
            try{
                let m = matrix.make.empty(3,3);
                switch(true){
                    case vector.re.X.test(axis)://x = cte = h
                        for(let j = 0; j < 3; j++){
                            for(let k = 0; k < 3; k++){
                                m[j][k] = arr3D[h][j][k];
                            }
                        }
                        break;
                    case vector.re.Y.test(axis)://y = cte = h
                        for(let i = 0; i < 3; i++){
                            for(let k = 0; k < 3; k++){
                                m[i][k] = arr3D[i][h][k];
                            }
                        }
                        break;
                    case vector.re.Z.test(axis)://z = cte = h
                        for(let i = 0; i < 3; i++){
                            for(let j = 0; j < 3; j++){
                                m[i][j] = arr3D[i][j][h];
                            }
                        }
                        break;
                }
                // printMatrix_nD(m);
                return m;
            }
            catch(error){
                console.log(error);
                return null;
            }
        },
        set3DSlice: function(arr3D, axis, h, slice){
            try{
                switch(true){
                    case vector.re.X.test(axis)://x = cte = h
                        for(let j = 0; j < 3; j++){
                            for(let k = 0; k < 3; k++){
                                arr3D[h][j][k] = slice[j][k];
                            }
                        }
                        break;
                    case vector.re.Y.test(axis)://y = cte = h
                        for(let i = 0; i < 3; i++){
                            for(let k = 0; k < 3; k++){
                                arr3D[i][h][k] = slice[i][k];
                            }
                        }
                        break;
                    case vector.re.Z.test(axis)://z = cte = h
                        for(let i = 0; i < 3; i++){
                            for(let j = 0; j < 3; j++){
                                arr3D[i][j][h] = slice[i][j];
                            }
                        }
                        break;
                }
                // printMatrix_nD(arr3D);
                return arr3D;
            }
            catch(error){
                console.log(error);
                return null;
            }
        }
    }
}