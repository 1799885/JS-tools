array_nD = {
    make: {
        empty: function(...dims){
            try{
                let arr = [];
                if(dims.length == 2){
                    return matrix.make.empty(dims[0], dims[1]);
                }
                for(let i = 0; i < dims[0]; i++){
                    arr.push(array_nD.make.empty(dims.slice(1)));
                }
                return arr;
            }
            catch(error){
                console.log(error);
            }
        }
    }
}