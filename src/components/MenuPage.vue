<script setup>
import { ref, reactive, onMounted } from 'vue';

const menu = ref([]);
const showModal = ref(false);
const isEditMode = ref(false);

const currentMenu = reactive({
  id: null,
  name: '',
  detail: '',
  price: '',
  image: '',
});

const fetchMenu = async () => {
  try {
    const res = await fetch('http://localhost:5000/menu');
    const data = await res.json();
    menu.value = data;
  } catch (err) {
    console.error('Failed to fetch menu:', err);
  }
};

onMounted(fetchMenu);

const openAddModal = () => {
  isEditMode.value = false;
  Object.assign(currentMenu, {
    id: null,
    name: '',
    detail: '',
    price: '',
    image: '/src/assets/img/menu-1.jpg',
  });
  showModal.value = true;
};

const openEditModal = (item) => {
  isEditMode.value = true;
  Object.assign(currentMenu, { ...item });
  showModal.value = true;
};

const saveMenu = async () => {
  try {
    if (isEditMode.value) {
      await fetch(`http://localhost:5000/menu/${currentMenu.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentMenu),
      });
    } else {
      const maxId = menu.value.reduce((max, item) => {
        const numericId = parseInt(item.id, 10) || 0;
        return Math.max(max, numericId);
      }, 0);

      const newItem = {
        ...currentMenu,
        id: String(maxId + 1),
        image: '/src/assets/img/menu-1.jpg',
      };

      await fetch('http://localhost:5000/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
    }

    await fetchMenu();
    showModal.value = false;
  } catch (err) {
    console.error('Failed to save menu:', err);
  }
};
</script>

<template>
  <div class="menu-page">
    <h2>Our Menu</h2>
    <button @click="openAddModal" class="add-button">Add Menu Item</button>

    <div class="menu-grid">
      <div v-for="item in menu" :key="item.id" class="menu-card">
        <img :src="item.image" :alt="item.name" class="menu-image" />
        <div class="menu-info">
          <h3>{{ item.name }}</h3>
          <p>{{ item.detail }}</p>
          <strong>{{ item.price }}</strong>
          <button @click="openEditModal(item)" class="edit-button">Edit</button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
        <div class="modal">
            <h3>{{ isEditMode ? 'Edit' : 'Add' }} Menu Item</h3>
            <label>
                Name:
                <input v-model="currentMenu.name" type="text" />
            </label>
            <label>
                Description:
                <input v-model="currentMenu.detail" type="text" />
            </label>
            <label>
                Price:
                <input v-model="currentMenu.price" type="text" />
            </label>
            <p style="font-size: 13px; color: gray;">
                Image will default to <code>/src/assets/img/menu-1.jpg</code>
            </p>

            <div class="modal-actions">
                <button @click="saveMenu">Save</button>
                <button @click="showModal = false">Cancel</button>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.menu-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}

.add-button {
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.menu-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.menu-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.menu-info {
  padding: 15px;
  position: relative;
}

.edit-button {
  margin-top: 10px;
  background-color: #f59e0b;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  inset: 0; /* shorthand for top: 0; right: 0; bottom: 0; left: 0 */
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal h3 {
  margin-top: 0;
}

.modal label {
  display: block;
  margin-bottom: 10px;
}

.modal input {
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-actions button {
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-actions button:first-child {
  background-color: #0070f3;
  color: white;
}

.modal-actions button:last-child {
  background-color: #ddd;
}
</style>
