'''
--- Day 4: High-Entropy Passphrases ---

A new system policy has been put in place that requires all accounts to 
use a passphrase instead of simply a password. A passphrase consists of a 
series of words (lowercase letters) separated by spaces.

To ensure security, a valid passphrase must contain no duplicate words.

For example:

aa bb cc dd ee is valid.
aa bb cc dd aa is not valid - the word aa appears more than once.
aa bb cc dd aaa is valid - aa and aaa count as different words.
The system's full passphrase list is available as your puzzle input. 
How many passphrases are valid?

--- Part Two ---

For added security, yet another system policy has been put in place. 
Now, a valid passphrase must contain no two words that are anagrams of 
each other - that is, a passphrase is invalid if any word's letters can 
be rearranged to form any other word in the passphrase.

For example:

abcde fghij is a valid passphrase.
abcde xyz ecdab is not valid - the letters from the third word can be 
  rearranged to form the first word.
a ab abc abd abf abj is a valid passphrase, because all letters need to 
  be used when forming another word.

iiii oiii ooii oooi oooo is valid.
oiii ioii iioi iiio is not valid - any of these words can be rearranged to 
  form any other word.
  
Under this new system policy, how many passphrases are valid?


'''

# words should be equal
def passwordTest1(word1, word2):
    return word1 == word2


# words should be anagrams -- just sort the letters and see that the sorted
# arrays are equal
def passwordTest2(word1, word2):
    return sorted(word1) == sorted(word2)

# Check validity of each password using the passed in test
def solution(input, test):
    sum = 0
    for i in range(len(input)):
        password = input[i]
        valid = True
        for j, v in enumerate(password[:-1]):
            for u in password[j + 1:]:
                if test(u, v):
                    valid = False
        if valid:
            sum += 1
    return sum


input_file = open("input04.txt", 'r')
lines = input_file.readlines()
input_file.close()
input = [l.strip().split(" ") for l in lines]
print(solution(input, passwordTest1))
print(solution(input, passwordTest2))
