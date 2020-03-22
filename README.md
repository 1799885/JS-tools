# JS-tools
This library allows to simplify some logic using JavaScript.

## Content:

### Matrix:
All the files below uses Matrix / Array[arrays]. Please, keep in mind that this matrices follow this definition:

    let arr; // Some particular matrix. Therefore:
    // X Row = arr.length
    // Y Rol = arr[0].length

    //if we print a particular matrix:

    [[1, 5, 0, 4], [0, 1, 0, 0],[0, 5, 1, 2],[0, 0, 0, 9]]

    Which represented looks like:

    [[1, 5, 0, 4]
    [0, 1, 0, 0]
    [0, 5, 1, 2]
    [0, 0, 0, 9]]

    This way, in order to select the (x, y) element we use the sintax `arr[x][y]`.
    In this case, arr[0][0] = 1 and arr[3][3] = 9.

Also look at the JSDOC added to this library.

#### Doc:
Some files with the documentation used to develop files in this directory. Full credit to the authors of this files.

#### Matrix:
This file contains a dictionary with a collection of functions that allow us to create, handle and operate matrices (For more detail, check JSDOC at the file).
These functions are divided in:

##### make:
Collections of functions to generate matrices:

   *identity:* Indentity matrices.

   *zero:* Matrices filled with ceros.

   *empty:* Matrices filled with undefined values.

   *copy:* Copy of a matrix.

   *rotation:* Matrix to rotate around itself.

   *rotationOrigin:* Matrix to rotate around the origin of coordinates.

   *translation:* Matrix to translate in some direction.

   *scale:* Matrix to scale by the axis-factors.

   *reflexion:* Matrix to apply a reflexion around the selected axis.


##### p or properties:
Collections of functions to see the properties matrices.

   *size:* Size of the matrix.

   *isSquare:* Checks if square matrix.

   *getRow:* Returns selected row.

   *getCol:* Returns selected col.

   *subMatrix:* Returns the sub-matrix.

   *applyRotation:* Conversor to use this matrices with P5's applyMatrix().


##### o or operate:
Collection of function to operate with matrices.

   *det:* Determinant (recursive method).
   
   *add:* Addition.
   
   *mult:* Multiplication.
   
   *sub:* Substraction.
   
   *scalar:* Matrix * number operation.
   
   *removeRow:* Remove selected row.
   
   *removeCol:* Remove selected col.
   
   *transpose:* Transposed matrix.
   
   *inverse:* Inversed matrix (Guassian Elimination method).


#### Array_nD:

#### MatrixRepresentation:
File with the logic to easily print on console a matrix. Check JSDOC to see how to customize the output of this functions.

   *printArray_nD:* Function that prints the result of running the function *array_nDToString*.
   
   *printMatrix_nD:* Different way to call *printArray_nD*.
   
   *array_nDToString:* Way to get the toString() method of a array of (arrays of...) of order n.