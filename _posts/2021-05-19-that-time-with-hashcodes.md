---
title:  "That time with hash codes"
layout: post
excerpt: "A story about that time we messed by a simple A-B test."
---

Once upon a time, we wanted to do some A-B testing on one of the Uni's introductory programming courses. This involved splitting the students to two cohorts, one for "treatment" and the other to act as a baseline.

The students of the course were a mixture of degree students, open university students and people taking the course just for fun. Being lazy programmers, we figured we could simply divide the students into the treatment and control populations based on a hash of some of their attributes: this way we wouldn't have to change the database schema or store the split anywhere explicilty, but would still be able to figure out the split whenever we needed to. The simplest option seemed to be to use the unique usernames of the user accounts.

Now, the vast majority (I'd questimate over 95%) of the degree students had used their student ID as their username, as they were explicitly recommended to do. Similarly, a significant amount of the open university students had used their student ID as their username. The rest, those doing the course for fun, naturally had no such ID to use and thus used whatever username they fancied.

We didn't at the time see how this could be an issue and simply divided the population based on whether the Java hashCode of their username (as a String) was even or odd. This seemed like a sensible approach: after all, a good hash function splits the hash values evenly over the whole space of possible hash values.

To our surprise, we soon noticed that the populations were wildly different between the two groups. Almost all of our degree students had ended up in the treatment group and the population sizes were far from balanced. What on Earth was going on?

It turns out the way the student numbers were formed resulted in them all getting even hash codes when interpreted as Java strings.

## Checksums

The student numbers are simply running numbers padded with zeros in the front so that they are eight digits long. This number is then appended with a checksum, calculated from this running prefix. The checksum calculation is fairly simple: Take the individual digits of the prefix and multiply each, starting from the end, with 7, 3 or 1 in order. So the last digit gets multiplied by 7, the second to last by 3, the third to last 1, the fourth to last by 7 again and so on. In other words, the multipliers are aligned so that the last digit is always multiplied by 7. These numbers are then summed up to form a single number. The checksum if the distance from this number to the next multiplier of ten. So for example if the sum is 91, the checksum is 9 and if the sum is 75 the checksum is 5. If the sum is already divisible by 10, the checksum is zero.

Expressed a bit more mathematically, the checksum is

$$checksum(p) = \left\lceil \frac{s(p_{reverse})}{10} \right\rceil \times 10 - s(p_{reverse})$$

where $p_{reverse}$ is the prefix $p$ reversed, 

$$s(p) = \sum_{k=1}^{|p} p[k] \times multiplier(k\mod 3)$$

with $p[k]$ indicating the $k$'th digit of $p$ and

$$
  multiplier(x)=\begin{cases}
               7 \text{ if } x = 1\\
               3 \text{ if } x = 2\\
               1 \text{ if } x = 0
            \end{cases}.
$$

So for example, if the prefix was 01234321, then

$$p_{reversed} = 12343210$$

which gives us the weighted sum

$$s(p_{reversed}) = 1 \times 7 + 2 \times 3 + 3 \times 1 + 4 \times 7 + 3 \times 3 + 2 \times 1 + 1 \times 7 + 0 \times 3 = 62$$

which results in the checksum digit of

$$
\begin{split}
    checksum(p) &= \left\lceil \frac{s(p_{reverse})}{10} \right\rceil \times 10 - s(p_{reverse})\\
        &= \left\lceil \frac{62)}{10} \right\rceil \times 10 - 62\\
        &= \left\lceil 6.2 \right\rceil \times 10 - 62\\
        &= 7 \times 10 - 62\\
        &= 70 - 62\\
        &= 8\\
\end{split}
$$

Thus, the checksum is 8 and the complete student number would be 012343218.

## Java's String.hashCode()
Now, Java calculated hash codes for strings using the following equation:

$$h(s)=\sum_{i=0}^{n-1}s[i] \cdot 31^{n-1-i}$$

where $s[i]$ is the numeric value of $i$'th character (i.e. its place in the UTF-16 character tables) and $n$ is the length of the string. The artihmetics are done according to Java's rules for integers. For the numbers, the character values range from 48 for 0 to 57 for 9.

Now, if we calculate the checksums of the student ID prefixes only, that is the running number without the checksum, then the hash codes are well distributed and we get the same number of even and odd hash codes. But once the checksums are appended, we only get even hash codes.

In other words, the two equations above have a non-obvious interplay where the hash code of the checksum is odd **if and only if** the checksum of the complete prefix is odd. Thus the hash code of the total student ID is always even, as it's a sum of either two odd or two even numbers.

The exact mathematics of this phenomenon are, to be quite frank, beyond me. But we can trivially verify this phenomenon for the full range of student numbers using the following Java code:

```Java
public class Demo {

    public static int checksum(String prefix) {
        int[] numbers = new int[prefix.length()];
        for (int i = 0; i < prefix.length(); i++) {
            int idx = prefix.length() - 1 - i; 
            numbers[i] = Integer.parseInt(prefix.substring(idx, idx+1));
        }
        int sum = 0;
        int[] multipliers = {7, 3, 1};
        for (int i = 0; i < numbers.length; i++) {
            sum += multipliers[i%3] * numbers[i];
        }
        
        return (((sum + 9) / 10) * 10) - sum;
    }
    
    public static void main(String[] args) {
        for (int i = 0; i < 99999999; i++) {
            String num = String.format("%08d", i);
            int c = checksum(num);
            String complete = num + c;
            if (complete.hashCode() % 2 != 0) {
                System.out.println(complete + " is not even!"); //never reached
            }
        }
    }
}
```


Which is equivalent to this bit of (not very fast) python code:

```Python
def hashcode(s):
    # From http://garage.pimentech.net/libcommonPython_src_python_libcommon_javastringhashcode/
    h = 0
    for c in s:
        h = (31 * h + ord(c)) & 0xFFFFFFFF
    return ((h + 0x80000000) & 0xFFFFFFFF) - 0x80000000

def checksum(prefix):
    multipliers = [7,3,1]
    s = sum((int(char) * multipliers[idx%3] \
             for idx, char in enumerate(prefix[::-1])))
    return (s + 9) // 10 * 10 - s

any_odd = False
for i in range(100000000):
    prefix = '{:08d}'.format(i)
    c = checksum(prefix)
    student_id = prefix + str(c)
    if hashcode(student_id) %2 != 0:
        any_odd = True
        print(student_id, 'had odd checksum!')
print('All checked, any_odd={}'.format(any_odd)) # All checked, any_odd=False
```

So what did we learn? On a technical level, I suppose this is a nice example of accidentally botching up the distribution of hash codes. On a more methodological level, this highlights the fact that you really need to check your populations and whether they are different in any statitically significant sense and not just trusting that "obvious" things are truly correct.