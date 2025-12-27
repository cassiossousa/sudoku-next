/**
 * Let's imagine how a basic backtracking algorithm would work:
 * 
 * 1. You start at one of the grid's cells;
 * 2. Then you iterate in such a way that you traverse every cell just once, and you are also able to go back (backtrack) to a previous node;
 * 2.1. This is worded in order to traverse any type of grid;
 * 3. If the cell already has a value, you go to the next cell;
 * 4. If the cell is empty, you then try to fill it with a possible value for it;
 * 4.1. You immediately check if the value in the current cell is valid;
 * 4.2. If it is not valid, you try the next possible value for the current cell;
 * 4.3. If it is valid, you move to the next cell and do the same process;
 * 5. If you reach a cell whose possible values are all invalid, you backtrack to the previous cell and signal that its value is invalid;
 * 6. You repeat this process until you either fill the entire grid or exhaust all possibilities for the first "empty" cell;
 * 7. Return every filled grid you found (if any).
 */
function backtracking(grid) {

}

class SudokuGrid {
    grid = Array(9).fill(Array(9).fill(null));
}