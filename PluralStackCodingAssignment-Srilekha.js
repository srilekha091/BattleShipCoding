/**************** INPUT ***************/
var board = [];
board.push(['O', 'B', 'X', 'X', 'X', 'S', 'O']);
board.push(['B', 'X', 'S', 'O', 'S', 'O', 'O']);
board.push(['S', 'X', 'B', 'S', 'X', 'O', 'B']);
board.push(['O', 'O', 'O', 'X', 'X', 'O', 'X']);
board.push(['O', 'B', 'O', 'X', 'B', 'O', 'X']);
board.push(['O', 'X', 'O', 'B', 'O', 'O', 'X']);
board.push(['O', 'S', 'B', 'X', 'X', 'S', 'S']);

var shipDetails = ReturnShipDetails(board, 5, 6);
console.log(shipDetails);  

/**************************************/

// Main method for returning the ship details.

function ReturnShipDetails(board, x, y) {
                    if (board == null) {
                        return null;
                    }

                    var rows = board.length;
                    var cols = board[0].length;

                    if (rows == 0 && cols == 0) {
                        return null;
                    }

                    if (x < 0 || x >= rows || y < 0 || y >= cols) {
                        return null;
                    }

                    var current = board[x][y];

                    if (current == 'O') {
                        return null;
                    }

                    if (current == 'B') {
                        var expectedEnd = 'S';
                        var right = SearchRight(current, expectedEnd, rows, cols, x, y);
                        if (right.shipFound) {
                            return GetShipDetails(right);
                        }

                        var left = SearchLeft(current, expectedEnd, rows, cols, x, y);
                        if (left.shipFound) {
                            return GetShipDetails(left);
                        }

                        var up = SearchUp(current, expectedEnd, rows, cols, x, y);
                        if (up.shipFound) {
                            return GetShipDetails(up);
                        }

                        var down = SearchDown(current, expectedEnd, rows, cols, x, y);
                        if (down.shipFound) {
                            return GetShipDetails(down);
                        }

                        return null;
                    }
                    else if (current == 'S') {
                        var expectedEnd = 'B';
                        var right = SearchRight(current, expectedEnd, rows, cols, x, y);
                        if (right.shipFound) {
                            return GetShipDetails(right);
                        }

                        var left = SearchLeft(current, expectedEnd, rows, cols, x, y);
                        if (left.shipFound) {
                            return GetShipDetails(left);
                        }

                        var up = SearchUp(current, expectedEnd, rows, cols, x, y);
                        if (up.shipFound) {
                            return GetShipDetails(up);
                        }

                        var down = SearchDown(current, expectedEnd, rows, cols, x, y);
                        if (down.shipFound) {
                            return GetShipDetails(down);
                        }

                        return null;
                    }
                    else if (current == 'X') {
                        var horizontal = SearchHorizontal(current, rows, cols, x, y);
                        if (horizontal.shipFound) {
                            return GetShipDetails(horizontal);
                        }

                        var vertical = SearchVertical(current, rows, cols, x, y);
                        if (vertical.shipFound) {
                            return GetShipDetails(vertical);
                        }

                        return null;
                    }
                };

                function GetShipDetails(obj) {
                    return {
                        shipCoordinates: obj.shipCoordinates,
                        shipType: GetShipType(obj.shipCoordinates.length)
                    };
                };

                function GetShipType(shipLength) {
                    if (shipLength == 3) {
                        return "Cruisers";
                    }
                    else if (shipLength == 4) {
                        return "Destroyers";
                    }
                    else if (shipLength == 5) {
                        return "Battleship";
                    }
                };

                function SearchHorizontal(current, rows, cols, x, y) {
                    var bFound = false;
                    var sFound = false;
                    var countOfX = 1;
                    var shipFound = false;
                    var shipCoordinates = [];
                    var i = x;
                    var j = y;
                    shipCoordinates.push([i, j]);
                    j++;

                    while (j < cols) {
                        if (board[i][j] == 'O') {
                            break;
                        }
                        else if (board[i][j] == current) {
                            countOfX++;
                            if (countOfX > 3) {
                                return {
                                    shipFound: false,
                                    shipCoordinates: shipCoordinates
                                };
                            }
                            shipCoordinates.push([i, j]);
                            j++;
                        }
                        else if (board[i][j] == 'B') {
                            bFound = true;
                            shipCoordinates.push([i, j]);
                            break;
                        }
                        else if (board[i][j] == 'S') {
                            sFound = true;
                            shipCoordinates.push([i, j]);
                            break;
                        }
                    }

                    j = y - 1;

                    while (j >= 0) {
                        if (board[i][j] == 'O') {
                            break;
                        }
                        else if (bFound && board[i][j] == 'B') {
                            break;
                        }
                        else if (sFound && board[i][j] == 'S') {
                            break;
                        }
                        else if (board[i][j] == current) {
                            countOfX++;
                            if (countOfX > 3) {
                                break;
                            }
                            shipCoordinates.unshift([i, j]);
                            j--;
                        }
                        else if ((bFound && board[i][j] == 'S') || (sFound && board[i][j] == 'B')) {
                            shipFound = true;
                            shipCoordinates.unshift([i, j]);
                            break;
                        }
                        else {
                            break;
                        }
                    }

                    return {
                        shipFound: shipFound,
                        shipCoordinates: shipCoordinates
                    };
                };

                function SearchVertical(current, rows, cols, x, y) {
                    var bFound = false;
                    var sFound = false;
                    var countOfX = 1;
                    var shipFound = false;
                    var shipCoordinates = [];
                    var i = x;
                    var j = y;
                    shipCoordinates.push([i, j]);
                    i++;

                    while (i < rows) {
                        if (board[i][j] == 'O') {
                            break;
                        }
                        else if (board[i][j] == current) {
                            countOfX++;
                            if (countOfX > 3) {
                                return {
                                    shipFound: false,
                                    shipCoordinates: shipCoordinates
                                };
                            }
                            shipCoordinates.push([i, j]);
                            i++;
                        }
                        else if (board[i][j] == 'B') {
                            bFound = true;
                            shipCoordinates.push([i, j]);
                            break;
                        }
                        else if (board[i][j] == 'S') {
                            sFound = true;
                            shipCoordinates.push([i, j]);
                            break;
                        }
                    }

                    i = x - 1;

                    while (i >= 0) {
                        if (board[i][j] == 'O') {
                            break;
                        }
                        else if (bFound && board[i][j] == 'B') {
                            break;
                        }
                        else if (sFound && board[i][j] == 'S') {
                            break;
                        }
                        else if (board[i][j] == current) {
                            countOfX++;
                            if (countOfX > 3) {
                                break;
                            }
                            shipCoordinates.unshift([i, j]);
                            i--;
                        }
                        else if ((bFound && board[i][j] == 'S') || (sFound && board[i][j] == 'B')) {
                            shipFound = true;
                            shipCoordinates.unshift([i, j]);
                            break;
                        }
                        else {

                            break;
                        }
                    }

                    return {
                        shipFound: shipFound,
                        shipCoordinates: shipCoordinates
                    };
                };
                
                function SearchRight(current, expectedEnd, rows, cols, i, j) {
                    var xFound = false;
                    var countOfX = 0;
                    var shipFound = false;
                    var shipCoordinates = [];
                    shipCoordinates.push([i, j]);
                    j++;

                    while (j < cols) {
                        if (board[i][j] == 'O' || board[i][j] == current) {
                            break;
                        }
                        else if (xFound == false && board[i][j] == expectedEnd) {
                            break;
                        }
                        else if (xFound == false && board[i][j] == 'X') {
                            xFound = true;
                            countOfX++;
                            shipCoordinates.push([i, j]);
                            j++;
                        }
                        else if (xFound == true && board[i][j] == 'X') {
                            countOfX++;
                            if (countOfX > 3) {
                                break;
                            }
                            shipCoordinates.push([i, j]);
                            j++;
                        }
                        else if (xFound == true && board[i][j] == expectedEnd) {
                            shipFound = true;
                            shipCoordinates.push([i, j]);
                            break;
                        }
                    }

                    return {
                        shipFound: shipFound,
                        shipCoordinates: shipCoordinates
                    };
                };

                function SearchLeft(current, expectedEnd, rows, cols, i, j) {
                    var xFound = false;
                    var countOfX = 0;
                    var shipFound = false;
                    var shipCoordinates = [];
                    shipCoordinates.push([i, j]);
                    j--;

                    while (j > 0) {
                        if (board[i][j] == 'O' || board[i][j] == current) {
                            break;
                        }
                        else if (xFound == false && board[i][j] == expectedEnd) {
                            break;
                        }
                        else if (xFound == false && board[i][j] == 'X') {
                            xFound = true;
                            countOfX++;
                            shipCoordinates.push([i, j]);
                            j--;
                        }
                        else if (xFound == true && board[i][j] == 'X') {
                            countOfX++;
                            if (countOfX > 3) {
                                break;
                            }
                            shipCoordinates.push([i, j]);
                            j--;
                        }
                        else if (xFound == true && board[i][j] == expectedEnd) {
                            shipFound = true;
                            shipCoordinates.push([i, j]);
                            break;
                        }
                    }

                    return {
                        shipFound: shipFound,
                        shipCoordinates: shipCoordinates
                    };
                };

                function SearchUp(current, expectedEnd, rows, cols, i, j) {
                    var xFound = false;
                    var countOfX = 0;
                    var shipFound = false;
                    var shipCoordinates = [];
                    shipCoordinates.push([i, j]);
                    i--;

                    while (i > 0) {
                        if (board[i][j] == 'O' || board[i][j] == current) {
                            break;
                        }
                        else if (xFound == false && board[i][j] == expectedEnd) {
                            break;
                        }
                        else if (xFound == false && board[i][j] == 'X') {
                            xFound = true;
                            countOfX++;
                            shipCoordinates.push([i, j]);
                            i--;
                        }
                        else if (xFound == true && board[i][j] == 'X') {
                            countOfX++;
                            if (countOfX > 3) {
                                break;
                            }
                            shipCoordinates.push([i, j]);
                            i--;
                        }
                        else if (xFound == true && board[i][j] == expectedEnd) {
                            shipFound = true;
                            shipCoordinates.push([i, j]);
                            break;
                        }
                    }

                    return {
                        shipFound: shipFound,
                        shipCoordinates: shipCoordinates
                    };
                };



                function SearchDown(current, expectedEnd, rows, cols, i, j) {
                    var xFound = false;
                    var countOfX = 0;
                    var shipFound = false;
                    var shipCoordinates = [];
                    shipCoordinates.push([i, j]);
                    i++;

                    while (i < rows) {
                        if (board[i][j] == 'O' || board[i][j] == current) {
                            break;
                        }
                        else if (xFound == false && board[i][j] == expectedEnd) {
                            break;
                        }
                        else if (xFound == false && board[i][j] == 'X') {
                            xFound = true;
                            countOfX++;
                            shipCoordinates.push([i, j]);
                            i++;
                        }
                        else if (xFound == true && board[i][j] == 'X') {
                            countOfX++;
                            if (countOfX > 3) {
                                break;
                            }
                            shipCoordinates.push([i, j]);
                            i++;
                        }
                        else if (xFound == true && board[i][j] == expectedEnd) {
                            shipFound = true;
                            shipCoordinates.push([i, j]);
                            break;
                        }
                    }

                    return {
                        shipFound: shipFound,
                        shipCoordinates: shipCoordinates
                    };
                };
            })