// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do DOM
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMobile = document.getElementById('navMobile');
    const header = document.getElementById('header');
    const whatsappFloat = document.getElementById('whatsappFloat');
    
    // Menu Mobile
    let isMenuOpen = false;
    
    mobileMenuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            navMobile.classList.add('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            navMobile.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Fechar menu mobile ao clicar em um link
    const mobileLinks = document.querySelectorAll('.nav-link-mobile');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMobile.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            isMenuOpen = false;
        });
    });
    
    // Navegação suave
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Destacar link ativo na navegação
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    // Header transparente/sólido baseado no scroll
    function updateHeaderBackground() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
    
    // Mostrar/ocultar botão flutuante do WhatsApp
    function updateWhatsAppFloat() {
        if (window.scrollY > 300) {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.visibility = 'visible';
        } else {
            whatsappFloat.style.opacity = '0';
            whatsappFloat.style.visibility = 'hidden';
        }
    }
    
    // Animação de fade-in para elementos
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Event listeners para scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateHeaderBackground();
        updateWhatsAppFloat();
        animateOnScroll();
    });
    
    // Adicionar classes de animação aos elementos
    function addFadeInClasses() {
        const elementsToAnimate = [
            '.hero-content',
            '.sobre-card',
            '.info-card',
            '.produto-card',
            '.encomendas-card',
            '.contato-card',
            '.pedido-card'
        ];
        
        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.add('fade-in');
            });
        });
    }
    
    // Inicializar animações
    addFadeInClasses();
    
    // Executar animações iniciais
    setTimeout(() => {
        animateOnScroll();
        updateActiveNavLink();
        updateHeaderBackground();
        updateWhatsAppFloat();
    }, 100);
    
    // Smooth scroll para navegação interna
    function smoothScrollTo(target, duration = 1000) {
        const targetPosition = target.offsetTop - header.offsetHeight - 20;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Efeitos de hover para cards
    const cards = document.querySelectorAll('.produto-card, .info-card, .sobre-card, .contato-card, .pedido-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efeito de typing para o título principal (opcional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Contador animado (opcional para estatísticas)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start < target) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Lazy loading para imagens (se necessário)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Inicializar lazy loading se houver imagens com data-src
    if (document.querySelectorAll('img[data-src]').length > 0) {
        lazyLoadImages();
    }
    
    // Preloader (opcional)
    function hidePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    }
    
    // Ocultar preloader quando a página carregar completamente
    window.addEventListener('load', hidePreloader);
    
    // Função para detectar dispositivo móvel
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Ajustar comportamento para dispositivos móveis
    if (isMobileDevice()) {
        // Desabilitar hover effects em mobile
        document.body.classList.add('mobile-device');
        
        // Ajustar altura da viewport para mobile
        function setVH() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setVH();
        window.addEventListener('resize', setVH);
    }
    
    // Função para copiar texto (útil para telefone/email)
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Copiado para a área de transferência!');
            });
        } else {
            // Fallback para navegadores mais antigos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Copiado para a área de transferência!');
        }
    }
    
    // Mostrar notificação
    function showNotification(message, duration = 3000) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            z-index: 10000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    }
    
    // Event listener para redimensionamento da janela
    window.addEventListener('resize', function() {
        // Fechar menu mobile se a tela ficar grande
        if (window.innerWidth > 768 && isMenuOpen) {
            navMobile.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            isMenuOpen = false;
        }
        
        // Recalcular posições para animações
        setTimeout(() => {
            updateActiveNavLink();
            animateOnScroll();
        }, 100);
    });
    
    // Adicionar efeito de parallax sutil (opcional)
    function parallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax');
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Ativar parallax se houver elementos com a classe
    if (document.querySelectorAll('.parallax').length > 0) {
        window.addEventListener('scroll', parallaxEffect);
    }
    
    // Função para analytics (Google Analytics, etc.)
    function trackEvent(category, action, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
    }
    
    // Rastrear cliques nos botões do WhatsApp
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('Contact', 'WhatsApp Click', 'WhatsApp Button');
        });
    });
    
    // Console log para debug (remover em produção)
    console.log('🎂 Site Império Gourmet carregado com sucesso!');
    console.log('📱 WhatsApp: (11) 98460-8021');
    
});

// Função global para scroll suave (pode ser chamada de qualquer lugar)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = document.getElementById('header');
    
    if (section && header) {
        const targetPosition = section.offsetTop - header.offsetHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}
