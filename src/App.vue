<template>
  <div id="app">
    <header class="header">
      <h2 class="logo">My Restaurant</h2>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/menu">Menu</router-link>
        <router-link to="/booking">Booking</router-link>
      </nav>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <p>&copy; 2025 My Restaurant. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'sans-serif';
}

.header {
  background-color: #0070f3;
  padding: 1rem 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  margin: 0;
  font-size: 1.5rem;
}

nav a {
  margin-left: 20px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a.router-link-exact-active {
  text-decoration: underline;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.footer {
  background-color: #f2f2f2;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: #666;
}
</style>
