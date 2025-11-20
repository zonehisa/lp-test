document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // Loading Animation Sequence
  const loadingTimeline = gsap.timeline();

  // 1. Blink effect for loading text (simulating load time)
  loadingTimeline.to('.loading-text', {
    opacity: 0.3,
    duration: 0.5,
    yoyo: true,
    repeat: 3,
    ease: "power1.inOut"
  });

  // 2. Fade out loading screen
  loadingTimeline.to('#loading', {
    opacity: 0,
    duration: 0.8,
    ease: "power2.inOut",
    onComplete: () => {
      document.getElementById('loading').style.display = 'none';
    }
  });

  // 3. Hero Animations (chained after loading)
  loadingTimeline.from('.hero-title', {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
  }, "-=0.4"); // Overlap slightly with loading fade out

  loadingTimeline.from('.hero-subtitle', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }, "-=0.8");

  // Circular Text Logic & Animation
  const circularText = document.getElementById('circularText');
  if (circularText) {
    const text = circularText.innerText;
    circularText.innerHTML = '';
    const characters = text.split('');
    const radius = 360 / characters.length;

    characters.forEach((char, i) => {
      const span = document.createElement('span');
      span.innerText = char;
      // Set initial rotation for each character
      // CSS transform-origin is handled in CSS (0 250px), but we can ensure it here if needed.
      // The CSS rule .circular-text span { transform-origin: 0 250px; } is still there.
      gsap.set(span, { rotation: i * radius });
      circularText.appendChild(span);
    });

    // Continuous rotation of the container
    gsap.to(circularText, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
  }

  // Scroll Animations for Sections
  // Select elements to animate
  const sections = document.querySelectorAll('.content-section');

  sections.forEach(section => {
    const title = section.querySelector('.section-title-vertical h2');
    const content = section.querySelector('.section-content');

    // Animate Title
    if (title) {
      gsap.fromTo(title,
        { y: -50, opacity: 0 }, // Vertical text, so Y axis movement might look different depending on rotation, but let's try standard fade/slide
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animate Content
    if (content) {
      gsap.fromTo(content,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2, // Slight delay after title
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});
