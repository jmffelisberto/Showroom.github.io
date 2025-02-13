// Horizontal Scroll Effect
const stickySections = [...document.querySelectorAll('.sticky_wrap')];

window.addEventListener('scroll', (e) => {
  stickySections.forEach(section => transform(section));
});

function transform(section) {
  const offsetTop = section.parentElement.offsetTop;
  const scrollSection = section.querySelector('.horizontal_scroll');
  let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
  percentage = Math.max(0, Math.min(percentage, 300));
  scrollSection.style.transform = `translate3d(${-(percentage)}vw, 0, 0)`;
}

// Smooth scrolling for side nav links
document.querySelectorAll('#side-nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Timeline Animation
const line = document.querySelector(".timeline-innerline");
let i = 0;
let i2 = 1;
const target1 = document.querySelector(".timeline ul");
const target2 = document.querySelectorAll(".timeline ul li");
const timeline_events = document.querySelectorAll(".timeline ul li");

function showTime(e) {
  e.setAttribute("done", "true");
  e.querySelector(".timeline-point").style.background = "blue";
  e.querySelector(".date").style.opacity = "100%";
  e.querySelector("p").style.opacity = "100%";
  e.querySelector("p").style.transform = "translateY(0px)";
  e.querySelector("p").style.transition = "opacity 1s ease-in-out, transform 1s ease-in-out"; // Ensuring smooth transition
}

function hideTime(e) {
  e.removeAttribute("done");
  e.querySelector(".timeline-point").style.background = "rgb(228, 228, 228)";
  e.querySelector(".date").style.opacity = "0%";
  e.querySelector("p").style.opacity = "0%";
  e.querySelector("p").style.transform = "translateY(-10px)";
}

function slowLoop() {
  setTimeout(function () {
    showTime(timeline_events[i]);
    timelineProgress(i + 1);
    i++;
    if (i < timeline_events.length) {
      slowLoop();
    }
  }, 800);
}

function timelineProgress(value) {
  let progress = `${(value / timeline_events.length) * 100}%`;
  if (window.matchMedia("(min-width: 728px)").matches) {
    line.style.width = progress;
    line.style.height = "4px";
  } else {
    line.style.height = progress;
    line.style.width = "4px";
  }
}

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.9) {
        if (window.matchMedia("(min-width: 728px)").matches) {
          slowLoop();
        } else {
          showTime(entry.target);
          timelineProgress(i2);
          i2++;
        }
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 1, rootMargin: "0px 0px -50px 0px" }
);

if (window.matchMedia("(min-width: 728px)").matches) {
  observer.observe(target1);
} else {
  target2.forEach((t) => {
    observer.observe(t);
  });
}

timeline_events.forEach((li, index) => {
  li.addEventListener("click", () => {
    if (li.getAttribute("done")) {
      timelineProgress(index);
      // Hide all timeline events from last up to the point clicked
      timeline_events.forEach((ev, idx) => {
        if (idx >= index) {
          hideTime(ev);
        }
      });
    } else {
      timelineProgress(index + 1);
      // Show all timeline events from first up to the point clicked
      timeline_events.forEach((ev, idx) => {
        if (idx <= index) {
          showTime(ev);
        }
      });
    }
  });
});

let doit;
window.addEventListener("resize", () => {
  clearTimeout(doit);
  doit = setTimeout(resizeEnd, 1200);
});

function resizeEnd() {
  i = 0;
  slowLoop();
}

// Interests section
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.interest-card');

  const fadeInOnScroll = () => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    });
  };

  window.addEventListener('scroll', fadeInOnScroll);
  fadeInOnScroll(); // Initial call to show cards already in view
});

function copyToClipboard(text, event) {
  event.preventDefault(); // Prevent default anchor click behavior
  navigator.clipboard.writeText(text).then(function() {
    const popup = document.getElementById('clipboardPopup');
    popup.classList.add('show');
    setTimeout(() => {
      popup.classList.remove('show');
    }, 2000);
  }, function(err) {
    console.error('Could not copy text: ', err);
  });
}


//Initial Fade In
document.addEventListener("DOMContentLoaded", function() {
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.5, // Element is considered visible when 50% of it is visible
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('show');
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});

// Highlight Side-Nav
document.addEventListener("DOMContentLoaded", function() {
  // Array of IDs for sections or divs that need track
  const sectionIds = ["section1", "section2", "section3", "section4", "section5"];
  const navLinks = document.querySelectorAll("#side-nav a");

  const highlightNavLink = (targetId) => {
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${targetId}`) {
        link.classList.add("active");
      }
    });
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        highlightNavLink(entry.target.id);
      }
    });
  }, {
    threshold: 0.25
  });

  sectionIds.forEach(id => {
    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      sectionObserver.observe(sectionElement);
    }
  });
});

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
}

// Redirect to mobile.html if on a mobile device
window.onload = function() {
  if (isMobileDevice()) {
    window.location.href = '../mobile.html';
  }
}

