const students = [
  { id: 1, name: "Aarav", marks: 85, subject: "Math", passed: true },
  { id: 2, name: "Diya", marks: 72, subject: "Science", passed: true },
  { id: 3, name: "Rohan", marks: 48, subject: "Math", passed: false },
  { id: 4, name: "Sneha", marks: 91, subject: "English", passed: true },
  { id: 5, name: "Karan", marks: 66, subject: "Science", passed: true },
  { id: 6, name: "Meera", marks: 39, subject: "Math", passed: false }
];
const total=students.reduce((acc,student)=>acc+student.marks,0);
console.log("Total Marks:", total);

const result=students.reduce((acc,student)=>{
    if(student.passed){
        acc.passed+=1;
    } else {
        acc.failed+=1;
    }
    return acc;
},{passed:0,failed:0});
console.log("Passed and Failed Students:", result);