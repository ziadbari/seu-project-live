/* ==========================================================================
   SEU Career Connect - Dynamic Application Logic
   ========================================================================== */

// --- Demo Data Setup ---
const demoJobs = [
    { id: "job-1", title: "Junior Software Engineer", company: "Brain Station 23", location: "Dhaka", type: "Full-Time", category: "CSE", salary: "BDT 35,000 - 45,000", deadline: "2026-10-15" },
    { id: "job-2", title: "SQA Automation Engineer", company: "Therap BD", location: "Dhaka", type: "Full-Time", category: "CSE", salary: "BDT 40,000 - 50,000", deadline: "2026-10-20" },
    { id: "job-3", title: "Digital Marketing Specialist", company: "Grameenphone", location: "Remote", type: "Full-Time", category: "BBA", salary: "BDT 30,000 - 40,000", deadline: "2026-10-12" },
    { id: "job-4", title: "HR Executive", company: "Square Pharmaceuticals", location: "Dhaka", type: "Part-Time", category: "BBA", salary: "BDT 25,000 - 30,000", deadline: "2026-10-05" }
];

document.addEventListener("DOMContentLoaded", () => {
    // Initialize LocalStorage with demo data if empty
    if (!localStorage.getItem("seu_jobs")) {
        localStorage.setItem("seu_jobs", JSON.stringify(demoJobs));
    }

    initCounters();
    initFilterSystem();
});

// --- Animated Stats Counter ---
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = target / 50;

        const updateCount = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// --- Dynamic Search and Filtering ---
function initFilterSystem() {
    const searchInput = document.getElementById("jobSearchInput");
    const categorySelect = document.getElementById("categoryFilter");
    
    if (searchInput) {
        searchInput.addEventListener("input", filterJobs);
    }
    if (categorySelect) {
        categorySelect.addEventListener("change", filterJobs);
    }
}

function filterJobs() {
    const searchText = document.getElementById("jobSearchInput")?.value.toLowerCase() || "";
    const selectedCategory = document.getElementById("categoryFilter")?.value || "";
    const jobCards = document.querySelectorAll(".job-card");

    jobCards.forEach(card => {
        const title = card.querySelector("h3")?.innerText.toLowerCase() || "";
        const company = card.querySelector(".company-name")?.innerText.toLowerCase() || "";
        const category = card.getAttribute("data-category") || "";

        const matchesSearch = title.includes(searchText) || company.includes(searchText);
        const matchesCategory = selectedCategory === "" || category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

// --- LocalStorage Authentication Simulation ---
function handleLogin(event, role) {
    event.preventDefault();
    const user = { role: role, isLoggedIn: true, email: document.getElementById("email")?.value || "user@seu.edu.bd" };
    localStorage.setItem("seu_user", JSON.stringify(user));
    
    showToast(`Logged in successfully as ${role}!`);
    
    setTimeout(() => {
        if(role === 'Student') window.location.href = 'student-dashboard.html';
        else if(role === 'Employer') window.location.href = 'employer-dashboard.html';
        else if(role === 'Admin') window.location.href = 'admin-dashboard.html';
        else window.location.href = 'alumni-dashboard.html';
    }, 1000);
}

function handleLogout() {
    localStorage.removeItem("seu_user");
    showToast("Logged out successfully.");
    setTimeout(() => { window.location.href = 'login.html'; }, 1000);
}

// --- Job Application & Save System ---
function applyJob(jobId) {
    let applications = JSON.parse(localStorage.getItem("seu_applications")) || [];
    if (!applications.includes(jobId)) {
        applications.push(jobId);
        localStorage.setItem("seu_applications", JSON.stringify(applications));
        showToast("Application submitted successfully!");
    } else {
        showToast("You have already applied for this position.");
    }
}

function saveJob(jobId) {
    let saved = JSON.parse(localStorage.getItem("seu_saved_jobs")) || [];
    if (!saved.includes(jobId)) {
        saved.push(jobId);
        localStorage.setItem("seu_saved_jobs", JSON.stringify(saved));
        showToast("Job saved to your profile!");
    } else {
        showToast("Job is already in saved list.");
    }
}

// --- Toast Notifications & Modals ---
function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 3000);
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) modal.style.display = "flex";
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) modal.style.display = "none";
}