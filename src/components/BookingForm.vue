<script setup>
  import { reactive, ref } from 'vue';
  
  const form = reactive({
    name: '',
    email: '',
    booking_date: '',
    people: '',
    special_request: '',
  });
  const submitted = ref(false);
  
  const submitBooking = async () => {
    const payload = {
      ...form,
      created_date: new Date().toISOString(),
    };
  
    try {
      const res = await fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (res.ok) {
        submitted.value = true;
        Object.keys(form).forEach((key) => (form[key] = ''));
      } else {
        console.error('Submit failed');
      }
    } catch (err) {
      console.error('Error submitting booking:', err);
    }
  };
  </script>

<template>
    <div class="booking-form">
      <h2>Book a Table</h2>
      <form @submit.prevent="submitBooking">
        <label>Name: <input v-model="form.name" required /></label>
        <label>Email: <input type="email" v-model="form.email" required /></label>
        <label>Date & Time: <input type="datetime-local" v-model="form.booking_date" required /></label>
        <label>Number of People: <input type="number" v-model="form.people" required min="1" /></label>
        <label>Special Request: <textarea v-model="form.special_request" /></label>
        <button type="submit">Submit</button>
      </form>
      <p v-if="submitted">✅ Booking submitted!</p>
    </div>
  </template>
  
  <style scoped>
  .booking-form {
    max-width: 600px;
    margin: 0 auto;
    font-family: sans-serif;
  }
  .booking-form form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .booking-form input,
  .booking-form textarea {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  </style>
  