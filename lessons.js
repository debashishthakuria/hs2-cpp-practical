/* Each code string is a separate Turbo C++ 3.0 program. Teach first, then copy. */
window.LESSONS = [
  {
    id: 1, title: "Perimeters with function overloading", topic: "Classes and overloaded member functions",
    prompt: "Create a class Shape and overload a function to return the 'parameters' of different shapes.",
    interpretation: "The sheet says 'parameters', which could mean dimensions or perimeter. This lesson interprets it as PERIMETER: the distance around a square, rectangle, and circle. Ask your teacher if dimensions were intended.",
    learn: [
      {heading: "One name, different arguments", text: "An overloaded function keeps the same name but has different parameter lists. Here perimeter(int), perimeter(int,int), and perimeter(float) are selected by the number and type of arguments."},
      {heading: "What is perimeter?", text: "A square has 4 times its side, a rectangle has 2 times (length + breadth), and a circle has 2 times pi times radius. All lengths use the same unit."},
      {heading: "Why use float for a circle?", text: "A radius may be fractional; passing 2.5f selects the float overload. The f suffix prevents accidentally selecting the integer square overload."}
    ],
    algorithm: ["Declare a Shape class with three public perimeter functions.", "Use int side for the square and two ints for the rectangle.", "Use float radius and a decimal approximation of pi for the circle.", "Read the dimensions and call each overload with matching argument types.", "Print the three returned perimeters."],
    example: {input: "Square side 4; rectangle length 5 breadth 3; circle radius 2.5", output: "Square: 16; Rectangle: 16; Circle: 15.7", walkthrough: "4*4=16; 2*(5+3)=16; 2*3.14*2.5=15.7."},
    code: String.raw`#include <iostream.h>
#include <conio.h>
class Shape {
public:
    int perimeter(int side) { return 4 * side; }
    int perimeter(int length, int breadth) {
        return 2 * (length + breadth);
    }
    float perimeter(float radius) { return 2 * 3.14f * radius; }
};
void main() {
    clrscr();
    Shape s;
    int side, length, breadth;
    float radius;
    cout << "Side: "; cin >> side;
    cout << "Length and breadth: "; cin >> length >> breadth;
    cout << "Radius: "; cin >> radius;
    if (side < 0 || length < 0 || breadth < 0 || radius < 0) {
        cout << "Dimensions must not be negative.";
        getch(); return;
    }
    cout << "Square: " << s.perimeter(side) << "\n";
    cout << "Rectangle: " << s.perimeter(length, breadth) << "\n";
    cout << "Circle: " << s.perimeter(radius) << "\n";
    getch();
}`,
    breakdown: [{line: "#include <iostream.h> and <conio.h>", meaning: "Provide cin/cout and the Turbo screen/keyboard functions."}, {line: "class Shape { public:", meaning: "Groups the three operations and lets main call them."}, {line: "perimeter(int side)", meaning: "One integer argument identifies the square version; returns 4 times side."}, {line: "perimeter(int length, int breadth)", meaning: "Two integer arguments identify the rectangle version."}, {line: "perimeter(float radius)", meaning: "One float selects the circle version; 3.14f approximates pi."}, {line: "if (side < 0 ...)", meaning: "Reject impossible negative dimensions before doing geometry."}, {line: "s.perimeter(...)", meaning: "Compiler chooses a version from the arguments, not from the return type."}, {line: "getch();", meaning: "Keeps the result visible in a Turbo C++ DOS window."}],
    tryIt: "For side 3, rectangle 4 by 2, and radius 1, what prints?", check: "Square 12; Rectangle 12; Circle 6.28.", pitfalls: ["Do not claim the photographed word 'parameters' definitely means perimeter.", "Do not overload by return type alone.", "Pass a float to the circle version, not an int."]
  },
  {
    id: 2, title: "Add three numeric types", topic: "Function overloading",
    prompt: "Find the sum of integer, float and double numbers using function overloading.",
    learn: [{heading: "Overloading", text: "Three add functions have the same name but accept int, float, or double pairs. The types at a call site choose the correct function."}, {heading: "Precision", text: "An int stores whole numbers; float stores approximate decimal values; double usually has more precision than float."}, {heading: "Matching arguments", text: "Read into variables of the intended type and call add with two variables of that same type. Return types alone cannot distinguish overloads."}],
    algorithm: ["Define three add functions, one for each type.", "Read two integers, two floats, and two doubles.", "Call the corresponding overloaded function for each pair.", "Print the three sums with labels."],
    example: {input: "2 3 / 1.5 2.25 / 0.1 0.2", output: "Integer sum: 5; Float sum: 3.75; Double sum: approximately 0.3", walkthrough: "The first pair uses int arithmetic; the others use their declared floating-point types. Decimal fractions are approximate in binary."},
    code: String.raw`#include <iostream.h>
#include <conio.h>
int add(int a, int b) { return a + b; }
float add(float a, float b) { return a + b; }
double add(double a, double b) { return a + b; }
void main() {
    clrscr();
    int i, j;
    float f, g;
    double d, e;
    cout << "Two integers: "; cin >> i >> j;
    cout << "Two floats: "; cin >> f >> g;
    cout << "Two doubles: "; cin >> d >> e;
    cout << "Integer sum: " << add(i, j) << "\n";
    cout << "Float sum: " << add(f, g) << "\n";
    cout << "Double sum: " << add(d, e) << "\n";
    getch();
}`,
    breakdown: [{line: "#include <iostream.h>", meaning: "Makes console input and output available in Turbo C++."}, {line: "#include <conio.h>", meaning: "Provides clrscr and getch in Turbo C++."}, {line: "int add(int a, int b)", meaning: "Adds whole numbers and returns an int."}, {line: "float add(float a, float b)", meaning: "Accepts two float arguments and returns float."}, {line: "double add(double a, double b)", meaning: "Accepts two double arguments and returns double."}, {line: "int i,j; float f,g; double d,e;", meaning: "Keep each pair's types distinct so overload selection is clear."}, {line: "add(i,j), add(f,g), add(d,e)", meaning: "The compiler picks the overload from argument types."}, {line: "getch();", meaning: "Waits for a key in the DOS console."}],
    tryIt: "Which add is called by add(f,g) when f and g are float?", check: "add(float,float), even if the entered numbers look whole.", pitfalls: ["An overload needs different parameters; a changed return type is insufficient.", "Floating-point output can be rounded."]
  },
  {
    id: 3, title: "Records of three students", topic: "Array of objects",
    prompt: "Enter and display the details (name, roll number and grade) of three students using an array of objects.",
    learn: [{heading: "Objects as records", text: "Each Student object keeps one person's name, roll number and grade together. An array holds exactly three such objects."}, {heading: "Private data", text: "Members are private by default in a class. Public read and show methods control access to each student's fields."}, {heading: "Names with spaces", text: "cin.getline reads an entire name. After extracting a number, cin.ignore removes its pending newline so the next getline does not read an empty name."}],
    algorithm: ["Define a Student class with fixed-length name and grade arrays and an integer roll number.", "Make methods to read and display one record.", "Create Student students[3].", "Loop through all three objects to read details.", "Loop again to display each record."],
    example: {input: "Asha Das / 1 / A; Ravi Sen / 2 / B; Mina Roy / 3 / A", output: "Asha Das 1 A; Ravi Sen 2 B; Mina Roy 3 A", walkthrough: "Each input group fills a different Student object, preserving order in the array."},
    code: String.raw`#include <iostream.h>
#include <conio.h>
class Student {
    char name[40], grade[10];
    int roll;
public:
    void read() {
        cout << "Name: "; cin.getline(name, 40);
        cout << "Roll number: "; cin >> roll;
        cin.ignore(100, '\n');
        cout << "Grade: "; cin.getline(grade, 10);
    }
    void show() {
        cout << "Name: " << name << " Roll: " << roll
             << " Grade: " << grade << "\n";
    }
};
void main() {
    clrscr();
    Student students[3];
    int i;
    for (i = 0; i < 3; i++) {
        cout << "Student " << i + 1 << "\n";
        students[i].read();
    }
    for (i = 0; i < 3; i++) students[i].show();
    getch();
}`,
    breakdown: [{line: "char name[40], grade[10]; int roll;", meaning: "These fields belong to each student; arrays reserve room including a terminating zero."}, {line: "public:", meaning: "Makes read and show callable from main while fields stay private."}, {line: "cin.getline(name,40)", meaning: "Reads a name including spaces, at most 39 characters."}, {line: "cin >> roll; cin.ignore(100,'\\n');", meaning: "Reads the roll and consumes the newline before reading the grade."}, {line: "Student students[3];", meaning: "Constructs exactly three records, indexed 0, 1, 2."}, {line: "for (i=0;i<3;i++) students[i].read();", meaning: "Fills each object's own fields."}, {line: "students[i].show();", meaning: "Displays the matching record without mixing students."}],
    tryIt: "Why is the index for the third student 2?", check: "C++ array indexing begins at 0: the three indices are 0, 1 and 2.", pitfalls: ["Names longer than 39 characters are truncated and may leave input unread.", "Remember to remove the newline after numeric input."]
  },
  {
    id: 4, title: "Employee net salaries", topic: "Classes, arrays, and percentage arithmetic",
    prompt: "Find the net salary of N employees if DA is 52%, IT is 30% and HRA is 2% of basic salary.",
    interpretation: "IT is treated as a deduction equal to 30% of BASIC, just like the specified DA and HRA percentages. Thus net = basic + DA + HRA - IT.",
    learn: [{heading: "Percent means per hundred", text: "For a basic salary B, DA = 0.52B, HRA = 0.02B and IT = 0.30B. Compute each amount before calculating net."}, {heading: "Earnings versus deduction", text: "DA and HRA are added to basic; income tax is subtracted. The resulting net is 1.24 times basic under this interpretation."}, {heading: "Bounded object array", text: "This DOS-era example stores at most ten employees. Reject an invalid N before filling the array."}],
    algorithm: ["Define an Employee object with basic pay and an ID.", "Read N and ensure it is from 1 to 10.", "Read each employee's ID and nonnegative basic salary.", "Calculate DA, HRA and IT as percentages of basic.", "Print each employee's net salary."],
    example: {input: "N=1; ID=7; basic=1000", output: "Employee 7 net salary: 1240", walkthrough: "DA=520, HRA=20, IT=300; 1000+520+20-300=1240."},
    code: String.raw`#include <iostream.h>
#include <conio.h>
class Employee {
    int id;
    float basic;
public:
    void read() {
        cout << "ID and basic salary: "; cin >> id >> basic;
    }
    float net() {
        float da = basic * 0.52f;
        float hra = basic * 0.02f;
        float it = basic * 0.30f;
        return basic + da + hra - it;
    }
    float pay() { return basic; }
    int number() { return id; }
};
void main() {
    clrscr();
    Employee e[10];
    int n, i;
    cout << "Number of employees (1-10): "; cin >> n;
    if (n < 1 || n > 10) { cout << "Invalid count."; getch(); return; }
    for (i = 0; i < n; i++) {
        e[i].read();
        if (e[i].pay() < 0) { cout << "Invalid salary."; getch(); return; }
    }
    for (i = 0; i < n; i++)
        cout << "Employee " << e[i].number() << " net salary: " << e[i].net() << "\n";
    getch();
}`,
    breakdown: [{line: "int id; float basic;", meaning: "Stores identity and base pay inside each employee object."}, {line: "e[10]", meaning: "Reserves ten objects; N must not exceed this capacity."}, {line: "if (n<1 || n>10)", meaning: "Prevents out-of-bounds indexing and empty processing."}, {line: "basic * 0.52f", meaning: "Computes DA as 52 percent of basic, not of gross."}, {line: "basic * 0.02f / 0.30f", meaning: "Computes HRA and IT separately from basic."}, {line: "return basic + da + hra - it;", meaning: "Adds allowances and subtracts tax."}, {line: "e[i].pay() < 0", meaning: "Rejects a negative base salary."}, {line: "for (i=0;i<n;i++)", meaning: "Prints one result per employee."}],
    tryIt: "If basic is 2000, how much IT is deducted and what is net?", check: "IT=600; net=2480.", pitfalls: ["Do not add income tax to salary.", "Do not compute the percentages of gross pay unless your teacher changes the specification.", "Floating-point money is illustrative, not suitable for payroll accounting."]
  },
  {
    id: 5, title: "Alphabetical student names", topic: "Objects and string comparison",
    prompt: "Write an OOP program to arrange entries in alphabetical order.",
    interpretation: "The sheet does not name what must be sorted. This example chooses STUDENT NAMES, using one object per name; ask your teacher if a different object was intended.",
    learn: [{heading: "Lexicographic order", text: "strcmp compares two zero-terminated char arrays. A positive result means the first comes later and should be swapped."}, {heading: "Swapping objects", text: "Instead of moving individual characters, assign a temporary Student object to swap whole records."}, {heading: "Case matters", text: "strcmp compares character codes: uppercase and lowercase are not equivalent. Enter names with consistent capitalization for expected school-style order."}],
    algorithm: ["Read a count from 1 to 10.", "Read one student name into each object.", "Compare each pair with strcmp.", "Swap entire objects when an earlier name is greater.", "Print names in the resulting order."],
    example: {input: "3 / Ravi / Asha / Mina", output: "Asha / Mina / Ravi", walkthrough: "Comparisons move Asha before Ravi, then place Mina between Asha and Ravi."},
    code: String.raw`#include <iostream.h>
#include <conio.h>
#include <string.h>
class Student {
public:
    char name[40];
    void read() { cin.getline(name, 40); }
    void show() { cout << name << "\n"; }
};
void main() {
    clrscr();
    Student s[10], temp;
    int n, i, j;
    cout << "Number of students (1-10): "; cin >> n;
    if (n < 1 || n > 10) { cout << "Invalid count."; getch(); return; }
    cin.ignore(100, '\n');
    for (i = 0; i < n; i++) {
        cout << "Name " << i + 1 << ": "; s[i].read();
    }
    for (i = 0; i < n - 1; i++)
        for (j = i + 1; j < n; j++)
            if (strcmp(s[i].name, s[j].name) > 0) {
                temp = s[i]; s[i] = s[j]; s[j] = temp;
            }
    cout << "Alphabetical order:\n";
    for (i = 0; i < n; i++) s[i].show();
    getch();
}`,
    breakdown: [{line: "#include <string.h>", meaning: "Declares strcmp for comparing C-style strings."}, {line: "class Student", meaning: "Wraps a name and the operations to read and display it."}, {line: "Student s[10], temp;", meaning: "Stores up to ten student objects and a swap placeholder."}, {line: "cin.ignore(100,'\\n');", meaning: "Removes the newline after the count so getline reads the first name."}, {line: "j = i + 1", meaning: "Compares each name only with later entries."}, {line: "strcmp(s[i].name,s[j].name)>0", meaning: "True when the earlier entry should come after the later one."}, {line: "temp=s[i]; ...", meaning: "Swaps whole objects without losing either name."}, {line: "s[i].show();", meaning: "Prints the final sequence."}],
    tryIt: "What does strcmp(a,b)>0 mean for the chosen order?", check: "a belongs after b, so swap them.", pitfalls: ["Alphabetical ordering is case-sensitive here.", "The object being sorted is an explicit interpretation, not stated on the sheet.", "Only enter up to 39 characters per name."]
  },
  {
    id: 6, title: "Smallest number through a constructor", topic: "Parameterized constructors",
    prompt: "Find the smallest number using a constructor.",
    interpretation: "The sheet does not specify how many numbers; this example compares three numbers supplied to a parameterized constructor.",
    learn: [{heading: "Constructor timing", text: "A constructor has the class name and no return type. It runs automatically when an object is created."}, {heading: "Keep a running minimum", text: "Start with the first number, then replace it whenever a smaller value appears."}, {heading: "Initialization and display", text: "The constructor computes and stores the result; a separate public method prints it. This makes the object's state available later."}],
    algorithm: ["Read three integers.", "Create a Smallest object using those values.", "Inside its constructor, initialize minimum with the first value.", "Compare the other two and update minimum as needed.", "Print the stored minimum."],
    example: {input: "8 -2 5", output: "Smallest: -2", walkthrough: "Start at 8; replace with -2; 5 is not smaller."},
    code: String.raw`#include <iostream.h>
#include <conio.h>
class Smallest {
    int minimum;
public:
    Smallest(int a, int b, int c) {
        minimum = a;
        if (b < minimum) minimum = b;
        if (c < minimum) minimum = c;
    }
    void show() { cout << "Smallest: " << minimum << "\n"; }
};
void main() {
    clrscr();
    int a, b, c;
    cout << "Three integers: "; cin >> a >> b >> c;
    Smallest result(a, b, c);
    result.show();
    getch();
}`,
    breakdown: [{line: "int minimum;", meaning: "Stores the answer in private object state."}, {line: "Smallest(int a,int b,int c)", meaning: "This parameterized constructor runs as result is created."}, {line: "minimum = a;", meaning: "First value is the initial candidate, including when values are negative."}, {line: "if (b < minimum)", meaning: "Replaces the candidate only if b is smaller."}, {line: "if (c < minimum)", meaning: "Checks the last number against the current minimum."}, {line: "Smallest result(a,b,c);", meaning: "Creates the object and invokes its constructor with inputs."}, {line: "result.show();", meaning: "Displays the previously computed value."}],
    tryIt: "What is stored for 4, 4, 7?", check: "4; equal values need no replacement.", pitfalls: ["Do not write a return type on a constructor.", "Do not compare only the first and last values."]
  },
  {
    id: 7, title: "Add complex numbers", topic: "Classes and object operations",
    prompt: "Find the sum of two complex numbers using a class.",
    learn: [{heading: "Two parts", text: "A complex number has real and imaginary parts: a + bi. Store each part in its own field."}, {heading: "Component-wise addition", text: "Add real parts to real parts and imaginary parts to imaginary parts; (a+bi)+(c+di)=(a+c)+(b+d)i."}, {heading: "Object result", text: "A member method receives another Complex object and returns a third object. Neither input needs to be overwritten."}],
    algorithm: ["Define a Complex class with real and imaginary fields.", "Read the first number as two components.", "Read the second number the same way.", "Add corresponding components into a result object.", "Display the result with a sign for its imaginary component."],
    example: {input: "First: 2 3; second: 4 -5", output: "Sum: 6 - 2i", walkthrough: "Real: 2+4=6; imaginary: 3+(-5)=-2."},
    code: String.raw`#include <iostream.h>
#include <conio.h>
class Complex {
    float real, imag;
public:
    void read() {
        cout << "Real and imaginary parts: "; cin >> real >> imag;
    }
    Complex add(Complex other) {
        Complex result;
        result.real = real + other.real;
        result.imag = imag + other.imag;
        return result;
    }
    void show() {
        cout << "Sum: " << real;
        if (imag < 0) cout << " - " << -imag << "i\n";
        else cout << " + " << imag << "i\n";
    }
};
void main() {
    clrscr();
    Complex first, second, sum;
    first.read(); second.read();
    sum = first.add(second);
    sum.show();
    getch();
}`,
    breakdown: [{line: "float real, imag;", meaning: "Keeps the two mathematically distinct components together."}, {line: "void read()", meaning: "Gets two numeric components per number."}, {line: "Complex add(Complex other)", meaning: "Takes another object and promises a Complex result."}, {line: "result.real = real + other.real;", meaning: "Adds real parts only."}, {line: "result.imag = imag + other.imag;", meaning: "Adds imaginary parts only."}, {line: "return result;", meaning: "Hands the new object to main without changing either input."}, {line: "sum = first.add(second);", meaning: "Uses the first object as this and passes the second."}, {line: "if (imag < 0)", meaning: "Formats a negative imaginary part as subtraction rather than '+ -'."}],
    tryIt: "Find (1+2i)+(3-4i).", check: "4 - 2i.", pitfalls: ["Do not add real to imaginary parts.", "The letter i in output is notation, not a C++ variable."]
  },
  {
    id: 8, title: "Factorial calculated by a constructor", topic: "Constructors and loops",
    prompt: "Find the factorial of a number using a constructor.",
    learn: [{heading: "Definition", text: "n! is 1*2*...*n; 0! is defined as 1. Negative integers do not have this factorial."}, {heading: "Constructor work", text: "The constructor starts the product at 1 and multiplies up to n; show() displays the saved result."}, {heading: "Old compiler limit", text: "A typical Turbo C++ long is signed 32-bit. 12! fits; 13! does not. Reject values outside 0..12."}],
    algorithm: ["Read integer n.", "Reject n less than 0 or greater than 12.", "Construct a Factorial object with n.", "Initialize product to 1 and multiply from 2 through n.", "Display the stored product."],
    example: {input: "5", output: "Factorial: 120", walkthrough: "1*2*3*4*5=120. For 0, the loop has no iterations and the result stays 1."},
    code: String.raw`#include <iostream.h>
#include <conio.h>
class Factorial {
    long value;
public:
    Factorial(int n) {
        value = 1;
        for (int i = 2; i <= n; i++) value *= i;
    }
    void show() { cout << "Factorial: " << value << "\n"; }
};
void main() {
    clrscr();
    int n;
    cout << "Number (0-12): "; cin >> n;
    if (n < 0 || n > 12) { cout << "Out of range."; getch(); return; }
    Factorial result(n);
    result.show();
    getch();
}`,
    breakdown: [{line: "long value;", meaning: "Stores the product, larger than a typical 16-bit Turbo int."}, {line: "Factorial(int n)", meaning: "Automatically computes factorial when the object is built."}, {line: "value = 1;", meaning: "Multiplication identity also gives the correct answer for 0!."}, {line: "for (int i=2; i<=n; i++)", meaning: "Multiplies every required factor once."}, {line: "if (n<0 || n>12)", meaning: "Avoids undefined negative factorial and signed 32-bit long overflow."}, {line: "Factorial result(n);", meaning: "Passes validated n to the constructor."}, {line: "result.show();", meaning: "Displays the constructor's result."}],
    tryIt: "What does this print for n=0 and why?", check: "1, because value begins at 1 and the loop never runs.", pitfalls: ["13! overflows a signed 32-bit long.", "Factorial is not defined here for negative input."]
  },
  {
    id: 9, title: "Fibonacci terms through a constructor", topic: "Constructors and sequences",
    prompt: "Display N terms of the Fibonacci series using a constructor.",
    interpretation: "This example starts the series at 0, 1 (some textbooks start at 1, 1). N is the number of terms, not the largest term.",
    learn: [{heading: "Recurrence", text: "Start with 0 and 1. Every following term is the sum of the previous two."}, {heading: "Constructor output", text: "Constructing Fibonacci(n) prints exactly n terms. This is an exercise in constructor timing, although a display method would usually be preferable in larger programs."}, {heading: "Upper bound", text: "Although F(46) fits in signed 32-bit long, updating the two-term window to print it would first compute F(47), which overflows. This simple implementation safely prints at most 46 terms (F(0) through F(45))."}],
    algorithm: ["Read N and require 1..46.", "Construct a Fibonacci object with N.", "Initialize the previous two terms to 0 and 1.", "Print the current term each iteration.", "Advance the pair by adding them, except after the final print."],
    example: {input: "7", output: "0 1 1 2 3 5 8", walkthrough: "After the initial 0 and 1, each printed term comes from adding the preceding pair."},
    code: String.raw`#include <iostream.h>
#include <conio.h>
class Fibonacci {
public:
    Fibonacci(int n) {
        long a = 0, b = 1, next;
        int i;
        cout << "Fibonacci: ";
        for (i = 0; i < n; i++) {
            cout << a << " ";
            if (i < n - 1) {
                next = a + b;
                a = b;
                b = next;
            }
        }
        cout << "\n";
    }
};
void main() {
    clrscr();
    int n;
    cout << "Terms (1-46): "; cin >> n;
    if (n < 1 || n > 46) { cout << "Out of range."; getch(); return; }
    Fibonacci series(n);
    getch();
}`,
    breakdown: [{line: "Fibonacci(int n)", meaning: "Constructor executes as series is created."}, {line: "long a=0,b=1,next;", meaning: "Stores the current, next and temporary terms using Turbo's 32-bit long."}, {line: "for (i=0;i<n;i++)", meaning: "Runs exactly once per requested term."}, {line: "cout << a", meaning: "Prints current term before changing it."}, {line: "if (i<n-1)", meaning: "Avoids an unnecessary final addition on the 46th term."}, {line: "next=a+b; a=b; b=next;", meaning: "Shifts the two-term window one place forward; 47 terms would compute an overflowing extra value."}, {line: "if (n<1 || n>46)", meaning: "Rejects empty requests and a count whose intermediate addition would overflow signed 32-bit long."}],
    tryIt: "What are the first five terms in this version?", check: "0 1 1 2 3.", pitfalls: ["N counts terms; it is not a maximum value.", "Specify whether a question starts at 0,1 or 1,1."]
  },
  {
    id: 10, title: "Single inheritance", topic: "Base and derived classes",
    prompt: "Write a program to demonstrate single inheritance.",
    interpretation: "The sheet specifies the inheritance pattern but not a scenario; this example uses Person as a base class and Student as its one derived class.",
    learn: [{heading: "One parent class", text: "Single inheritance means one derived class inherits from one base class. Student inherits the accessible members of Person."}, {heading: "Protected fields", text: "A protected field is available to derived methods but not directly to main. This allows Student to use the inherited name."}, {heading: "Public inheritance", text: "The declaration class Student : public Person preserves public base methods as public on Student objects."}],
    algorithm: ["Define Person with a protected name and public input/display methods.", "Define Student as a public child of Person with a private roll number.", "Read the name using an inherited method.", "Read the roll number using Student's method.", "Print inherited name and derived roll number."],
    example: {input: "Asha Das / 12", output: "Name: Asha Das; Roll: 12", walkthrough: "The Student object stores its Person name and its own roll number."},
    code: String.raw`#include <iostream.h>
#include <conio.h>
class Person {
protected:
    char name[40];
public:
    void readName() { cout << "Name: "; cin.getline(name, 40); }
    void showName() { cout << "Name: " << name << "\n"; }
};
class Student : public Person {
    int roll;
public:
    void readRoll() { cout << "Roll: "; cin >> roll; }
    void showRoll() { cout << "Roll: " << roll << "\n"; }
};
void main() {
    clrscr();
    Student s;
    s.readName();
    s.readRoll();
    s.showName();
    s.showRoll();
    getch();
}`,
    breakdown: [{line: "class Person", meaning: "Introduces the single base class."}, {line: "protected: char name[40];", meaning: "Name is inherited and available to child methods, not to main directly."}, {line: "readName() / showName()", meaning: "Base class owns the input/output of the shared name."}, {line: "class Student : public Person", meaning: "Defines exactly one child inheriting publicly from Person."}, {line: "int roll;", meaning: "Student adds its own new data beyond Person."}, {line: "Student s;", meaning: "Creates a derived object containing both base and derived parts."}, {line: "s.readName(); s.readRoll();", meaning: "Calls inherited and child methods on the same object."}, {line: "s.showName(); s.showRoll();", meaning: "Proves both sets of behavior are accessible."}],
    tryIt: "Which class owns readName and which owns readRoll?", check: "Person owns readName; Student owns readRoll and inherits readName.", pitfalls: ["Public inheritance does not make private base fields directly accessible.", "This is one parent and one child, not multiple inheritance."]
  },
  {
    id: 11, title: "Matrix sum and product", topic: "Two-dimensional arrays and matrix operations",
    prompt: "Find the sum and product of two matrices.",
    learn: [{heading: "Addition dimensions", text: "A+B is possible only if A and B have the same number of rows and columns. Add entries in matching positions."}, {heading: "Multiplication dimensions", text: "A(r1 by c1) times B(r2 by c2) is possible only when c1=r2; the result has r1 rows and c2 columns."}, {heading: "Dot product", text: "Each product cell C[i][j] accumulates A[i][k]*B[k][j] over k. Set the cell to zero before adding terms."}],
    algorithm: ["Read both matrix dimensions, each at most 3 by 3.", "Read all entries of A and B.", "If dimensions match exactly, print element-wise sum; otherwise explain it is unavailable.", "If A's columns equal B's rows, compute each product cell with an inner k loop.", "Print the product or its incompatibility message."],
    example: {input: "Both 2x2: A=[1 2;3 4], B=[5 6;7 8]", output: "Sum=[6 8;10 12]; Product=[19 22;43 50]", walkthrough: "Product top left = 1*5+2*7=19; top right=1*6+2*8=22. Addition uses corresponding positions."},
    code: String.raw`#include <iostream.h>
#include <conio.h>
void main() {
    clrscr();
    int a[3][3], b[3][3], c[3][3];
    int r1, c1, r2, c2, i, j, k;
    cout << "Rows and columns of A (1-3): "; cin >> r1 >> c1;
    cout << "Rows and columns of B (1-3): "; cin >> r2 >> c2;
    if (r1 < 1 || r1 > 3 || c1 < 1 || c1 > 3 ||
        r2 < 1 || r2 > 3 || c2 < 1 || c2 > 3) {
        cout << "Invalid dimensions."; getch(); return;
    }
    cout << "Enter A row by row:\n";
    for (i = 0; i < r1; i++) for (j = 0; j < c1; j++) cin >> a[i][j];
    cout << "Enter B row by row:\n";
    for (i = 0; i < r2; i++) for (j = 0; j < c2; j++) cin >> b[i][j];
    if (r1 == r2 && c1 == c2) {
        cout << "Sum:\n";
        for (i = 0; i < r1; i++) {
            for (j = 0; j < c1; j++) cout << a[i][j] + b[i][j] << " ";
            cout << "\n";
        }
    } else cout << "Sum not possible.\n";
    if (c1 == r2) {
        for (i = 0; i < r1; i++)
            for (j = 0; j < c2; j++) {
                c[i][j] = 0;
                for (k = 0; k < c1; k++) c[i][j] += a[i][k] * b[k][j];
            }
        cout << "Product:\n";
        for (i = 0; i < r1; i++) {
            for (j = 0; j < c2; j++) cout << c[i][j] << " ";
            cout << "\n";
        }
    } else cout << "Product not possible.\n";
    getch();
}`,
    breakdown: [{line: "int a[3][3], b[3][3], c[3][3];", meaning: "Fixed-size storage for two inputs and the product."}, {line: "if (r1<1 ... c2>3)", meaning: "Prevents invalid dimensions from indexing outside the arrays."}, {line: "for (i...) for (j...) cin >> a[i][j]", meaning: "Reads each input matrix row by row."}, {line: "if (r1==r2 && c1==c2)", meaning: "Addition requires identical dimensions, independently of multiplication."}, {line: "a[i][j] + b[i][j]", meaning: "Adds matching cells; no inner k loop needed."}, {line: "if (c1==r2)", meaning: "Checks the inner dimensions before multiplying."}, {line: "c[i][j]=0;", meaning: "Resets each product cell before accumulation."}, {line: "c[i][j]+=a[i][k]*b[k][j]", meaning: "Computes one dot product across A's row and B's column."}],
    tryIt: "Can a 2x3 matrix and 3x2 matrix be added or multiplied?", check: "They cannot be added; the product exists and has size 2x2.", pitfalls: ["Do not assume addition and multiplication have the same dimension rule.", "Large input values can overflow int, especially a 16-bit Turbo int."]
  },
  {
    id: 12, title: "Bubble and insertion sorting", topic: "Sorting algorithms",
    prompt: "Sort elements using Bubble sort, Insertion sort and a third sorting method not named in the photographed line.",
    interpretation: "Only Bubble sort and Insertion sort are legible/named; the THIRD algorithm is unspecified. This program implements only those two and does not invent a third. Confirm the missing name with your teacher.",
    learn: [{heading: "Bubble sort", text: "Compare adjacent entries and swap when out of order. After each pass, the greatest unsorted entry reaches its final position."}, {heading: "Insertion sort", text: "Treat the left portion as sorted; save the next value, shift larger entries right, then insert it into the gap."}, {heading: "Fair comparison", text: "Make two copies of the same original numbers. Otherwise insertion sort would receive bubble sort's already-sorted output."}],
    algorithm: ["Read 1..20 integers into two arrays.", "Apply bubble sort using adjacent comparisons and swaps to the first array.", "Apply insertion sort by shifting larger preceding entries in the second array.", "Print both sorted arrays.", "Do not claim a third algorithm without its name."],
    example: {input: "5 / 4 1 3 2 5", output: "Bubble: 1 2 3 4 5; Insertion: 1 2 3 4 5", walkthrough: "Both independently reorder the same original values in ascending order."},
    code: String.raw`#include <iostream.h>
#include <conio.h>
void main() {
    clrscr();
    int bubble[20], insert[20];
    int n, i, j, temp, key;
    cout << "Count (1-20): "; cin >> n;
    if (n < 1 || n > 20) { cout << "Invalid count."; getch(); return; }
    cout << "Enter numbers: ";
    for (i = 0; i < n; i++) {
        cin >> bubble[i]; insert[i] = bubble[i];
    }
    for (i = 0; i < n - 1; i++)
        for (j = 0; j < n - 1 - i; j++)
            if (bubble[j] > bubble[j + 1]) {
                temp = bubble[j]; bubble[j] = bubble[j + 1]; bubble[j + 1] = temp;
            }
    for (i = 1; i < n; i++) {
        key = insert[i];
        j = i - 1;
        while (j >= 0 && insert[j] > key) {
            insert[j + 1] = insert[j]; j--;
        }
        insert[j + 1] = key;
    }
    cout << "Bubble: ";
    for (i = 0; i < n; i++) cout << bubble[i] << " ";
    cout << "\nInsertion: ";
    for (i = 0; i < n; i++) cout << insert[i] << " ";
    cout << "\n";
    getch();
}`,
    breakdown: [{line: "bubble[20], insert[20]", meaning: "Two independent copies make both sorting algorithms visible."}, {line: "if (n<1 || n>20)", meaning: "Rejects counts that would exceed either array."}, {line: "insert[i]=bubble[i];", meaning: "Copies original input before either algorithm changes it."}, {line: "j<n-1-i", meaning: "Bubble sort omits the already-settled tail after each pass."}, {line: "bubble[j]>bubble[j+1]", meaning: "An adjacent inversion requires a swap."}, {line: "key=insert[i]; j=i-1;", meaning: "Saves the next value and begins scanning the sorted prefix."}, {line: "while (j>=0 && insert[j]>key)", meaning: "Moves larger values right without reading before index 0."}, {line: "insert[j+1]=key;", meaning: "Places the saved value into its final gap."}],
    tryIt: "Why copy the input into two arrays?", check: "So each algorithm sorts the original unsorted values independently.", pitfalls: ["The third sort's name is absent; do not pass off an invented one as the assignment.", "With Turbo C++ use small integer inputs to avoid 16-bit int overflow."]
  },
  {
    id: 13, title: "Create, display and modify a text file", topic: "File streams",
    prompt: "Create a text file, display its contents and modify it.",
    interpretation: "'Modify' has no specified operation; this lesson modifies NOTES.TXT by APPENDING one line, then displays the updated contents. Appending preserves existing lines rather than replacing a particular line.",
    learn: [{heading: "Output file", text: "ofstream opens NOTES.TXT to create it (or overwrite an existing file). Always close it before reopening for reading."}, {heading: "Input file", text: "ifstream and getline read one line at a time; testing the read result prevents an extra duplicate line at end-of-file."}, {heading: "Append mode", text: "ios::app opens the same file for writing at the end. This is the chosen modification, not an in-place edit."}],
    algorithm: ["Read an original line of text.", "Open NOTES.TXT for output and write the original line.", "Close and reopen it for input to display the original contents.", "Read an additional line and reopen the file in append mode.", "Write the additional line, close, and display the modified file."],
    example: {input: "Original: First line / Additional: Second line", output: "Original file: First line; Modified file: First line / Second line", walkthrough: "Creation writes the first line; append adds a new line; the second read shows both."},
    code: String.raw`#include <iostream.h>
#include <conio.h>
#include <fstream.h>
void displayFile() {
    ifstream in("NOTES.TXT");
    char line[80];
    if (!in) { cout << "Cannot open file for reading.\n"; return; }
    while (in.getline(line, 80)) cout << line << "\n";
    in.close();
}
void main() {
    clrscr();
    char first[80], added[80];
    cout << "Original line: "; cin.getline(first, 80);
    ofstream out("NOTES.TXT");
    if (!out) { cout << "Cannot create file."; getch(); return; }
    out << first << "\n";
    out.close();
    cout << "Original file:\n";
    displayFile();
    cout << "Additional line: "; cin.getline(added, 80);
    ofstream append("NOTES.TXT", ios::app);
    if (!append) { cout << "Cannot append file."; getch(); return; }
    append << added << "\n";
    append.close();
    cout << "Modified file:\n";
    displayFile();
    getch();
}`,
    breakdown: [{line: "#include <fstream.h>", meaning: "Supplies Turbo C++ input/output file streams."}, {line: "ifstream in(\"NOTES.TXT\")", meaning: "Opens the file for reading inside reusable displayFile."}, {line: "while (in.getline(line,80))", meaning: "Displays real lines only; the condition stops at end-of-file."}, {line: "ofstream out(\"NOTES.TXT\")", meaning: "Creates or replaces the file with the first line."}, {line: "if (!out)", meaning: "Reports failure instead of claiming a file was created."}, {line: "out.close();", meaning: "Flushes the first line before reopening to read."}, {line: "ofstream append(...,ios::app)", meaning: "Opens in append mode to modify without deleting the first line."}, {line: "append.close(); displayFile();", meaning: "Flushes changes and then proves what is stored by reopening."}],
    tryIt: "What would opening the file with plain ofstream a second time do?", check: "It would normally truncate/overwrite the first line; ios::app preserves it.", pitfalls: ["Creation overwrites an existing NOTES.TXT; back it up if needed.", "This modification appends; it does not replace text in the middle.", "Lines longer than 79 characters need another approach."]
  },
  {
    id: 14, title: "Copy ABC.text to XYZ.text", topic: "File input and output",
    prompt: "Copy the contents of ABC.text to XYZ.text.",
    interpretation: "These spellings are preserved exactly from the assignment. The extension '.text' is four letters and is NOT DOS 8.3 compatible; on a strict DOS/Turbo filesystem, ask the teacher whether ABC.TXT and XYZ.TXT are acceptable instead. This program intentionally does not silently rename the specified files.",
    learn: [{heading: "Source and destination", text: "Open the source for reading before creating the destination. If the source is absent, report it without overwriting the destination."}, {heading: "Character copying", text: "Read one character at a time with get(ch) and write with put(ch); this preserves spaces and line endings as text handled by the streams."}, {heading: "Existing destination", text: "Plain ofstream replaces XYZ.text if it exists. A successful open must be checked before writing."}],
    algorithm: ["Open ABC.text for reading and verify it exists.", "Open XYZ.text for writing and check success.", "Get each source character until the read fails.", "Put each character into the destination.", "Close both streams and report completion."],
    example: {input: "ABC.text contains: Hello (newline) C++", output: "XYZ.text contains: Hello (newline) C++", walkthrough: "Characters, including the newline, are copied in source order."},
    code: String.raw`#include <iostream.h>
#include <conio.h>
#include <fstream.h>
void main() {
    clrscr();
    ifstream source("ABC.text");
    if (!source) { cout << "Cannot open ABC.text."; getch(); return; }
    ofstream target("XYZ.text");
    if (!target) {
        cout << "Cannot create XYZ.text.";
        source.close(); getch(); return;
    }
    char ch;
    while (source.get(ch)) target.put(ch);
    if (!target) cout << "Write failed.\n";
    else cout << "Copied ABC.text to XYZ.text.\n";
    source.close();
    target.close();
    getch();
}`,
    breakdown: [{line: "#include <fstream.h>", meaning: "Declares ifstream and ofstream for file work."}, {line: "ifstream source(\"ABC.text\")", meaning: "Opens the literal assignment filename before touching output."}, {line: "if (!source)", meaning: "Stops if the source is missing, protecting any existing destination."}, {line: "ofstream target(\"XYZ.text\")", meaning: "Creates or replaces the destination only after source opens."}, {line: "if (!target)", meaning: "Reports failure to create the output file."}, {line: "while (source.get(ch))", meaning: "Loops over characters, including whitespace, until EOF."}, {line: "target.put(ch)", meaning: "Writes the same character to the destination."}, {line: "source.close(); target.close();", meaning: "Releases both file handles and flushes output."}],
    tryIt: "If ABC.text does not exist, is XYZ.text overwritten by this program?", check: "No; the source check returns before target is opened.", pitfalls: ["ABC.text and XYZ.text may not work as written on strict 8.3 DOS filesystems.", "An existing XYZ.text is replaced.", "Text streams can translate line endings; do not advertise this as a byte-exact binary copy."]
  },
  {
    id: 15, title: "Circle area with constructor and destructor", topic: "Object lifetime",
    prompt: "Find the area of a circle using a constructor and destructor.",
    learn: [{heading: "Area formula", text: "The area is pi times radius squared. This exercise uses pi approximately 3.14."}, {heading: "Constructor", text: "Circle(float) runs when the object is created and stores a validated radius passed from main."}, {heading: "Destructor", text: "~Circle() runs automatically when the object leaves its scope. Here it announces that lifetime ended; it does NOT compute the area."}],
    algorithm: ["Read a radius and reject negative values.", "Enter an inner block and construct a Circle with that radius.", "Calculate and display 3.14 times radius times radius using the object's method.", "Leave the block so the destructor runs automatically.", "Wait for a key before closing the Turbo screen."],
    example: {input: "2", output: "Area: 12.56 / Circle object destroyed.", walkthrough: "The constructor stores 2; 3.14*2*2=12.56; after the inner block the destructor prints its message."},
    code: String.raw`#include <iostream.h>
#include <conio.h>
class Circle {
    float radius;
public:
    Circle(float r) { radius = r; }
    float area() { return 3.14f * radius * radius; }
    ~Circle() { cout << "Circle object destroyed.\n"; }
};
void main() {
    clrscr();
    float r;
    cout << "Radius: "; cin >> r;
    if (r < 0) { cout << "Invalid radius."; getch(); return; }
    {
        Circle circle(r);
        cout << "Area: " << circle.area() << "\n";
    }
    getch();
}`,
    breakdown: [{line: "float radius;", meaning: "Stores the size of this particular circle privately."}, {line: "Circle(float r)", meaning: "Constructor initializes the radius as soon as the object is made."}, {line: "float area()", meaning: "Returns 3.14 times radius squared, without changing the object."}, {line: "~Circle()", meaning: "Destructor has a tilde, no return type, and runs at scope exit."}, {line: "if (r<0)", meaning: "Prevents a physically meaningless negative radius."}, {line: "{ Circle circle(r); ... }", meaning: "The nested block gives the object a visible, predictable lifetime."}, {line: "cout << circle.area()", meaning: "Prints the area while the object still exists."}, {line: "getch();", meaning: "Waits after the destructor's message has appeared."}],
    tryIt: "For radius 0, when does the destructor message appear?", check: "Area 0 prints first; the destructor message appears on leaving the inner block, before getch.", pitfalls: ["A destructor cannot accept an argument and is called automatically.", "Do not compute area in the destructor: the object should provide an area method."]
  }
];
