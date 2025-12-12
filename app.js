/* Premium Portfolio - Mobile Optimized with Touch Gestures */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const $ = s => document.querySelector(s);
    const $$ = s => Array.from(document.querySelectorAll(s));

    // Device detection
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Performance mode for mobile
    const performanceMode = isMobile || prefersReduced;

    // Year update
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ===== MOBILE MENU =====
    const menuBtn = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const open = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', String(!open));
            mobileMenu.hidden = open;
            menuBtn.textContent = open ? '☰' : '✕';

            // Haptic feedback on supported devices
            if (navigator.vibrate) navigator.vibrate(10);
        });

        // Swipe down to close mobile menu
        let touchStartY = 0;
        mobileMenu.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        mobileMenu.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            if (touchEndY - touchStartY > 80) {
                mobileMenu.hidden = true;
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.textContent = '☰';
            }
        }, { passive: true });
    }

    // ===== SMOOTH SCROLL =====
    $$('.nav-link, [data-goto]').forEach(el => {
        el.addEventListener('click', (e) => {
            const href = el.getAttribute('href') || `#${el.dataset.goto}`;
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const dest = document.querySelector(href);
                if (dest) {
                    dest.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Close mobile menu if open
                    if (mobileMenu && !mobileMenu.hidden) {
                        mobileMenu.hidden = true;
                        menuBtn.setAttribute('aria-expanded', 'false');
                        menuBtn.textContent = '☰';
                    }
                }
            }
        });
    });

    // ===== THEME TOGGLE =====
    const themeBtn = document.getElementById('themeToggle');

    function updateThemeButton() {
        if (!themeBtn) return;
        const isLight = document.body.classList.contains('theme-light');
        themeBtn.textContent = isLight ? '🌙' : '☀️';
    }

    updateThemeButton();

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('theme-light');
            localStorage.setItem('theme', document.body.classList.contains('theme-light') ? 'light' : 'dark');
            updateThemeButton();
            if (navigator.vibrate) navigator.vibrate(10);
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') document.body.classList.add('theme-light');
    updateThemeButton();

    // ===== REVEAL ON SCROLL =====
    const reveals = $$('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        reveals.forEach(r => observer.observe(r));
    } else {
        reveals.forEach(r => r.classList.add('visible'));
    }

    // ===== 3D TILT EFFECT (Desktop Only) =====
    if (!isTouch) {
        $$('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = (y - rect.height / 2) / 20;
                const rotateY = (rect.width / 2 - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ===== TOUCH GESTURES FOR CARDS =====
    if (isTouch) {
        $$('.tilt-card, .glass-card, .project-card').forEach(card => {
            let startX, startY, startTime;

            card.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                startTime = Date.now();
                card.style.transition = 'transform 0.1s ease';
                card.style.transform = 'scale(0.98)';
            }, { passive: true });

            card.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const endTime = Date.now();
                const deltaX = endX - startX;
                const deltaY = endY - startY;
                const duration = endTime - startTime;

                card.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                card.style.transform = '';

                // Quick tap - add ripple effect
                if (duration < 200 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
                    createTouchRipple(card, startX, startY);
                }
            }, { passive: true });

            card.addEventListener('touchcancel', () => {
                card.style.transform = '';
            }, { passive: true });
        });
    }

    // ===== TOUCH RIPPLE EFFECT =====
    function createTouchRipple(element, x, y) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height) * 2;

        ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x - rect.left - size / 2}px;
      top: ${y - rect.top - size / 2}px;
      border-radius: 50%;
      background: rgba(99, 102, 241, 0.3);
      pointer-events: none;
      transform: scale(0);
      z-index: 100;
    `;

        element.style.position = element.style.position || 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(1)', opacity: 0 }
        ], { duration: 500, easing: 'cubic-bezier(0.2, 0.9, 0.3, 1)' })
            .onfinish = () => ripple.remove();

        if (navigator.vibrate) navigator.vibrate(5);
    }

    // ===== TYPING ANIMATION =====
    const typingEl = document.getElementById('typing-text');
    if (typingEl && !prefersReduced) {
        const text = typingEl.textContent;
        typingEl.textContent = '';
        typingEl.style.borderRight = '2px solid var(--accent-2)';

        let i = 0;
        const speed = isMobile ? 60 : 80;
        const typeWriter = () => {
            if (i < text.length) {
                typingEl.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                setTimeout(() => typingEl.style.borderRight = 'none', 1000);
            }
        };
        setTimeout(typeWriter, 300);
    }

    // ===== COUNTER ANIMATION =====
    const counters = $$('.stat-number[data-count]');

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count, 10);
                    const duration = isMobile ? 800 : 1200;
                    const steps = 30;
                    let current = 0;
                    const increment = target / steps;
                    const stepTime = duration / steps;

                    const update = () => {
                        current += increment;
                        if (current < target) {
                            el.textContent = Math.floor(current);
                            setTimeout(update, stepTime);
                        } else {
                            el.textContent = target;
                        }
                    };
                    update();
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterObserver.observe(c));
    } else {
        counters.forEach(c => c.textContent = c.dataset.count);
    }

    // ===== BUTTON HOVER/TOUCH EFFECTS =====
    $$('.btn').forEach(btn => {
        // Desktop hover shine effect
        if (!isTouch) {
            btn.addEventListener('mouseenter', (e) => {
                const rect = btn.getBoundingClientRect();
                btn.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                btn.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            });
        }

        // Touch feedback
        btn.addEventListener('touchstart', () => {
            btn.style.transform = 'scale(0.95)';
        }, { passive: true });

        btn.addEventListener('touchend', () => {
            btn.style.transform = '';
        }, { passive: true });
    });

    // ===== MODAL =====
    const modal = document.getElementById('projectModal');

    if (modal) {
        const closeBtn = modal.querySelector('.modal-close');

        $$('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                let data = {};
                try { data = JSON.parse(card.dataset.project || '{}'); } catch (e) { }

                const title = document.getElementById('modalTitle');
                const desc = document.getElementById('modalDesc');

                if (title) title.textContent = data.title || 'Project';
                if (desc) desc.textContent = data.desc || '';

                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
                if (navigator.vibrate) navigator.vibrate(10);
            });
        });

        const closeModal = () => {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        };

        closeBtn?.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

        // Swipe down to close modal on mobile
        let modalTouchStartY = 0;
        modal.addEventListener('touchstart', (e) => {
            modalTouchStartY = e.touches[0].clientY;
        }, { passive: true });

        modal.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            if (touchEndY - modalTouchStartY > 100) {
                closeModal();
            }
        }, { passive: true });
    }

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (navigator.vibrate) navigator.vibrate([10, 50, 10]);
            alert('📧 Demo mode: Configure Formspree to receive messages.');
        });
    }

    // ===== PRINT BUTTON =====
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', () => window.print());
    }

    // ===== PULL TO REFRESH INDICATOR (Mobile) =====
    if (isTouch) {
        let pullStartY = 0;
        let pulling = false;

        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                pullStartY = e.touches[0].clientY;
                pulling = true;
            }
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (pulling && window.scrollY === 0) {
                const pullDistance = e.touches[0].clientY - pullStartY;
                if (pullDistance > 0 && pullDistance < 150) {
                    document.body.style.transform = `translateY(${pullDistance * 0.3}px)`;
                }
            }
        }, { passive: true });

        document.addEventListener('touchend', () => {
            pulling = false;
            document.body.style.transform = '';
            document.body.style.transition = 'transform 0.3s ease';
            setTimeout(() => document.body.style.transition = '', 300);
        }, { passive: true });
    }

    // ===== LIGHTWEIGHT 3D BACKGROUND =====
    const canvas = document.getElementById('bgCanvas');

    // Only load Three.js on desktop or high-performance devices
    if (typeof THREE !== 'undefined' && canvas && !performanceMode) {
        try {
            const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
            renderer.setPixelRatio(1); // Fixed pixel ratio for performance
            renderer.setSize(window.innerWidth, window.innerHeight);

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
            camera.position.z = 5;

            scene.add(new THREE.AmbientLight(0x6366f1, 0.5));

            const shapes = [];
            const geometries = [
                new THREE.IcosahedronGeometry(0.3, 0),
                new THREE.OctahedronGeometry(0.25, 0),
                new THREE.TetrahedronGeometry(0.3, 0)
            ];

            const material = new THREE.MeshBasicMaterial({
                color: 0x8b5cf6,
                wireframe: true,
                transparent: true,
                opacity: 0.25
            });

            for (let i = 0; i < 6; i++) {
                const geo = geometries[i % geometries.length];
                const mesh = new THREE.Mesh(geo, material.clone());
                mesh.material.color.setHSL(0.7 + Math.random() * 0.2, 0.6, 0.6);
                mesh.position.set(
                    (Math.random() - 0.5) * 8,
                    (Math.random() - 0.5) * 6,
                    (Math.random() - 0.5) * 4 - 2
                );
                mesh.userData = {
                    rotSpeed: (Math.random() - 0.5) * 0.015,
                    floatSpeed: 0.2 + Math.random() * 0.2,
                    floatOffset: Math.random() * Math.PI * 2
                };
                shapes.push(mesh);
                scene.add(mesh);
            }

            let mouseX = 0, mouseY = 0;
            window.addEventListener('pointermove', (e) => {
                mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
                mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
            }, { passive: true });

            let time = 0;
            let lastFrame = 0;
            const targetFPS = 30;
            const frameInterval = 1000 / targetFPS;

            function animate(currentTime) {
                requestAnimationFrame(animate);

                // Throttle to target FPS
                if (currentTime - lastFrame < frameInterval) return;
                lastFrame = currentTime;

                time += 0.01;

                shapes.forEach(shape => {
                    shape.rotation.x += shape.userData.rotSpeed;
                    shape.rotation.y += shape.userData.rotSpeed * 0.7;
                    shape.position.y += Math.sin(time * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.001;
                });

                camera.position.x += (mouseX - camera.position.x) * 0.01;
                camera.position.y += (-mouseY - camera.position.y) * 0.01;
                camera.lookAt(0, 0, 0);

                renderer.render(scene, camera);
            }
            animate(0);

            window.addEventListener('resize', () => {
                renderer.setSize(window.innerWidth, window.innerHeight);
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            }, { passive: true });

        } catch (e) {
            console.warn('Three.js error:', e);
            canvas.style.display = 'none';
        }
    } else if (canvas) {
        canvas.style.display = 'none';
    }

    // ===== PROFILE CARD TILT (Desktop) =====
    const profile3D = document.getElementById('profile3D');
    if (profile3D && !isTouch) {
        profile3D.addEventListener('mousemove', (e) => {
            const rect = profile3D.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            profile3D.style.transform = `perspective(800px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        profile3D.addEventListener('mouseleave', () => profile3D.style.transform = '');
    }

    // ===== ACTIVE LINK HIGHLIGHT ON SCROLL =====
    const sections = $$('section[id]');
    const navLinks = $$('.nav-link');

    if (sections.length && navLinks.length) {
        const highlightNav = () => {
            const scrollY = window.scrollY + 100;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollY >= top && scrollY < top + height) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', highlightNav, { passive: true });
    }

    // ===== SKILL TAG TOUCH EFFECT =====
    $$('.skill-tag').forEach(tag => {
        tag.addEventListener('touchstart', () => {
            tag.style.transform = 'scale(1.1)';
            tag.style.background = 'var(--accent-2-soft)';
        }, { passive: true });

        tag.addEventListener('touchend', () => {
            tag.style.transform = '';
            tag.style.background = '';
        }, { passive: true });
    });

    console.log(`🚀 Portfolio loaded! (${isMobile ? 'Mobile' : 'Desktop'} mode)`);
});
