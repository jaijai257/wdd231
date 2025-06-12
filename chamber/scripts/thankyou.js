 // Fill current year and last modified
 document.getElementById("year").textContent = new Date().getFullYear();
 document.getElementById("lastModified").textContent = document.lastModified;

 // Get URL parameters
 const params = new URLSearchParams(window.location.search);
 document.getElementById("firstName").textContent = params.get("firstName") || "N/A";
 document.getElementById("lastName").textContent = params.get("lastName") || "N/A";
 document.getElementById("email").textContent = params.get("email") || "N/A";
 document.getElementById("phone").textContent = params.get("phone") || "N/A";
 document.getElementById("orgName").textContent = params.get("orgName") || "N/A";
 document.getElementById("timestamp").textContent = params.get("timestamp") || "N/A";