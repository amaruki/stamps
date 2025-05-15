import math

numbers = list(range(1, 101))
reversed_numbers = numbers[::-1]

def is_prime(num):
    if num < 2:
        return False
    for i in range(2, int(math.sqrt(num)) + 1):
        if num % i == 0:
            return False
    return True

for i, num in enumerate(reversed_numbers, start=1):
    if is_prime(num):
        continue 
    
    if num % 3 == 0 and num % 5 == 0:
        print("fooBar", end=', ')
    elif num % 5 == 0:
        print("Bar", end=', ')
    elif num % 3 == 0:
        print("Foo", end=', ')
    else:
        print(f"{num}", end=', ')
    