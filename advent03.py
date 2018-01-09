'''
--- Day 3: Spiral Memory ---

You come across an experimental new kind of memory stored on an infinite 
two-dimensional grid.

Each square on the grid is allocated in a spiral pattern starting at a 
location marked 1 and then counting up while spiraling outward. For example, 
the first few squares are allocated like this:

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...
While this is very space-efficient (no squares are skipped), requested data 
must be carried back to square 1 (the location of the only access port for this 
  memory system) by programs that can only move up, down, left, or right. They 
  always take the shortest path: the Manhattan Distance between the location of
  the data and square 1.

For example:

Data from square 1 is carried 0 steps, since it's at the access port.
Data from square 12 is carried 3 steps, such as: down, left, left.
Data from square 23 is carried only 2 steps: up twice.
Data from square 1024 must be carried 31 steps.
How many steps are required to carry the data from the square identified 
in your puzzle input all the way to the access port?

--- Part Two ---

As a stress test on the system, the programs here clear the grid and then 
store the value 1 in square 1. Then, in the same allocation order as shown 
above, they store the sum of the values in all adjacent squares, including 
diagonals.

So, the first few squares' values are chosen as follows:

Square 1 starts with the value 1.
Square 2 has only one adjacent filled square (with value 1), so it also stores 1.
Square 3 has both of the above squares as neighbors and stores the sum of 
  their values, 2.
Square 4 has all three of the aforementioned squares as neighbors and stores 
  the sum of their values, 4.
Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.
Once a square is written, its value does not change. Therefore, the first few 
  squares would receive the following values:

147  142  133  122   59
304    5    4    2   57
330   10    1    1   54
351   11   23   25   26
362  747  806--->   ...
What is the first value written that is larger than your puzzle input?

'''

input = 361527

def hash(loc):
    return str(1000 * loc[0] + loc[1] + 5000)


def sum_of_adjacent_squares(squares, loc):
    locs = [[loc[0] - 1, loc[1] - 1], [loc[0], loc[1] - 1], [
        loc[0] + 1, loc[1] - 1
    ], [loc[0] - 1, loc[1]], [loc[0] + 1, loc[1]], [loc[0] - 1, loc[1] + 1],
            [loc[0], loc[1] + 1], [loc[0] + 1, loc[1] + 1]]
    return sum([squares.get(hash(l), 0) for l in locs])


def move(loc, direction):
    return [loc[0] + direction[0], loc[1] + direction[1]]


def solution2():
    directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    squares = {}
    loc = [0, 0]
    distance = 1
    direction_counter = 2
    direction_index = 0
    distance_counter = distance
    squares[hash(loc)] = 1
    # Start at center, move 1 square, turn left, move 1 square, turn left,
    #                  move 2 squares, turn left, move 2 squares, turn left,
    #                  move 3 squares, turn left, move 3 squares, turn left,
    # ....
    # Keep computing adjacent square sums until it exceeds input, then return
    # the last sum computed
    while sum_of_adjacent_squares(squares, loc) <= input:
        loc = move(loc, directions[direction_index])
        squares[hash(loc)] = sum_of_adjacent_squares(squares, loc)
        distance_counter -= 1
        if distance_counter == 0:
            direction_index = (direction_index + 1) % 4
            direction_counter -= 1
            if direction_counter == 0:
                direction_counter = 2
                distance += 1
            distance_counter = distance
    return sum_of_adjacent_squares(squares, loc)


def solution1():
    i = 1
    while i < input:
        corner = i * i
        if corner >= input:
            if corner == input:
                return 2 * int(i / 2)
            while corner >= input:
                corner -= i - 1
            return int(i / 2 + abs(corner + (i / 2) - input))
        i += 2


print(solution1())
print(solution2())
