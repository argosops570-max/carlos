// 1️ Apply Job Button
function applyJob() {
  showPopup("Application feature coming soon!");
}

// 2️ Popup display
function showPopup(message) {
  const popup = document.getElementById("popup");
  if (!popup) return;
  popup.textContent = message;
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 2500);
}

// 3️Delete job by index
function deleteJob(index) {
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  jobs.splice(index, 1);
  localStorage.setItem("jobs", JSON.stringify(jobs));
  renderUserJobs();
  showPopup("Job deleted successfully!");
}

// 4️Render all user-added jobs
function renderUserJobs() {
  const jobContainer = document.getElementById("job-container");
  if (!jobContainer) return;

  // remove only previously rendered user jobs to prevent duplication
  const existingUserJobs = jobContainer.querySelectorAll(".user-job");
  existingUserJobs.forEach((job) => job.remove());

  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  jobs.forEach((job, index) => {
    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card", "user-job");
    jobCard.innerHTML = `
      <h2>${job.title}</h2>
      <p>Company: ${job.company}</p>
      <p>Location: ${job.location}</p>
      <button onclick="applyJob()">Apply</button>
      <button class="delete-btn">Delete</button>
    `;
    // attach delete handler
    jobCard
      .querySelector(".delete-btn")
      .addEventListener("click", () => deleteJob(index));
    jobContainer.appendChild(jobCard);
  });
}

// 5️ Main DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // Render jobs on page load
  renderUserJobs();

  // Post Job Form handling
  const form = document.getElementById("job-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("job-title").value.trim();
      const company = document.getElementById("company").value.trim();
      const location = document.getElementById("location").value.trim();

      if (!title || !company || !location) {
        showPopup("Please fill all fields!");
        return;
      }

      const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
      jobs.push({ title, company, location });
      localStorage.setItem("jobs", JSON.stringify(jobs));

      renderUserJobs(); // show immediately
      showPopup("Job Posted Successfully!");
      form.reset();
    });
  }

  // Login Button
  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () =>
      showPopup("Login system coming soon!"),
    );
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Job Search Filter
  const searchInput = document.getElementById("job-search");
  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      const filter = searchInput.value.toLowerCase();
      const jobCards = document.querySelectorAll(".job-card");
      let firstMatch = null;

      jobCards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        if (text.includes(filter)) {
          card.style.display = "block";
          if (!firstMatch) firstMatch = card;
        } else {
          card.style.display = "none";
        }
      });

      // scroll to first match if exists
      if (firstMatch) firstMatch.scrollIntoView({ behavior: "smooth" });
    });
  }
});
// JOB SEARCH FILTER with "no jobs" popup
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("job-search");
  if (!searchInput) return;

  searchInput.addEventListener("keyup", function () {
    const filter = searchInput.value.toLowerCase();
    const jobs = document.querySelectorAll(".job-card");
    let firstMatch = null;
    let anyMatch = false;

    jobs.forEach(function (job) {
      const text = job.textContent.toLowerCase();
      if (text.includes(filter)) {
        job.style.display = "block";
        if (!firstMatch) firstMatch = job;
        anyMatch = true;
      } else {
        job.style.display = "none";
      }
    });

    // Scroll to first match if any
    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: "smooth" });
    }

    // Show popup if nothing found
    if (!anyMatch && filter !== "") {
      showPopup("No jobs available!");
    }
  });
});
// JOB SEARCH FILTER with count of matches
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("job-search");
  if (!searchInput) return;

  searchInput.addEventListener("keyup", function () {
    const filter = searchInput.value.toLowerCase();
    const jobs = document.querySelectorAll(".job-card");
    let firstMatch = null;
    let matchCount = 0;

    jobs.forEach(function (job) {
      const text = job.textContent.toLowerCase();
      if (text.includes(filter)) {
        job.style.display = "block";
        if (!firstMatch) firstMatch = job;
        matchCount++;
      } else {
        job.style.display = "none";
      }
    });

    // Scroll to first match
    if (firstMatch) firstMatch.scrollIntoView({ behavior: "smooth" });

    // Show popup
    if (filter === "") return; // ignore empty search
    if (matchCount === 0) {
      showPopup("No jobs available!");
    } else if (matchCount === 1) {
      showPopup("1 job found");
    } else {
      showPopup(`${matchCount} jobs found`);
    }
  });
});
// SMART SEARCH WITH PARTIAL MATCH & HIGHLIGHT
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("job-search");
  if (!searchInput) return;

  searchInput.addEventListener("keyup", function () {
    const filter = searchInput.value.toLowerCase().trim();
    const jobs = document.querySelectorAll(".job-card");
    let matchCount = 0;

    jobs.forEach(function (job) {
      const text = job.textContent.toLowerCase();

      // check if job includes typed text partially
      if (filter && text.includes(filter)) {
        job.style.display = "block";
        job.style.border = "2px solid #4CAF50"; // highlight
        job.style.backgroundColor = "#f0fff0";  // optional background
        matchCount++;
      } else {
        job.style.display = filter ? "none" : "block"; // hide if no match
        job.style.border = "";       // remove highlight
        job.style.backgroundColor = "";
      }
    });

    // show popup for feedback
    if (filter && matchCount === 0) {
      showPopup("No jobs available!");
    } else if (filter && matchCount > 0) {
      showPopup(matchCount + " job(s) match!");
    }
  });
});