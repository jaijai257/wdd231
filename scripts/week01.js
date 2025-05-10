document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    hamButton.addEventListener('click', () => { 
      navigation.classList.toggle('open');
      hamButton.classList.toggle('open');
    }); 
    
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;
    
    
  
    const courses = [
      { code: 'CSE 110', name: 'Intro to Programming', credits: 2, type: 'cse', completed: true },
      { code: 'WDD 130', name: 'Web Fundamentals', credits: 2, type: 'wdd', completed: true },
      { code: 'CSE 111', name: 'Programming with Functions', credits: 2, type: 'cse', completed: true },
      { code: 'CSE 210', name: 'OOP Design', credits: 2, type: 'cse', completed: false },
      { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 2, type: 'wdd', completed: true },
      { code: 'WDD 231', name: 'Front-end Development I', credits: 2, type: 'wdd', completed: false },
    ];
  
    const courseContainer = document.getElementById("courses");
  
    function updateCourses(type) {
      courseContainer.innerHTML = "";
      const filtered = type === 'all' ? courses : courses.filter(c => c.type === type);
      let totalCredits = filtered.reduce((sum, c) => sum + c.credits, 0);
  
      filtered.forEach(c => {
        const btn = document.createElement("button");
        btn.textContent = c.code;
        btn.className = `${c.type} ${c.completed ? 'completed' : ''}`;
        courseContainer.appendChild(btn);
      });
  
      console.log(`Total Credits Displayed: ${totalCredits}`);
    }
  
    document.getElementById("btnAll").addEventListener("click", () => updateCourses("all"));
    document.getElementById("btnCSE").addEventListener("click", () => updateCourses("cse"));
    document.getElementById("btnWDD").addEventListener("click", () => updateCourses("wdd"));
  
    updateCourses("all");
  });
  