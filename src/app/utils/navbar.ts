export const handleNavbarScroll = (navbar: HTMLElement | null) => {
      if (!navbar) return;
    
      let lastScroll = 0;
      const onScroll = () => {
        const currentScroll = window.pageYOffset;
    
        if (currentScroll <= 0) {
          navbar.style.transform = "translateY(0)";
          return;
        }
    
        if (currentScroll > lastScroll) {
          navbar.style.transform = "translateY(-100%)";
        } else {
          navbar.style.transform = "translateY(0)";
        }
    
        lastScroll = currentScroll;
      };
    
      window.addEventListener("scroll", onScroll);
    
      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    };
    