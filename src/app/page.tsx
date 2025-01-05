"use client"; // Đánh dấu đây là Client Component

import { useEffect, useRef } from "react";
import "../app/styles/homegame.css";

export default function Home() {
  const navbarRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    const images = document.querySelectorAll(".hero-image");
    const totalImages = images.length;

    const showImage = (index: number) => {
      images.forEach((img, i) => {
        img.classList.toggle("active", i === index);
      });
    };

    const nextImage = () => {
      currentIndex = (currentIndex + 1) % totalImages;
      showImage(currentIndex);
    };

    const prevImage = () => {
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      showImage(currentIndex);
    };

    const interval = setInterval(nextImage, 3000); // Tự động chuyển ảnh sau mỗi 3 giây

    // Thêm sự kiện click cho nút điều khiển
    const nextButton = document.querySelector(".next-button");
    const prevButton = document.querySelector(".prev-button");

    nextButton?.addEventListener("click", nextImage);
    prevButton?.addEventListener("click", prevImage);

    return () => {
      clearInterval(interval);
      nextButton?.removeEventListener("click", nextImage);
      prevButton?.removeEventListener("click", prevImage);
    };
  }, []);

  useEffect(() => {
    const menuIcon = document.querySelector(".menu");
    const closeIcon = document.querySelector(".close");
    const navLinks = navLinksRef.current;

    const handleMenuOpen = () => {
      navLinks?.classList.add("active");
      menuIcon?.classList.add("hidden");
      closeIcon?.classList.remove("hidden");
    };

    const handleMenuClose = () => {
      navLinks?.classList.remove("active");
      menuIcon?.classList.remove("hidden");
      closeIcon?.classList.add("hidden");
    };

    menuIcon?.addEventListener("click", handleMenuOpen);
    closeIcon?.addEventListener("click", handleMenuClose);

    return () => {
      menuIcon?.removeEventListener("click", handleMenuOpen);
      closeIcon?.removeEventListener("click", handleMenuClose);
    };
  }, [] );
  

  useEffect(() => {
    const cards = document.querySelectorAll(".game-card");
  
    const handleTouchMove = (e: TouchEvent, card: HTMLElement) => {
      const touch = e.touches[0];
      const { width, height, left, top } = card.getBoundingClientRect();
      const x = touch.clientX - left;
      const y = touch.clientY - top;
      const rotateX = ((y / height) - 0.5) * 20;
      const rotateY = ((x / width) - 0.5) * -20;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
  
    const resetTilt = (card: HTMLElement) => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    };
  
    cards.forEach((card) => {
      card.addEventListener("touchmove", (e) => handleTouchMove(e as TouchEvent, card as HTMLElement));
      card.addEventListener("touchend", () => resetTilt(card as HTMLElement));
    });
  
    return () => {
      cards.forEach((card) => {
        card.removeEventListener("touchmove", (e) => handleTouchMove(e as TouchEvent, card as HTMLElement));
        card.removeEventListener("touchend", () => resetTilt(card as HTMLElement));
      });
    };
  }, []);
  

  

  return (
    <>
      <nav ref={navbarRef} className="navbar">
        <div className="nav-container">
          <img
            src="/img/logo/FPT_Polytechnic.png"
            alt="Game Logo"
            className="nav-logo"
          />
          <div ref={navLinksRef} className="nav-links">
            <svg
              className="close"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="#ffffff"
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              />
            </svg>
            <a href="#">GAME</a>
            <a href="#">GILF</a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              FACEBOOK
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              TIKTOK
            </a>
          </div>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
            />
            <button className="search-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          <svg
            className="menu"
            xmlns="http://www.w3.org/2000/svg"
            height="10"
            width="8.75"
            viewBox="0 0 448 512"
          >
            <path
              fill="#ffffff"
              d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-background">
          <img
            src="/img/game/demo1.jpg"
            alt="Game 1"
            className="hero-image active"
          />
          <img src="/img/game/demo1.jpg" alt="Game 1" className="hero-image" />
          <img src="/img/game/demo2.jpg" alt="Game 2" className="hero-image" />
          <img src="/img/game/demo3.jpg" alt="Game 3" className="hero-image" />
        </div>
        <button className="prev-button">❮</button>
        <button className="next-button">❯</button>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Games Boy</h2>
        </div>
        <div className="games-grid">
          {[1, 2, 3, 4].map((i) => (
            <div className="game-card" key={i}>
              <div className="game-image">
                <img
                  src="/img/game/500x500.png"
                  alt={`Game ${i}`}
                  className="game-image-inner"
                />
                <div className="game-overlay">
                  <h3 className="game-title">Game {i}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Games Girl</h2>
        </div>
        <div className="games-grid">
          {[1, 2, 3, 4].map((i) => (
            <div className="game-card" key={i}>
              <div className="game-image">
                <img
                  src="/img/game/500x500.png"
                  alt={`Game ${i}`}
                  className="game-image-inner"
                />
                <div className="game-overlay">
                  <h3 className="game-title">Game {i}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>&copy; 2024 FPT Polytechnic Đồng Nai</p>
      </footer>
    </>
  );
}
