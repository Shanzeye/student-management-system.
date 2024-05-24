import inquirer from "inquirer";
class Student {
    name;
    studentId;
    courses;
    balance;
    constructor(name) {
        this.name = name;
        this.studentId = this.generateStudentId();
        this.courses = [];
        this.balance = 0;
    }
    generateStudentId() {
        return Math.floor(Math.random() * (99999 - 10000) + 10000);
    }
    enrollCourse(course) {
        this.courses.push(course);
        console.log(`${this.name} enrolled in ${course}`);
    }
    viewBalance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    payTuition(amount) {
        this.balance -= amount;
        console.log(`${this.name} paid $${amount} towards tuition`);
    }
    showStatus() {
        console.log(`Name: ${this.name}`);
        console.log(`Student ID: ${this.studentId}`);
        console.log("Courses Enrolled:");
        for (const course of this.courses) {
            console.log(course);
        }
        this.viewBalance();
    }
}
async function main() {
    const student = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter student name:'
        }
    ]);
    const newStudent = new Student(student.name);
    const actions = [
        'Enroll in a course',
        'View balance',
        'Pay tuition fees',
        'Show status',
        'Exit'
    ];
    let continueLoop = true;
    while (continueLoop) {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: actions
            }
        ]);
        switch (action) {
            case 'Enroll in a course':
                const { course } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'course',
                        message: 'Enter course name:'
                    }
                ]);
                newStudent.enrollCourse(course);
                break;
            case 'View balance':
                newStudent.viewBalance();
                break;
            case 'Pay tuition fees':
                const { amount } = await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'amount',
                        message: 'Enter amount to pay:'
                    }
                ]);
                newStudent.payTuition(amount);
                break;
            case 'Show status':
                newStudent.showStatus();
                break;
            case 'Exit':
                continueLoop = false;
                console.log('Exiting...');
                break;
        }
    }
}
main();
