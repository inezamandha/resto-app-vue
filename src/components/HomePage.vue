<template>
    <div class="home">
      <h1>Welcome to My Restaurant</h1>
      <p>Book a table or explore our delicious menu.</p>
  
      <div class="home-buttons">
        <router-link to="/booking">
          <button>Book a Table</button>
        </router-link>
        <router-link to="/menu">
          <button>View Menu</button>
        </router-link>
      </div>
    </div>
  </template>
  
  <style scoped>
  .home {
    max-width: 600px;
    margin: 80px auto;
    text-align: center;
    font-family: sans-serif;
  }
  
  h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    margin-bottom: 2rem;
  }
  
  .home-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  button {
    padding: 12px 24px;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    background-color: #0070f3;
    color: white;
    cursor: pointer;
    transition: 0.3s ease;
  }
  
  button:hover {
    background-color: #005bb5;
  }
  </style>
  